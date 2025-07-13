
# 🤖 AI Virtual Assistant

A smart and interactive AI-powered virtual assistant web application. Users can sign up, log in, customize their assistant, and ask questions to get instant responses using AI (e.g., OpenAI GPT).

## 🌐 Live Demo

Coming Soon (Add your deployed URL here)

---

## ✨ Features

- 🔐 **Authentication**: Secure Login and Signup with JWT.
- 🎨 **Customizable Assistant**: Change name, theme, and avatar of your assistant.
- 💬 **Chat Interface**: Ask anything, get instant AI-powered answers.
- 🏠 **Home Dashboard**: Quick access to assistant, chat history, and settings.
- 💾 **Persistent Storage**: All chats and preferences saved per user.
- 🌙 **Dark Mode** (optional): Comfortable for night-time use.

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication

**AI Integration:**
- OpenAI GPT (or any other LLM API)

---

## 📁 Project Structure

```
ai-virtual-assistant/
├── client/               # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── App.jsx
├── server/               # Express Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── index.js
├── .env
├── README.md
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB Atlas account
- OpenAI API Key (or your preferred LLM)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ai-virtual-assistant.git
cd ai-virtual-assistant

# Install dependencies for server
cd server
npm install

# Install dependencies for client
cd ../client
npm install
```

### Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

### Run the Project

```bash
# Start backend server
cd server
npm run dev

# Start frontend client
cd ../client
npm start
```

Visit: `http://localhost:3000`

---

## 📸 Screenshots

*(Add screenshots here for login, assistant UI, etc.)*

---

## 📦 API Routes (Backend)

| Route                | Method | Description              |
|---------------------|--------|--------------------------|
| `/api/auth/signup`  | POST   | Register new user        |
| `/api/auth/login`   | POST   | Authenticate user        |
| `/api/assistant`    | GET    | Get assistant settings   |
| `/api/assistant`    | PUT    | Update assistant config  |
| `/api/chat`         | POST   | Send prompt to AI        |

---

## 🧠 How it Works

- User signs up or logs in.
- They customize their assistant (name, avatar, theme).
- On the home page, they ask questions.
- Backend routes the prompt to OpenAI API.
- Response is sent back and displayed in chat.
- All chat history and preferences are saved to MongoDB.

---

## 📌 TODOs

- [ ] Add voice input/output
- [ ] Add image search/generation
- [ ] Export chat history
- [ ] Mobile responsive UI

---

## 👨‍💻 Author

**Manish Kumar**

---

## 📃 License

This project is licensed under the MIT License.
