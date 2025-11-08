// server/ai-chat.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config(); // load API_KEY from .env
const app = express();
const PORT = 5000; // backend runs on localhost:5000

app.use(cors());
app.use(bodyParser.json());

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Utility: safely parse JSON returned by model
function safeParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

app.post('/api/ai-chat', async (req, res) => {
  try {
    const { message, products = [], history = [] } = req.body;
    if (!message) return res.status(400).json({ error: 'No message provided' });

    const productContext = products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description,
      category: p.category,
    }));

    const fewShotExamples = `
Example 1
User: "What's the price of Quantum-Core Laptop?"
Assistant (JSON):
{
  "productFound": true,
  "productName": "Quantum-Core Laptop",
  "price": 2499.99,
  "currency": "USD",
  "answer": "The Quantum-Core Laptop is listed at $2499.99. Would you like specs or financing options?",
  "suggestions": ["Show specs", "Compare with Quantum External Drive", "Add to cart"]
}

Example 2
User: "How much is a pair of translator earbuds?"
Assistant (JSON):
{
  "productFound": true,
  "productName": "Universal Translator Earbuds",
  "price": 349.99,
  "currency": "USD",
  "answer": "The Universal Translator Earbuds cost $349.99. They support real-time translation in 100+ languages.",
  "suggestions": ["View details", "Compare with Neuro-Link Headphones"]
}
`;

    const systemInstruction = `
You are an AI assistant for "AI Future Store". Use ONLY the provided catalog. 
Never invent products or prices. Always reply in valid JSON following this schema:
{
  "productFound": boolean,
  "productName": string | null,
  "price": number | null,
  "currency": "USD",
  "answer": string,
  "suggestions": [string]
}
`;

    const prompt = `
${systemInstruction}

Catalog:
${JSON.stringify(productContext)}

Conversation history (recent):
${(history || []).slice(-6).map(h => `${h.role}: ${h.text}`).join('\n')}

User: ${message}

${fewShotExamples}

Return the correct JSON object now.
`;

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
        temperature: 0.2,
        maxOutputTokens: 512,
      },
    });

    const result = await chat.sendMessage({ message: prompt });
    const raw = result?.text ?? '';
    const parsed = safeParseJSON(raw);

    if (parsed) {
      const response = {
        productFound: !!parsed.productFound,
        productName: parsed.productName ?? null,
        price: typeof parsed.price === 'number' ? parsed.price : (parsed.price ? Number(parsed.price) : null),
        currency: parsed.currency ?? 'USD',
        answer: parsed.answer ?? (parsed.productFound ? 'See product details.' : "I can't find that product in the catalog."),
        suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : (parsed.suggestions ? [parsed.suggestions] : []),
      };
      return res.json({ json: response, raw });
    }

    return res.json({
      json: {
        productFound: false,
        productName: null,
        price: null,
        currency: 'USD',
        answer: "I couldn't produce a structured response. Please try rephrasing your question.",
        suggestions: ["Try asking 'price of <product name>'", "List top items in <category>"]
      },
      raw,
    });

  } catch (err) {
    console.error('API /ai-chat error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`✅ AI server running on http://localhost:${PORT}`));
