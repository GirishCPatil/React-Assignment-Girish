# 📚 Student Management System

A modern, responsive **MERN Stack Student Management System** built with **React 19**, **Vite**, **Node.js**, **Express**, and **MongoDB**. This application allows you to manage student records efficiently with features like adding, editing, deleting, searching, sorting, and exporting data.

---

## 🚀 Features

- ✅ **Add / Edit / Delete** student records
- 🔍 **Search & Filter** students in real-time
- 📊 **Sort** by any column (name, marks, grade, etc.)
- 📤 **Export to Excel** using the `xlsx` library
- 🔔 **Toast Notifications** for user feedback via `react-hot-toast`
- 💡 **Form Validation** with custom utility functions
- 📱 **Responsive UI** with clean modern design

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Frontend UI Framework |
| Node.js & Express | Backend API Server |
| MongoDB & Mongoose | Database & ORM |
| Vite | Build Tool & Dev Server |
| Lucide React | Icons |
| react-hot-toast | Notifications |
| xlsx | Excel Export |
| ESLint | Code Linting |

---

## 📁 Project Structure

```
react-assignment-girish/
├── backend/
│   ├── models/
│   │   └── Student.js          # Mongoose schema for students
│   ├── server.js               # Express API and DB connection
│   ├── package.json            # Backend dependencies
│   └── .env                    # Environment variables (Mongo URI)
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx          # App header / navbar
│   │   ├── StudentFormModal.jsx # Add/Edit student modal form
│   │   ├── StudentTable.jsx    # Table to display students
│   │   ├── Toolbar.jsx         # Search, filter & export controls
│   ├── hooks/
│   │   └── useStudents.js      # Custom hook for student state logic
│   ├── utils/
│   │   └── validateStudent.js  # Form validation utilities
│   ├── App.jsx                 # Root component
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/GirishCPatil/React-Assignment-Girish.git

# 2. Navigate into the project directory
cd React-Assignment-Girish

# 3. Install dependencies
npm install
```

### Running the App

```bash
# Start the development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Backend Setup (Optional for local dev)

The frontend is currently configured to point to a deployed backend `https://studentsync-lr3b.onrender.com`.

If you wish to run the backend locally:

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Create a .env file with your MONGO_URI
echo "MONGO_URI=your_mongodb_connection_string" > .env
echo "PORT=5000" >> .env

# 4. Start the Express server
node server.js
```
*(Remember to update `API_URL` in `src/hooks/useStudents.js` to `http://localhost:5000/api/students` if running locally)*

---

## 📦 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |

---

## 📝 Usage

1. **Add a Student** — Click the **"Add Student"** button in the toolbar to open the form modal. Fill in the required fields and submit.
2. **Edit a Student** — Click the **edit icon** on any student row to open the form pre-filled with that student's data.
3. **Delete a Student** — Click the **delete icon** to remove a student (with confirmation).
4. **Search** — Use the search bar in the toolbar to filter students by name or other fields in real-time.
5. **Export** — Click the **Export to Excel** button to download the current student data as a `.xlsx` file.

---

## 🧪 Validation Rules

Student form validation (enforced on both Frontend and MongoDB) includes:

- **Name** — Required, min 2 characters
- **Email** — Required, valid format, MUST BE UNIQUE in the database
- **Age** — Required, numeric, between 1–100

---

## 👤 Author

**Girish C Patil**  
🔗 [GitHub](https://github.com/GirishCPatil)

---

## 📄 License

This project is for **educational / assignment purposes**.
