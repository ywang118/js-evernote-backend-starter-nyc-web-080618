const Note= (()=> {
  const allNotes = []

  return class{
    constructor(noteJson){
      this.id = noteJson.id;
      this.title = noteJson.title
      this.body = noteJson.body;
      allNotes.push(this);
    }

  static findById(noteId){
    return allNotes.find(note=> note.id == noteId)
  }
  static deleteById(noteId){
    const index = allNotes.indexOf(Note.findById(noteId))
    allNotes.splice(index,1)
  }
   static renderAll(){


    return allNotes.map(note => {
        return  `<p id="${note.id}" data-noteId=${note.id} class='title'>${note.title}</p>`
      }).join('')

  }
  renderNoteDetail(){
    return(`
      <div id="detail-${this.id}">
      <h2> Detail: </h2>
      <p class="body">${this.body}</p>
      <button name='edit' data-editId= "${this.id}"> Edit</button>
      <button name='delete' data-deleteId= "${this.id}">Delete</button>
       </div>
      `)
  }
  updateNote(newNoteDetails){

    this.title = newNoteDetails.title
    this.body = newNoteDetails.body;
  }


  }
})()
