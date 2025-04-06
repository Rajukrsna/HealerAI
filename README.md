# 💖 HealerAI – A Web App to Heal Your Emotions with AI

HealerAI is an emotional wellness web application that helps users understand and manage their emotions through AI-powered emotion detection and personalized yoga and meditation practices.

---

## 🌟 Inspiration

Human beings experience up to 64 different types of emotions. Many individuals struggle to recognize and regulate their emotional states, which can lead to mental health challenges such as anxiety, depression, and even suicidal thoughts.  

HealerAI was created to address this problem by educating users about emotions and offering guided healing practices tailored to their emotional needs.

---

## 🚀 Features

- 📖 Learn about 64 core human emotions
- 🧘‍♀️ Guided yoga and meditation practices linked to each emotion
- 🤖 AI-based Emotion Detection using:
  - Face recognition (`face-api.js`)
  - Voice input and question analysis
- 🧭 Emotion Finder: Can’t name the emotion you're feeling? Let the AI guide you.
- 🎯 Simple and intuitive user interface

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Material UI (MUI)

### Backend
- Node.js & Express.js
- MongoDB (Atlas)

### AI/ML Integration
- face-api.js
- TensorFlow.js
- Voice and text processing

---

## 📦 Installation

```bash
git clone https://github.com/rajukrsna/HealerAI.git
cd backend
npm install
npm server.js
```


```bash
cd frontend
npm install
npm start
```

Include these in .env file in backend

```bash
MONGO_URI=your mongodb connection string
JWT_SECRET=your jwt secret token
```
