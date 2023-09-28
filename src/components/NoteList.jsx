import React from 'react';

const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return date.toLocaleDateString('id-ID', options);
};

const NoteList = ({ notes, onDelete, onArchive, onEdit, isEdit }) => {
  return (
    <div>
      {notes.length === 0 ? (
        <p>Tidak ada catatan</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="no-notes">
            <h3>{note.title}</h3>
            <span className='date'>dibuat tanggal: {formatDate(note.createdAt)}</span>
            <p>{note.body}</p>
            <button onClick={() => onDelete(note.id)}>Hapus</button>
            {!isEdit ?
              <button onClick={() => onArchive(note.id)}>
                {note.archived ? 'Pindahkan' : 'Arsipkan'}
              </button>
              : ''}
            <button onClick={() => onEdit(note)}>
              Ubah
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default NoteList;
