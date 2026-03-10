import { useState } from 'react';
import { initialStudents, nextId, incrementNextId } from '../data/students';
import { validateStudent } from '../utils/validateStudent';


export function useStudents() {
    const [students, setStudents] = useState(initialStudents);
    const [search, setSearch] = useState('');

    // Modal / form state
    const [showForm, setShowForm] = useState(false);
    const [editStudent, setEditStudent] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');

    // Derived
    const filtered = students.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase())
    );

    // ── Helpers ──
    function openAdd() {
        setEditStudent(null);
        setName(''); setEmail(''); setAge(''); setError('');
        setShowForm(true);
    }

    function openEdit(student) {
        setEditStudent(student);
        setName(student.name);
        setEmail(student.email);
        setAge(String(student.age));
        setError('');
        setShowForm(true);
    }

    function closeForm() {
        setShowForm(false);
        setEditStudent(null);
        setError('');
    }

    function handleSave(e) {
        e.preventDefault();
        const msg = validateStudent({ name, email, age });
        if (msg) return setError(msg);

        if (editStudent) {
            setStudents((prev) =>
                prev.map((s) =>
                    s.id === editStudent.id
                        ? { ...s, name: name.trim(), email: email.trim(), age: Number(age) }
                        : s
                )
            );
        } else {
            const newId = nextId;
            incrementNextId();
            setStudents((prev) => [
                ...prev,
                { id: newId, name: name.trim(), email: email.trim(), age: Number(age) },
            ]);
        }

        closeForm();
    }

    function handleDelete(id) {
        if (window.confirm('Are you sure you want to delete this student?')) {
            setStudents((prev) => prev.filter((s) => s.id !== id));
        }
    }

    return {
        // data
        filtered,
        search, setSearch,
        // form fields
        name, setName,
        email, setEmail,
        age, setAge,
        error,
        // modal
        showForm,
        editStudent,
        // actions
        openAdd,
        openEdit,
        closeForm,
        handleSave,
        handleDelete,
    };
}
