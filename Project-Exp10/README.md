# 🛍️ AI E-Commerce Chat Assistant

An interactive AI-powered chat application that helps users explore futuristic tech products in a simulated online store.  
The chatbot can answer product-related queries, show prices, and provide contextual suggestions — all through a simple conversational interface.

---

## 🚀 Overview

**AI E-Commerce Chat Assistant** is a demo application that showcases how conversational AI can enhance the online shopping experience.

The project includes:
- A **React + Vite** frontend chat interface.
- An **Express.js** backend API that processes chat requests and responds using AI logic.
- A set of futuristic **product data** displayed dynamically through the chatbot.

Users can ask questions like:
> “What’s the price of the Quantum-Core Laptop?”  
> “Show me wearable gadgets.”  
> “Compare headphones and earbuds.”

and receive contextual, human-friendly responses directly from the chatbot.

---

## 🧠 Features

```
💬 Interactive Chatbot Interface — talk naturally with the assistant.  
🧾 Dynamic Product Data — 16 futuristic tech products with descriptions, prices, and categories.  
🔍 AI Context Awareness — responses are generated based on actual product data.  
📦 Express API Server — backend route /api/ai-chat handles all chat requests.  
🧰 Mock Fallback Mode — if the API server is offline, the client performs local keyword-based matching.  
🌐 Network Accessible — access the app from another device on the same Wi-Fi network.  
```

---

## 🧩 Folder Structure

```
Project-Exp10/
│
├── server/
│   └── ai-chat.js           # Express backend API route
│
├── src/
│   ├── components/          # React components (ChatWindow, Header, etc.)
│   ├── data/
│   │   └── products.js      # Product catalog (JSON data)
│   ├── services/
│   │   └── chatService.jsx  # Client-side chat logic (API + fallback)
│   └── App.jsx
│
├── public/
│   └── index.html
│
├── .env                     # Environment variables (e.g., VITE_API_URL)
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```
git clone https://github.com/your-username/Project-Exp10.git
cd Project-Exp10
```

### 2️⃣ Install dependencies
```
npm install
```

### 3️⃣ Create a `.env` file
```
VITE_API_URL=http://localhost:5000
```
If you want to access it from another device (same Wi-Fi network), replace `localhost` with your local IP (e.g. `192.168.x.x`).

---

## 🖥️ Running the Application

### 🔹 Start the backend server
```
npm run start:server
```
The API will start on:
```
http://localhost:5000
```

### 🔹 Start the frontend (React + Vite)
```
npm run start:client
```
The development server will run at:
```
http://localhost:5173
```

💡 **Tip:** Run both servers together:
```
npm run dev
```
(Uses `concurrently` to launch frontend + backend.)

---

## 🌍 Access from Another Device
```
1. Run Vite with host mode enabled:
   vite --host

2. Find your local IP:
   ipconfig   # Windows
   ifconfig   # macOS/Linux

3. On your phone or another computer (same Wi-Fi), open:
   http://<your-ip>:5173
   Example: http://192.168.1.8:5173

4. Update your .env file:
   VITE_API_URL=http://192.168.1.8:5000
```

---

## 🧩 Technologies Used

```
Frontend:  React, Vite, Tailwind CSS  
Backend:   Node.js, Express.js  
Env Mgmt:  dotenv  
Utilities: concurrently, body-parser, cors
```

---

## 🧠 How It Works

```
1. The frontend captures user input and sends it to /api/ai-chat via fetch().
2. The backend receives the message, processes it, and responds with a JSON object.
3. The client displays the AI’s answer (and suggestions) in the chat window.
4. If the backend is offline, the client automatically performs a local search on product data.
```

---


## 📄 License

```
This project is open-source and free to use for learning and demonstration purposes.
```

---

## 👨‍💻 Author

```
Sparsh Sahni  
Department of Artificial Intelligence and Machine Learning
Chandigarh University
```

---

## 🏁 Summary

```
This project demonstrates how an AI-driven conversational interface can make online product discovery more engaging and human-like.  
It blends clean UI, fast Vite development, and flexible backend logic to simulate a futuristic e-commerce experience.
```
