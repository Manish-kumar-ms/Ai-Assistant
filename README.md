
# 🤖 AI Virtual Assistant

A smart and interactive AI-powered virtual assistant web application. Users can sign up, log in, customize their assistant, and ask questions to get instant responses using AI (**Gemini API**).

## 🌐 Live Demo

Coming Soon (Add your deployed URL here)

---

## ✨ Features

- 🔐 **Authentication**: Secure Login and Signup with JWT  
- 🎨 **Customizable Assistant**: Change name, theme, and avatar of your assistant  
- 💬 **Chat Interface**: Ask anything, get instant AI-powered answers using Gemini API  
- 🏠 **Home Dashboard**: Quick access to assistant, chat history, and settings  
- 💾 **Persistent Storage**: All chats and preferences saved per user  
- 🧠 **State Management**: Uses React Context API for global state handling  

---

## 🛠 Tech Stack

**Frontend:**

- React.js  
- Tailwind CSS  
- Axios  
- Context API  

**Backend:**

- Node.js  
- Express.js  
- MongoDB (with Mongoose)  
- JWT Authentication  
- Multer (for image uploads)  

**AI Integration:**

- Google Gemini API (LLM)  

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
- Gemini API Key from Google AI Studio  
- Cloudinary Account (for assistant image upload)  

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ai-virtual-assistant.git
cd ai-virtual-assistant

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=
MONGODB_URL=
JWT_SECRET=
CLOUD_NAME=
API_KEY=
API_SECURE=
FOLDER_NAME=
GEMINI_API_URL=
```

---

## 📦 Backend API Routes

### **Auth Routes**

| Method | Route        | Description        |
|--------|--------------|--------------------|
| POST   | `/signup`    | Register new user  |
| POST   | `/signin`    | Authenticate user  |
| GET    | `/logout`    | Logout user        |

### **Assistant Routes**

| Method | Route                   | Description                        |
|--------|-------------------------|------------------------------------|
| GET    | `/current`              | Get current user info              |
| POST   | `/update`               | Update assistant settings/image    |
| POST   | `/asktoassistant`       | Send prompt to Gemini AI API       |

---

## 🧠 How it Works

- Users sign up or log in  
- Customize assistant (name, image, theme)  
- On home, ask questions to AI (Gemini API)  
- Responses are returned and shown in chat  
- State is managed globally using Context API  
- All preferences and chat history are stored in MongoDB  

---

## 👨‍💻 Author

**Manish Kumar**
