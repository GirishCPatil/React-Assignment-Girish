export default function StudentFormModal({
    editStudent,
    name, setName,
    email, setEmail,
    age, setAge,
    fieldErrors = { name: '', email: '', age: '' },
    isSaving,
    onSave,
    onClose,
}) {
    return (
        <div className="modal-overlay" onClick={isSaving ? undefined : onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>{editStudent ? '✏️ Edit Student' : '➕ Add New Student'}</h2>

                <form onSubmit={onSave} noValidate>
                    {/* Name */}
                    <div className="form-group">
                        <label>Full Name <span className="required">*</span></label>
                        <input
                            type="text"
                            placeholder="e.g. Arjun Sharma"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={fieldErrors.name ? 'input-error' : ''}
                            disabled={isSaving}
                        />
                        {fieldErrors.name && (
                            <p className="field-error">⚠ {fieldErrors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label>Email <span className="required">*</span></label>
                        <input
                            type="email"
                            placeholder="e.g. arjun@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={fieldErrors.email ? 'input-error' : ''}
                            disabled={isSaving}
                        />
                        {fieldErrors.email && (
                            <p className="field-error">⚠ {fieldErrors.email}</p>
                        )}
                    </div>

                    {/* Age */}
                    <div className="form-group">
                        <label>Age <span className="required">*</span></label>
                        <input
                            type="number"
                            placeholder="e.g. 21"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            min={1}
                            max={100}
                            className={fieldErrors.age ? 'input-error' : ''}
                            disabled={isSaving}
                        />
                        {fieldErrors.age && (
                            <p className="field-error">⚠ {fieldErrors.age}</p>
                        )}
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-cancel"
                            onClick={onClose}
                            disabled={isSaving}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <span className="btn-saving">
                                    <span className="spinner" /> Saving…
                                </span>
                            ) : (
                                editStudent ? 'Update Student' : 'Add Student'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
