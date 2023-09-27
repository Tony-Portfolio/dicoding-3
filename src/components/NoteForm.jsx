import React, { useState } from 'react';

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleCharacterCount, setTitleCharacterCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNote({ title, body });
    setTitle('');
    setBody('');
    setTitleCharacterCount(0);
  };

  const handleTitleChange = (e) => {
    if (e.target.value.length <= 50) {
      const newTitle = e.target.value;
      setTitle(newTitle);
      setTitleCharacterCount(newTitle.length);
    }
  };

  return (
    <div>
      <h2>Tambah Catatan Baru</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Judul"
          value={title} required
          onChange={handleTitleChange}
        />
        <p>{50 - titleCharacterCount} karakter tersisa</p>
        <textarea
          placeholder="Isi catatan"
          value={body} required
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button type="submit">Tambah Catatan</button>
      </form>
    </div>
  );
};
export default NoteForm;