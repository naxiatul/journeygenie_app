let noteToDeleteId = null;


document.getElementById('modal').addEventListener('click', function(event) {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});

document.getElementById('addNote').addEventListener('click', function() {
    const noteTitle = document.getElementById('newNoteTitle').value;
    if (noteTitle) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const newNote = { id: Date.now(), title: noteTitle };
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        document.getElementById('newNoteTitle').value = ''; 
        document.getElementById('modal').style.display = 'none'; 
        displayNotes();
        document.getElementById('savePopup').style.display = 'flex';
    }
});

function deleteNoteById(noteId) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes(); 
    document.getElementById('deletePopup').style.display = 'flex';
}

function displayNotes() {
    const notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.textContent = note.title;

        noteDiv.addEventListener('click', function() {
            window.location.href = `note.html?id=${note.id}`; 
        });

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'bx bxs-trash';
        deleteIcon.dataset.id = note.id;
        deleteIcon.addEventListener('click', function(event) {
            event.stopPropagation(); 
            noteToDeleteId = note.id; 
            document.getElementById('deletePopup').style.display = 'flex';
        });

        noteDiv.appendChild(deleteIcon); 
        notesContainer.appendChild(noteDiv); 
    });
}

function searchNotes() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const notesContainer = document.getElementById('notes');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notesContainer.innerHTML = ''; 

    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(input));

    filteredNotes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.textContent = note.title;

        noteDiv.addEventListener('click', function() {
            window.location.href = `note.html?id=${note.id}`; 
        });

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'bx bxs-trash';
        deleteIcon.dataset.id = note.id;
        deleteIcon.addEventListener('click', function(event) {
            event.stopPropagation();
            if (confirm("Are you sure you want to delete this note?")) {
                deleteNoteById(note.id);
            }
        });

        noteDiv.appendChild(deleteIcon);
        notesContainer.appendChild(noteDiv); 
    });
}

document.getElementById('openModal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('newNoteTitle').focus();
});

document.querySelector('.search-button').addEventListener('click', searchNotes);

window.addEventListener('load', displayNotes);

document.getElementById("confirmDeleteBtn").addEventListener("click", function() {
    if (noteToDeleteId !== null) {
        deleteNoteById(noteToDeleteId); 
        noteToDeleteId = null; 
        document.getElementById("deletePopup").style.display = "none";
    }
});

document.getElementById("cancelDeleteBtn").addEventListener("click", function() {
    document.getElementById('deletePopup').style.display = 'none'; 
    noteToDeleteId = null; 
});

document.getElementById("closeSaveBtn").addEventListener("click", function() {
    document.getElementById('savePopup').style.display = 'none'; 
});
