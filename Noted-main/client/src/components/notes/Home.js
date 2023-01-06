import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import CopyAllIcon from "@material-ui/icons/FileCopy";
import EditIcon from "@material-ui/icons/Edit";

export default function Home() {


  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");
  const [query, setquery] = useState("");

  const getNotes = async (token) => {
    const res = await axios.get("api/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`api/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (error) {
      window.location.href = "/";
    }
  };


  return (

    
    <div className="note-wrapper">
      <div className="md-form mt-0">
        <input
          className="form-control"
          type="text"
          placeholder="Search"
          style={{ marginBottom: "2%" }}
          onChange={(e) => setquery(e.target.value)}
        />
      </div>
      {notes.filter(
                (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query) ||
          note.codes.toLowerCase().includes(query)  
              ).map((note) => (
        <div className="card" key={note._id}>
          <h4 title={note.title}>{note.title}</h4>
            
           
    
          <div className="text-wrapper">
            <p>{note.content}</p>
          </div>
           <code>{note.codes}</code>
          <div className="card-footer">
            <Link to={`edit/${note._id}`}>
              <EditIcon />
            </Link>
                  </div>
                   <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
     
                  </div>
          <button className="delete" onClick={() => deleteNote(note._id)}>
            <DeleteIcon />
                  </button>

          <button className="copy" onClick={() => {
         navigator.clipboard.writeText(note.codes);}}>
              <CopyAllIcon />
          </button>
       
        </div>
      ))}
    </div>
    
  );
}
