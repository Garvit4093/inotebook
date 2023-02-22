import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState=(props)=>{
  const host="http://localhost:5000";
    const notesinitial=[]
    const [notes, setNotes] = useState(notesinitial)
    //get notes
    const getNotes=async()=>{
      const response=await fetch(`${host}/api/notes/fetchNotes`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        } 
      });
      const json=await response.json()
      setNotes(json)
    }
    //add note
    const addNote=async(title,description,tag)=>{  
       const response=await fetch(`${host}/api/notes/addNotes`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      });
      const note=await response.json();
      setNotes(notes.concat(note))
    }
    //delete note
    const deleteNote=async(id)=>{
     const response=await fetch(`${host}/api/notes/deleteNotes/${id}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        }
      });
      response.json();
      
      const newNotes=notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
    }
    //edit note
    const editNote=async (id,title,description,tag)=>{
      const response=await fetch(`${host}/api/notes/updateNotes/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      });
      response.json();
      let newNotes=JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;
        }
      }
      setNotes(newNotes);
    }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;