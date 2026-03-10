import { useState, useEffect } from 'react';
import { initialStudents, nextId, incrementNextId } from '../data/students';
import { validateStudent, isValid } from '../utils/validateStudent';

const EMPTY_ERRORS = { name: '', email: '', age: '' };

export function useStudents() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');

    // Simulated initial loading state
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

    // Simulate initial data fetch on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setStudents(initialStudents);
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

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

    function handleSave(e) {
        e.preventDefault();

        const errors = validateStudent({ name, email, age });
        if (!isValid(errors)) {
            setFieldErrors(errors);
            return;
        }

        setIsSaving(true);

        // Simulate async save (600 ms)
        setTimeout(() => {
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
            setIsSaving(false);
            closeForm();
        }, 600);
    }

    // Opens confirmation dialog for delete
    function handleDelete(id) {
        const student = students.find((s) => s.id === id);
        if (student) setDeleteTarget(student);
    }

    // Called when user confirms delete in the dialog
    function confirmDelete() {
        if (deleteTarget) {
            setStudents((prev) => prev.filter((s) => s.id !== deleteTarget.id));
        }
        setDeleteTarget(null);
    }

    // Called when user cancels delete
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
