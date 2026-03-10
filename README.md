# 📚 Student Management System

A modern, responsive **Student Management System** built with **React 19** and **Vite**. This application allows you to manage student records efficiently with features like adding, editing, deleting, searching, sorting, and exporting data.

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
| React 19 | UI Framework |
| Vite | Build Tool & Dev Server |
| Lucide React | Icons |
| react-hot-toast | Notifications |
| xlsx | Excel Export |
| ESLint | Code Linting |

---

## 📁 Project Structure

```
react-assignment-girish/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx          # App header / navbar
│   │   ├── StudentFormModal.jsx # Add/Edit student modal form
│   │   ├── StudentTable.jsx    # Table to display students
│   │   └── Toolbar.jsx         # Search, filter & export controls
│   ├── data/
│   │   └── students.js         # Initial/seed student data
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

Student form validation (defined in `utils/validateStudent.js`) includes:

- **Name** — Required, alphabets only
- **Marks** — Required, numeric, between 0–100
- **Grade** — Auto-calculated or manually set
- Other fields as applicable

---

## 👤 Author

**Girish C Patil**  
🔗 [GitHub](https://github.com/GirishCPatil)

---

## 📄 License

This project is for **educational / assignment purposes**.
