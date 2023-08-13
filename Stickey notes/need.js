const notesContainer=document.getElementById("app");
const addNotesButton=notesContainer.querySelector(".add-note");


getNotes().forEach(note=>{
    const noteElement = createNoteElement(note.id,note.content);
    notesContainer.insertBefore(noteElement,addNotesButton)
})


addNotesButton.addEventListener("click",()=>addnotes())

function getNotes(){
return JSON.parse(localStorage.getItem("stickynotes-note") || "[]") 
}

function saveNotes(notes){
localStorage.setItem("stickynotes-note",JSON.stringify(notes))
}

function createNoteElement(id,content){
const element = document.createElement("textarea");

element.classList.add("note");
element.value=content;
element.placeholder="Empty Sticky Note"

element.addEventListener("change",()=>{
    updateNote(id,element.value);
});


element.addEventListener('dblclick',()=>{
    // const doDelete="yes"
    const doDelete=confirm("Sure U want to Delete")

    if(doDelete){
        deleteNote(id,element)
    }
    else{
        ""
    }
})
 
return element;
}

function addnotes(){
  const notes= getNotes()
  const noteObject={
    id:Math.floor(Math.random() * 100000),
    content:""
  }

  const noteElement=createNoteElement(noteObject.id,noteObject.content)
  notesContainer.insertBefore(noteElement,addNotesButton)

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id,newContent){
const notes=getNotes();
const targetNote=notes.filter(note=> note.id == id)[0]  

targetNote.content=newContent;
saveNotes(notes);
}

function deleteNote(id,element){
    const notes=getNotes().filter(note => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}