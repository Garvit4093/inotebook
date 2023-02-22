// import React, { useContext,useState, useEffect,useRef } from "react";
// import NoteContext from "../context/notes/NoteContext";
// import AddNote from "./AddNote";
// import NoteItem from "./NoteItem";
// const Notes = () => {
//   const context = useContext(NoteContext);
//   const { notes, getNotes,editNote } = context;
//   //  useEffect(async(getNotes) => {
//   //   await getNotes()
//   //   }, [])
//   useEffect(() => {
//     getNotes();
//     // eslint-disable-next-line
//   }, []);
//   const ref = useRef(null);
//   const refClose = useRef(null);
//   const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})
//   const updateNote = (currentnote) => {
//     ref.current.click();
//     setnote({id:currentnote._id, etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
//   };

//   const handleClick=(e)=>{
//     editNote(note.id,note.etitle,note.edescription,note.etag)
//     refClose.current.click();
//     // setnote({etitle:"",edescription:"",etag:""})
//   }
//   const onChange=(e)=>{
//     setnote({...note,[e.target.name]:e.target.value})
//   }
//   return (
//     <>
//       <AddNote />
//       <button
//         ref={ref}
//         type="button"
//         className="btn btn-primary d-none"
//         data-bs-toggle="modal"
//         data-bs-target="#exampleModal"
//       >
//         Edit
//       </button>
//       <div
//         className="modal fade"
//         id="exampleModal"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-etitle fs-5" id="exampleModalLabel">
//                 Edit Note
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//             <form >
//       <div className="mb-3">
//       <label htmlFor="exampleFormControlInput1" className="form-label">title</label>
//       <input type="text" className="form-control" name="etitle" onChange={onChange} value={note.title} minLength={5} required id="exampleFormControlInput1" />
//       </div>
//       <div className="mb-3">
//       <label htmlFor="exampleFormControlTextarea1" className="form-label">description</label>
//       <textarea className="form-control" name="edescription" onChange={onChange}   required value={note.description} id="exampleFormControlTextarea1" rows="7"></textarea>
//       </div>
//       <div className="mb-3">
//       <label htmlFor="exampleFormControlInput1" className="form-label">tag</label>
//       <input type="text" className="form-control" name="etag" onChange={onChange}  required value={note.tag} id="exampleFormControlInput1" />
//       </div>
      
//       </form>
//             </div>
//             <div className="modal-footer">
//               <button
//                 ref={refClose}
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//               <button type="button"  onClick={handleClick} className="btn btn-primary">
//                 Update Note
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row ">
//         <h2>Your Notes.</h2>
//         {notes.map((note) => {
//           return (
//             <NoteItem key={note._id} updateNote={updateNote} note={note} />
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default Notes;
import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/NoteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router';
const Notes = () => {
    const context = useContext(NoteContext);
    let navigate=useNavigate();
    const { notes, getNotes, editNote } = context; 
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        } 
        else{
            localStorage.removeItem('token');
            navigate("/signUp");
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null) 
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }

    const handleClick = ()=>{ 
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" minLength={3}  onChange={onChange}  required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} minLength={6}  onChange={onChange}  required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag"  name="etag" value={note.etag} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  onClick={handleClick} disabled={note.etitle.length<3||note.edescription.length<6}  type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>You Notes</h2>
                <div className="container">{notes.length===0&&'No notes to display'}</div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes