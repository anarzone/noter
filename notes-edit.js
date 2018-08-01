'use strict'

const noteTitle = document.getElementById('title');
const noteBody = document.getElementById('body');
const lastEdited = document.getElementById('lastEdited');

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(note=>note.id === noteId);
if(!note){
    location.assign('index.html');
}


noteTitle.value = note.title;
noteBody.value = note.body;
lastEdited.textContent = generateLastEdited(note.updatedAt);;

noteTitle.addEventListener('input',(e)=>{
    note.updatedAt = moment();
    lastEdited.textContent = generateLastEdited(note.updatedAt);    
    note.title = e.target.value;
    saveNotes(notes);
})

noteBody.addEventListener('input',(e)=>{
    note.updatedAt = moment().valueOf();
    let time = moment(note.updatedAt);
    lastEdited.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`;
    note.body = e.target.value;
    saveNotes(notes);
});

document.getElementById('removeBtn').addEventListener('click',()=>{
    removeNote(note.id);
    saveNotes(notes);
    location.assign('index.html');
})

window.addEventListener('storage',(e)=>{ 
    if(e.key === 'notes'){
        notes = JSON.parse(localStorage.getItem('notes'));
        note = notes.find(note=>note.id === noteId)

        if(!note){
        location.assign('index.html');
        }

        noteTitle.value = note.title;
        noteBody.value = note.body;
        lastEdited.textContent = generateLastEdited(note.updatedAt);
    }
})



















