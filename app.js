'use strict'

let notes = getSavedNotes();

let filters = {
    searchText: '',
    sortBy: 'byEdited'
}

const notesWrapper = document.querySelector('.notes');

renderNotes(notes,filters);

document.getElementById('filterId').addEventListener('input',(e)=>{
    filters.searchText = e.target.value.toLowerCase();
    renderNotes(notes,filters);
})

document.querySelector('.addNote').addEventListener('click',()=>{
    const id = uuidv4();
    const timeStamp = moment().valueOf();
    notes.push(
        {
            id: id,
            title: '',
            body: '',
            createdAt: timeStamp,
            updatedAt: timeStamp 
        }
    );
    saveNotes(notes);
    location.assign(`edit.html#${id}`);
})

window.addEventListener('storage',(e)=>{
    if(e.key === 'notes'){
        notes = JSON.parse(localStorage.getItem('notes'));
        renderNotes(notes,filters);
    }
})

document.getElementById('filter-by').addEventListener('change',(e)=>{
    filters.sortBy = e.target.value;
    renderNotes(notes,filters);
}) 


















