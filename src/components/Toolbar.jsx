export default function Toolbar({ search, onSearchChange, onAdd }) {
    return (
        <div className="toolbar">
            <input
                type="text"
                className="search-input"
                placeholder="🔍 Search by name or email..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <button className="btn btn-primary" onClick={onAdd}>
                ➕ Add Student
            </button>
        </div>
    );
}
