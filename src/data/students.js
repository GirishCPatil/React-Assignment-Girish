// ── Initial student data ──
export const initialStudents = [
    { id: 1, name: 'Arjun Sharma', email: 'arjun@email.com', age: 20 },
    { id: 2, name: 'Priya Patel', email: 'priya@email.com', age: 22 },
    { id: 3, name: 'Rahul Verma', email: 'rahul@email.com', age: 21 },
    { id: 4, name: 'Sneha Gupta', email: 'sneha@email.com', age: 23 },
    { id: 5, name: 'Vikram Singh', email: 'vikram@email.com', age: 19 },
    { id: 6, name: 'Ananya Joshi', email: 'ananya@email.com', age: 24 },
];

// Mutable counter kept outside React state (same as before)
export let nextId = 7;
export function incrementNextId() {
    nextId += 1;
}
