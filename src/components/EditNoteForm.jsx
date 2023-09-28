import React, { useState, useEffect } from 'react';

function EditNoteForm({ note, onSave, onCancel }) {
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedBody, setEditedBody] = useState(note.body);

  useEffect(() => {
    setEditedTitle(note.title);
    setEditedBody(note.body);
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedNote = {
      ...note,
      title: editedTitle,
      body: editedBody,
    };
    onSave(updatedNote.id, updatedNote);
  };

  return (
    <div className="edit-note-form">
      <h3>Ubah Catatan</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Judul:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="body">Isi Catatan:</label>
          <br />
          <textarea
            id="body"
            name="body"
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Simpan</button>
          <button type="button" onClick={onCancel}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditNoteForm;
