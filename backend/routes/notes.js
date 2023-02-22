const express=require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const fetch=require('../middleware/fetch');
const Notes=require('../models/Notes');
//get notes
router.get('/fetchNotes',fetch,async (req,res)=>{
    try{
    const notes=await Notes.find({user:req.user.id});
    res.json(notes);
    }
    catch(error){
        console.error(error.message);
      res.status(500).send("Server error occured.");
    }
})
// add notes
router.post('/addNotes',[
  body('title','Enter a valid email!').isLength({min:3}),
  body('description','Enter minimum 6 characters!').isLength({ min: 6 }),
],fetch,async(req,res)=>{
    try{
    const {title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else{
    let note=await Notes.findOne({title:req.body.title});
    if(note){
        return res.status(400).json({error:"Sorry a note with this title already exists."})
    }
    const notes=new Notes({
        title,description,tag,user:req.user.id
    })
    const saveNote=await notes.save()
    res.json(saveNote);
  }
}
catch(error){
    console.error(error.message);
      res.status(500).send("Server error occured.");
}
})
// update notes
router.put('/updateNotes/:id',fetch,async(req,res)=>{
  try{
  const {title,description,tag}=req.body;
  const new_notes={};
  if(title){new_notes.title=title};
  if(description){new_notes.description=description};
  if(tag){new_notes.tag=tag};
  let note=await Notes.findById(req.params.id);
  if(!note){
    return res.status(404).send("Not found.");
  }
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not authorized.");
  }
  note=await Notes.findByIdAndUpdate(req.params.id,{$set:new_notes},{new:true});
  res.json({note});
}
catch(error){
  console.error(error.message);
    res.status(500).send("Server error occured.");
}
})
//deletenote
router.delete('/deleteNotes/:id',fetch,async(req,res)=>{
  try{
  let note=await Notes.findById(req.params.id);
  if(!note){
    return res.status(404).send("Not found.");
  }
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not authorized.");
  }
  note=await Notes.findByIdAndDelete(req.params.id);
  res.json("deleted");
}
catch(error){
  console.error(error.message);
    res.status(500).send("Server error occured.");
}
})
module.exports=router;