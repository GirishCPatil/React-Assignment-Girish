
export function validateStudent({ name, email, age }) {
    if (!name.trim()) return 'Name is required.';
    if (!email.trim()) return 'Email is required.';
    if (!email.includes('@')) return 'Enter a valid email.';
    if (!age || isNaN(age) || Number(age) < 1 || Number(age) > 100)
        return 'Age must be between 1 and 100.';
    return '';
}
