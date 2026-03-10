import { useStudents } from './hooks/useStudents';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import StudentTable from './components/StudentTable';
import StudentFormModal from './components/StudentFormModal';

export default function App() {
  const {
    filtered, search, setSearch,
    name, setName,
    email, setEmail,
    age, setAge,
    error,
    showForm, editStudent,
    openAdd, openEdit, closeForm,
    handleSave, handleDelete,
  } = useStudents();

  return (
    <div className="app">

      <Header />

      <main className="main">
        <Toolbar
          search={search}
          onSearchChange={setSearch}
          onAdd={openAdd}
        />

        <StudentTable
          students={filtered}
          search={search}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </main>

      {showForm && (
        <StudentFormModal
          editStudent={editStudent}
          name={name} setName={setName}
          email={email} setEmail={setEmail}
          age={age} setAge={setAge}
          error={error}
          onSave={onSave}
          onClose={closeForm}
        />
      )}
    </div>
  );

  // tiny alias so JSX can call it
  function onSave(e) { handleSave(e); }
}
