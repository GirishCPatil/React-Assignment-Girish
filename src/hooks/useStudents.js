import { useState, useEffect } from 'react';
import { validateStudent, isValid } from '../utils/validateStudent';

const EMPTY_ERRORS = { name: '', email: '', age: '' };
const API_URL = 'https://studentsync-lr3b.onrender.com/api/students';

export function useStudents() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    // Modal / form state
    const [showForm, setShowForm] = useState(false);
    const [editStudent, setEditStudent] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [fieldErrors, setFieldErrors] = useState(EMPTY_ERRORS);
    const [isSaving, setIsSaving] = useState(false);

    // Delete confirmation state
    const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }

    // Fetch Initial Data
    useEffect(() => {
        fetchStudents();
    }, []);

    async function fetchStudents() {
        setIsLoading(true);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();

            // Map MongoDB _id to id for the frontend
            const mapped = data.map(s => ({
                id: s._id,
                name: s.name,
                email: s.email,
                age: s.age
            }));

            setStudents(mapped);
        } catch (err) {
            console.error('Error fetching students:', err);
        } finally {
            setIsLoading(false);
        }
    }

    // Derived: filtered list
    const filtered = students.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase())
    );

    // ── Helpers ──
    function openAdd() {
        setEditStudent(null);
        setName(''); setEmail(''); setAge('');
        setFieldErrors(EMPTY_ERRORS);
        setShowForm(true);
    }

    function openEdit(student) {
        setEditStudent(student);
        setName(student.name);
        setEmail(student.email);
        setAge(String(student.age));
        setFieldErrors(EMPTY_ERRORS);
        setShowForm(true);
    }

    function closeForm() {
        setShowForm(false);
        setEditStudent(null);
        setFieldErrors(EMPTY_ERRORS);
    }

    async function handleSave(e) {
        e.preventDefault();

        const errors = validateStudent({ name, email, age });
        if (!isValid(errors)) {
            setFieldErrors(errors);
            return;
        }

        setIsSaving(true);
        setFieldErrors(EMPTY_ERRORS);

        const payload = {
            name: name.trim(),
            email: email.trim(),
            age: Number(age)
        };

        try {
            let res;
            if (editStudent) {
                // PUT request for existing student
                res = await fetch(`${API_URL}/${editStudent.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } else {
                // POST request for new student
                res = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            }

            const data = await res.json();

            if (!res.ok) {
                // Backend sent a validation error, probably unique email constraint
                throw new Error(data.error || 'Failed to save');
            }

            // Map the returned mongo object back to local id-based object
            const savedStudent = {
                id: data._id,
                name: data.name,
                email: data.email,
                age: data.age
            };

            if (editStudent) {
                setStudents((prev) => prev.map((s) => s.id === editStudent.id ? savedStudent : s));
            } else {
                // Prepend to top
                setStudents((prev) => [savedStudent, ...prev]);
            }

            closeForm();
        } catch (err) {
            console.error(err);
            // Example handling for duplicate email from backend
            if (err.message.toLowerCase().includes('email')) {
                setFieldErrors({ ...EMPTY_ERRORS, email: err.message });
            } else {
                // Generic error handling (you could use toasts here too if desired)
                alert(`Error saving student: ${err.message}`);
            }
        } finally {
            setIsSaving(false);
        }
    }

    function handleDelete(id) {
        const student = students.find((s) => s.id === id);
        if (student) setDeleteTarget(student);
    }

    async function confirmDelete() {
        if (!deleteTarget) return;

        try {
            const res = await fetch(`${API_URL}/${deleteTarget.id}`, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error('Failed to delete student');

            setStudents((prev) => prev.filter((s) => s.id !== deleteTarget.id));
        } catch (err) {
            console.error('Delete error:', err);
            alert('Could not delete student. Please try again.');
        } finally {
            setDeleteTarget(null);
        }
    }

    function cancelDelete() {
        setDeleteTarget(null);
    }

    return {
        // data
        students,
        filtered,
        search, setSearch,
        isLoading,
        // form fields
        name, setName,
        email, setEmail,
        age, setAge,
        fieldErrors,
        isSaving,
        // modal
        showForm,
        editStudent,
        // actions
        openAdd,
        openEdit,
        closeForm,
        handleSave,
        handleDelete,
        // delete confirmation
        deleteTarget,
        confirmDelete,
        cancelDelete,
    };
}
