export default function StudentFormModal({
    editStudent,
    name, setName,
    email, setEmail,
    age, setAge,
    error,
    onSave,
    onClose,
}) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>{editStudent ? '✏️ Edit Student' : '➕ Add New Student'}</h2>

                <form onSubmit={onSave}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Arjun Sharma"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="e.g. arjun@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input
                            type="number"
                            placeholder="e.g. 21"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            min={1}
                            max={100}
                        />
                    </div>

                    {error && <p className="error">⚠️ {error}</p>}

                    <div className="form-actions">
                        <button type="button" className="btn btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {editStudent ? 'Update' : 'Add Student'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
