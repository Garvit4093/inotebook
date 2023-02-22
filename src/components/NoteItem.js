import React,{useContext} from 'react'
import noteContext from "../context/notes/NoteContext";
const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote}=context;
  const {note,updateNote}=props;
  return (
    <>
      <div className="card col-md-3 mx-3 my-3" style={{width: "18rem"}}>
  <div className="card-body">
    <h3 className="card-title">Title : {note.title}</h3>
    <h5 className="card-title">Tag : {note.tag}</h5>
    <p className="card-text">Description : {note.description}</p>
    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i> 
    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}} ></i>
  </div>
</div>
    </>
  )
}  

export default NoteItem
