# 🧠 AI-Powered Test Evaluation App

A full-stack application for creating, submitting, and evaluating tests using AI and manual instructor overrides.

---

## 🚀 Deployed Application

🔗 [Live App Link](https://oxeir-frontend-87b1.vercel.app/) 

---

## 📚 Features

### 👨‍🎓 Learner
- ✅ Register and login
- 📝 Take tests assigned by the instructor
- 📊 View scores and feedback
  - See whether feedback is AI-generated or instructor-evaluated

---

### 👩‍🏫 Instructor
- 🔐 Can only login  
  - **Email:** `instructor@admin.com`  
  - **Password:** `instructor123`
- ➕ Create new tests
- 🗑️ Delete tests
- 👀 View learner submissions
- 🤖 Evaluate using AI model
- ✍️ Override AI-generated score and feedback if needed

---

## 🔐 Authentication

- JWT tokens used for secure route protection and session management

---

## 🧩 Tech Stack

- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Token)
- **AI Evaluation:** [Custom logic or API, e.g. OpenAI – mention if used]

---

## 🛠️ Getting Started (Locally)

### Prerequisites
- Node.js
- MongoDB URI
- `.env` file

### .env file structure

```env
PORT=10000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
