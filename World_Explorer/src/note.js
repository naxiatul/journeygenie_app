function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').setAttribute('min', today);
    document.getElementById('endDate').setAttribute('min', today);
}

function editNote() {
    document.getElementById('noteTitle').disabled = false;
    document.getElementById('noteContent').contentEditable = "true";
    document.getElementById('startDate').disabled = false;
    document.getElementById('endDate').disabled = false;

    document.getElementById('noteTitle').focus();
}

window.addEventListener('load', function() {
    setMinDate();

    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get('id');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    const note = notes.find(n => n.id == noteId);
    if (note) {
        document.getElementById('noteTitle').value = note.title || "";
        document.getElementById('noteContent').innerText = note.text || "";
        document.getElementById('startDate').value = note.startDate || "";
        document.getElementById('endDate').value = note.endDate || "";

        document.getElementById('noteTitle').disabled = true;
        document.getElementById('noteContent').contentEditable = "false";
        document.getElementById('startDate').disabled = true;
        document.getElementById('endDate').disabled = true;

        console.log("Loaded note for editing:", note);
    } else {
        alert("Note not found!");
    }
});

function saveNote() {
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get('id');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    const updatedTitle = document.getElementById('noteTitle').value.trim();
    const updatedText = document.getElementById('noteContent').innerText.trim();
    const updatedStartDate = document.getElementById('startDate').value;
    const updatedEndDate = document.getElementById('endDate').value;

    const noteIndex = notes.findIndex(n => n.id == noteId);
    if (noteIndex !== -1) {
        if (new Date(updatedStartDate) > new Date(updatedEndDate)) {
            alert("The start date must be before or the same as the end date.");
            return; 
        }
        
        notes[noteIndex].title = updatedTitle;
        notes[noteIndex].text = updatedText;
        notes[noteIndex].startDate = updatedStartDate;
        notes[noteIndex].endDate = updatedEndDate;

        localStorage.setItem('notes', JSON.stringify(notes));

        document.getElementById('savePopup').style.display = 'flex';

        document.getElementById('noteTitle').disabled = true;
        document.getElementById('noteContent').contentEditable = "false";
        document.getElementById('startDate').disabled = true;
        document.getElementById('endDate').disabled = true;

        document.getElementById('closeSaveBtn').onclick = function() {
            document.getElementById('savePopup').style.display = 'none';
            window.location.href = 'homenote.html';
        };
    } else {
        alert("Error: Note not found.");
    }
}

document.getElementById("closeSaveBtn").addEventListener("click", function() {
    document.getElementById('savePopup').style.display = 'none'; 
});

function goBack() {
    window.location.href = 'homenote.html';
}