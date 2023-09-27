import React, { useState } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Babel",
      body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
      archived: false,
      createdAt: '2022-04-14T04:27:34.572Z'
    },
  ]);
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
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes
    .filter((note) => note.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((note) => (showArchived ? note.archived : !note.archived));

  return (
    <div className="App">
      <h1>Aplikasi Catatan Pribadi</h1>
      <input
        type="text"
        placeholder="Cari catatan..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setShowArchived(!showArchived)}>
        {showArchived ? 'Sembunyikan Arsip' : 'Tampilkan Arsip'}
      </button>
      <NoteForm onAddNote={addNote} />
      <NoteList notes={filteredNotes} onDelete={deleteNote} onArchive={toggleArchive} />
    </div>
  );
}

export default App;
