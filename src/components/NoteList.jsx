import React from 'react';

const NoteList = ({ notes, onDelete, onArchive, onEdit, onCancel, formatDate }) => {
  const sortedNotes = [...notes].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  return (
    <div>
      {sortedNotes.length === 0 ? (
        <p>Tidak ada catatan</p>
      ) : (
        sortedNotes.map((note) => (
          <div key={note.id} className="no-notes">
            <h3>{note.title}</h3>
            <span className='date'>dibuat tanggal: {formatDate(new Date(note.createdAt))}</span>
            <p>{note.body}</p>
            <button onClick={() => onDelete(note.id)}>Hapus</button>
            <button onClick={() => {onCancel(); onArchive(note.id)}}>
              {note.archived ? 'Pindahkan' : 'Arsipkan'}
            </button>
            <button onClick={() => {onEdit(note); window.scrollTo(0, 0)}}>
              Ubah
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default NoteList;
