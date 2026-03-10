export default function ConfirmDialog({ studentName, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
                <div className="confirm-icon">🗑️</div>
                <h2>Delete Student?</h2>
                <p className="confirm-message">
                    Are you sure you want to delete <strong>{studentName}</strong>?
                    <br />
                    <span className="confirm-sub">This action cannot be undone.</span>
                </p>
                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-cancel"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-delete-confirm"
                        onClick={onConfirm}
                    >
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
