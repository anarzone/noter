'use strict'
//Read existing code from localStorage
const getSavedNotes = ()=>{
    //!== null
    try{
        return localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []
    }catch(e){
        return [];
    }
    
}
//save note to localStorage
const saveNotes = (notes)=>{
    localStorage.setItem('notes',JSON.stringify(notes));
}

//remove note with id
const removeNote = (id)=>{
    const noteIndex = notes.findIndex((note)=>note.id === id)
    if(noteIndex > -1){
        notes.splice(noteIndex,1);
    }
}

//generate note
const generateNoteDOM = (note)=>{
    const noteDiv = document.createElement('a');
    const noteTitle = document.createElement('p');
    const status = document.createElement('p');
    noteDiv.classList.add('noteDiv');

    //setup note title    
    noteTitle.classList.add('noteTitle');
    if(note.title.length > 0){
        noteTitle.innerHTML = note.title;
    }else{
        noteTitle.textContent = 'Unnamed note';
    }
    noteTitle.classList.add('list-item__title');
    noteDiv.appendChild(noteTitle);


    //setup link
    noteDiv.setAttribute('href',`edit.html#${note.id}`);
    noteDiv.classList.add('list-item')

    //setup status message
    status.textContent = generateLastEdited(note.updatedAt);
    status.classList.add('list-item__subtitle')
    noteDiv.appendChild(status);

    
    return noteDiv;
}

//sort notes by one of three ways
const sortNotes = (notes,sortBy)=>{
    if(sortBy === 'byEdited'){
        return notes.sort((a,b)=>{
            if(a.updatedAt > b.updatedAt){
                return -1;
            }
            else if(a.updatedAt < b.updatedAt){
                return 1;
            }else{
                return 0;
            }
        })
    }
    if(sortBy === 'byAdded'){
        return notes.sort((a,b)=>{
            if(a.createdAt > b.createdAt){
                return -1;
            }
            else if(a.createdAt < b.createdAt){
                return 1;
            }else{
                return 0;
            }
        })
    }
    if(sortBy === 'alphabetical'){
        return notes.sort((a,b)=>{
            if(a.title.toUpperCase() < b.title.toUpperCase()){
                return -1;
            }
            else if(a.title.toUpperCase() > b.title.toUpperCase()){
                return 1;
            }else{
                return 0;
            }
        })
    }else{
        return notes;
    }
    
}

//Render notes
let renderNotes = (notes,filters)=>{
    notes = sortNotes(notes,filters.sortBy);
    let filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText));

    notesWrapper.innerHTML = '';

    if(filteredNotes.length > 0){
        filteredNotes.forEach(note => {
            const noteTitle = generateNoteDOM(note);
            notesWrapper.appendChild(noteTitle);
        })
    }else{
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No notes to show';
        emptyMessage.classList.add('empty-message')
        notesWrapper.appendChild(emptyMessage);
    }

    
}


//arrow shorthand function
const generateLastEdited = timestamp => `Last edited ${moment(timestamp).fromNow()}`;