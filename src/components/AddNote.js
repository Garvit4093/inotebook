import React,{useContext,useState} from 'react'
import noteContext from "../context/notes/NoteContext";
const AddNote = () => {
  const context = useContext(noteContext);
  const {addNote}=context; 
  const [note, setnote] = useState({title:"",description:"",tag:"General"})
  const handleClick=(e)=>{
    
    setnote({title:0,description:0,tag:"General"}) 
    addNote(note.title,note.description,note.tag); 
    
  }
  const onChange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
      <h2>Add a Note</h2>
      <div className="container my-1">
      <form >
      <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
      <input type="text" className="form-control" required name="title" onChange={onChange} minLength={3} id="exampleFormControlInput1" placeholder="Title"/>
      </div>
      <div className="mb-3">
      <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
      <textarea className="form-control" required name="description" onChange={onChange} minLength={6} id="exampleFormControlTextarea1" rows="7"></textarea>
      </div>
      <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
      <input type="text" className="form-control" value={note.tag} name="tag" onChange={onChange} id="exampleFormControlInput1" placeholder="Tag"/>
      </div>
      <button disabled={note.title.length<3 || note.description.length<6} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
      </div>
    </>
  )
}

export default AddNote
