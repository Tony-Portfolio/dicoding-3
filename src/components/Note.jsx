import React from 'react';

const Note = ({ note, onDelete }) => {
  return (
    <li>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => onDelete(note.id)} className="delete">Hapus</button>
    </li>
  );
};

export default Note;
