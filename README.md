# 🔗 ShortURL Web App

A full-stack **URL Shortener** web application built using the **MERN stack (MongoDB, Express, React, Node.js)** that allows authenticated users to:

- Generate **shortened URLs**
- Create **QR codes** for any URL
- Track **analytics** with interactive **line charts**, **bar charts**, and a **click data table**
- Handle multiple users with **JWT-based authentication**
- Enjoy a **responsive UI** designed for both mobile and desktop

---

## 📸 Features

- 🔐 **Authentication**: Secure login/signup system using JWT
- ✂️ **URL Shortener**: Enter a long URL and generate a unique short URL
- 📊 **Analytics Dashboard**:
  - Line and bar charts to track click activity
  - A responsive table showing:
    - Original (long) URL
    - Short URL
    - Number of clicks
- 📱 **QR Code Generator**: Generate QR codes for easy sharing
- 🧑‍🤝‍🧑 **Multi-user Support**: Each user manages their own shortened URLs
- 🧿 **Responsive Design**: Optimized for all screen sizes

---

## 🚀 Tech Stack

- **Frontend**: React, Tailwind CSS, Chart.js / Recharts
- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Others**: QR Code Generator Library, Axios, dotenv

---

## 📂 Folder Structure

```bash
shorturl-app/
│
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Login, Signup, Dashboard, etc.
│   │   ├── App.js
│   │   └── ...
│
├── server/               # Node.js + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── ...
│
├── .env
├── README.md
└── package.json
