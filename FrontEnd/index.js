document.addEventListener("DOMContentLoaded", ()=>{
  const noteTitleDiv=document.getElementById('note-title')
  const noteBodyDiv = document.getElementById('note-body')
  const creatNewNoteForm = document.getElementById('create-note-form')
  // get all note title
  fetch('http://localhost:3000/api/v1/notes')
    .then(res=> res.json())
    .then(resJson => {
      resJson.forEach(noteObj=> {
        const newNote= new Note(noteObj)
      //  noteTitleDiv.innerHTML += newNote.render()
      })
      noteTitleDiv.innerHTML = Note.renderAll()
    })
  // get each note detail
  noteTitleDiv.addEventListener('click',e=>{
    if (e.target.className ==='title'){
      const noteId =e.target.dataset.noteid
      const targetNote = Note.findById(noteId)
      noteBodyDiv.innerHTML = targetNote.renderNoteDetail();
    }
  })


  let noteId;
  noteBodyDiv.addEventListener('click', e=>{
    if(e.target.name === "edit"){
      noteId = parseInt(e.target.dataset.editid)
      const targetNote = Note.findById(noteId)
      creatNewNoteForm[0].value = targetNote.title
      creatNewNoteForm[1].value = targetNote.body
    }

  })

//  edit or create
  creatNewNoteForm.addEventListener('submit', e=>{
    e.preventDefault()

    if (Note.findById(noteId)) {
      targetNote = Note.findById(noteId)
      const formInputs = e.target.querySelectorAll('input')
      let editedTitle = formInputs[0].value
      let editedBody = formInputs[1].value
      fetch(`http://localhost:3000/api/v1/notes/${noteId}`,{
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        body:JSON.stringify({

          title: editedTitle,
          body: editedBody

        })
      }).then(res=> res.json())
      .then (resJson=>{

        targetNote.updateNote(resJson)
        const updateTitle = document.getElementById(noteId)
        updateTitle.innerText = targetNote.title;
        noteBodyDiv.innerHTML = targetNote.renderNoteDetail();

      })

    } else {

        let titleInput= event.target.querySelector('#title').value
        let bodyInput = event.target.querySelector('#body').value
        fetch('http://localhost:3000/api/v1/notes',
        {method: 'POST',
        headers: {
          "Accept": 'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          title: titleInput,
          body: bodyInput,
          user_id: 3
        })

      }).then(res => res.json())
      .then(resJson=>{
        let new_note = new Note(resJson)
        //noteTitleDiv.innerHTML += new_note.render()
        noteTitleDiv.innerHTML = Note.renderAll()
      })
      e.target.reset()
    }// end of post submit



  }) // end of submit eventlistener

  // delete button
  noteBodyDiv.addEventListener("click", e => {

    if (e.target.name=== "delete"){
      const deleteId = parseInt(e.target.dataset.deleteid)
      fetch (`http://localhost:3000/api/v1/notes/${deleteId}`,
        {method: "DELETE"
      }).then(res => res.json())
        .then(resJson => {
          Note.deleteById(noteId)


          // document.getElementById(`${deleteId}`).remove()
            noteTitleDiv.innerHTML = Note.renderAll()
          const deleteDiv = document.getElementById(`detail-${deleteId}`)
          deleteDiv.innerHTML = ""
        })
    }
  })


})
