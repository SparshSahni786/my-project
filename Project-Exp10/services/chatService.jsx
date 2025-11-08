// src/services/chatService.jsx
// Client-safe service: tries backend API (configured via VITE_API_URL) first then falls back to a local mock.
// Exports: sendMessageToAI, summarizeConversation, clearChatSession

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

// Small helper: create a varied fallback message for UX variety
function createFallbackReply(matched, userText) {
  if (!matched || matched.length === 0) {
    const fallbacks = [
      "Tell me a product name or category and I'll search the catalog.",
      "I couldn't find an exact match. Try another keyword or product name.",
      "Not sure which product you mean — want me to list top items?",
      `I didn't find a direct match for "${userText}". Try a different keyword.`
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // Pick one product randomly to vary responses
  const pick = matched[Math.floor(Math.random() * matched.length)];
  const templates = [
    `I found "${pick.name}" in ${pick.category}. Price: $${pick.price.toFixed(2)}. ${pick.description}`,
    `${pick.name} — ${pick.description} It's listed at $${pick.price.toFixed(2)}. Want more details?`,
    `Found ${pick.name} (${pick.category}). Price: $${pick.price.toFixed(2)}. Would you like to compare it with something else?`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

export async function sendMessageToAI(userText, products = [], history = []) {
  console.log('sendMessageToAI ->', { userText, productsCount: products.length, historyLength: history.length, API_URL });
  const trimmed = (userText || '').trim();
  if (!trimmed) return "Please provide a question or product name.";

  // Try backend API first (if you implemented /api/ai-chat on your server)
  try {
    const res = await fetch(`${API_URL}/api/ai-chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: trimmed, products, history }),
    });

    if (res.ok) {
      const data = await res.json();
      // If server returned structured JSON under data.json, prefer that
      if (data && data.json) {
        const j = data.json;
        // Build a friendly display string while keeping structured data available
        const pricePart = j.price != null ? `Price: $${Number(j.price).toFixed(2)}.` : '';
        const productPart = j.productName ? `${j.productName} — ${pricePart}` : '';
        const suggestions = Array.isArray(j.suggestions) && j.suggestions.length ? `\n\nSuggestions: ${j.suggestions.slice(0,3).join(' | ')}` : '';
        const display = `${j.answer || ''}` + (suggestions ? suggestions : '');
        // Return an object so callers can optionally render structured info
        return { structured: j, text: display, raw: data.raw || null };
      }

      // Backwards-compatible: if server returned plain text in data.text
      if (data && (data.text || data.display)) {
        return { structured: null, text: data.display || data.text, raw: data.raw || null };
      }

      // Nothing useful — fall through to mock
      console.warn('Backend responded but no usable payload; falling back to local mock.');
    } else {
      console.warn('Backend returned non-OK status, falling back to local mock.', res.status);
    }
  } catch (err) {
    console.warn('No backend available or network error, falling back to local mock.', err);
  }

  // Local fallback: simple search + varied reply templates
  try {
    const q = trimmed.toLowerCase();
    const matched = (products || []).filter(p =>
      (p.name || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      ((p.category || '')).toLowerCase().includes(q)
    );

    const fallbackText = createFallbackReply(matched, trimmed);
    return { structured: null, text: fallbackText, raw: null };
  } catch (err) {
    console.error('Local fallback error:', err);
    return { structured: null, text: "Sorry — I couldn't process your request right now.", raw: null };
  }
}

export async function summarizeConversation(messages) {
  try {
    // lightweight local summarizer: concatenates user messages (replace with server summarization if available)
    const userTexts = (messages || []).filter(m => m.role === 'user').map(m => m.text).join(' ');
    if (!userTexts) return 'No user messages to summarize.';
    return userTexts.length > 200 ? userTexts.slice(0, 197) + '...' : userTexts;
  } catch (err) {
    console.error('summarizeConversation error:', err);
    throw err;
  }
}

export function clearChatSession() {
  // Placeholder: if you store session/state in localStorage, clear it here.
  // e.g. localStorage.removeItem('chat_session');
  return;
}
