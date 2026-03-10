export default function StudentTable({ students, search, onEdit, onDelete, isLoading }) {

    // Skeleton rows while data is loading
    if (isLoading) {
        return (
            <>
                <div className="table-wrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="skeleton-row">
                                    <td><span className="skeleton-cell" style={{ width: '24px' }} /></td>
                                    <td><span className="skeleton-cell" style={{ width: '120px' }} /></td>
                                    <td><span className="skeleton-cell" style={{ width: '160px' }} /></td>
                                    <td><span className="skeleton-cell" style={{ width: '40px' }} /></td>
                                    <td><span className="skeleton-cell" style={{ width: '120px' }} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="count skeleton-text">Loading students…</p>
            </>
        );
    }

    return (
        <>
            <div className="table-wrap">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="empty">
                                    {search
                                        ? 'No students match your search.'
                                        : 'No students yet. Click "Add Student" to begin.'}
                                </td>
                            </tr>
                        ) : (
                            students.map((student, index) => (
                                <tr key={student.id}>
                                    <td>{index + 1}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.age}</td>
                                    <td className="actions">
                                        <button
                                            className="btn btn-edit"
                                            onClick={() => onEdit(student)}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            className="btn btn-delete"
                                            onClick={() => onDelete(student.id)}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <p className="count">
                Total: {students.length} student{students.length !== 1 ? 's' : ''}
                {search && ` (filtered)`}
            </p>
        </>
    );
}
