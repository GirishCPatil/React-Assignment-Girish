import { useStudents } from './hooks/useStudents';
import { useExcelExport } from './hooks/useExcelExport';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import StudentTable from './components/StudentTable';
import StudentFormModal from './components/StudentFormModal';
import ConfirmDialog from './components/ConfirmDialog';

export default function App() {
  const {
    students,
    filtered, search, setSearch,
    isLoading,
    name, setName,
    email, setEmail,
    age, setAge,
    fieldErrors,
    isSaving,
    showForm, editStudent,
    openAdd, openEdit, closeForm,
    handleSave, handleDelete,
    deleteTarget, confirmDelete, cancelDelete,
  } = useStudents();

  const { exportToExcel } = useExcelExport();

  function handleExport() {
    const isFiltered = search.trim().length > 0;
    exportToExcel(isFiltered ? filtered : students, isFiltered);
  }

  return (
    <div className="app">

      <Header />

      <main className="main">
        <Toolbar
          search={search}
          onSearchChange={setSearch}
          onAdd={openAdd}
          onExport={handleExport}
        />

        <StudentTable
          students={filtered}
          search={search}
          onEdit={openEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </main>

      {showForm && (
        <StudentFormModal
          editStudent={editStudent}
          name={name} setName={setName}
          email={email} setEmail={setEmail}
          age={age} setAge={setAge}
          fieldErrors={fieldErrors}
          isSaving={isSaving}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          studentName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

    </div>
  );
}
