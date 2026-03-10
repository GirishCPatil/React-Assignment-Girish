const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates student fields.
 * Returns an object with per-field error strings.
 * Empty string means the field is valid.
 */
export function validateStudent({ name, email, age }) {
    const errors = { name: '', email: '', age: '' };

    if (!name.trim()) {
        errors.name = 'Full name is required.';
    } else if (name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters.';
    }

    if (!email.trim()) {
        errors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
        errors.email = 'Enter a valid email (e.g. user@example.com).';
    }

    if (!String(age).trim()) {
        errors.age = 'Age is required.';
    } else if (isNaN(age) || Number(age) < 1 || Number(age) > 100) {
        errors.age = 'Age must be a number between 1 and 100.';
    }

    return errors;
}

/** Returns true if all fields are valid (no errors). */
export function isValid(errors) {
    return !errors.name && !errors.email && !errors.age;
}
