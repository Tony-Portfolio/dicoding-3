import React, { useState } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import EditNoteForm from './components/EditNoteForm';
import { getInitialData, showFormattedDate } from './utils/index';

function App() {
  const [notes, setNotes] = useState(getInitialData);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showArchived, setShowArchived] = useState(false);

  const addNote = (newNote) => {
    setNotes([
      ...notes,
      { ...newNote, id: Date.now(), archived: false, createdAt: new Date().toISOString() },
    ]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const toggleArchive = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, archived: !note.archived };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const editNote = (id, updatedNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, ...updatedNote };
      }
      return note;
    });
    setNotes(updatedNotes);
    hideEditForm();
  };


  const showEditFormForNote = (note) => {
    setSelectedNote(note);
    setShowEditForm(true);
  };

  const hideEditForm = () => {
    setSelectedNote(null);
    setShowEditForm(false);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes
    .filter((note) => note.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((note) => (showArchived ? note.archived : !note.archived));

  return (
    <div className="App">
      <h1>Aplikasi Catatan Pribadi</h1>
      <main>
        <section>
          <NoteForm onAddNote={addNote} />
          <hr />
          {showEditForm && (
            <>

              <EditNoteForm
                note={selectedNote}
                onSave={editNote}
                onCancel={hideEditForm}
              />
            </>
          )}
        </section>
        <section>
          <div className="search">
            <input
              type="text"
              placeholder="Cari catatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => {setShowArchived(!showArchived),hideEditForm()}}>
              {showArchived ? 'Sembunyikan Arsip' : 'Tampilkan Arsip'}
            </button>
          </div>
          <NoteList
            notes={filteredNotes}
            onDelete={deleteNote}
            onArchive={toggleArchive}
            onEdit={showEditFormForNote}
            onCancel={hideEditForm}
            formatDate={showFormattedDate}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
