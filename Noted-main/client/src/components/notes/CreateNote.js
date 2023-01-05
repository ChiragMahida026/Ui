import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function CreateNote() {
  const [note, setNote] = useState({
    title: "",
    content: "",
    codes:"",
  });
  const history = useHistory();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content,codes } = note;
        const newNote = {
          title,
          content,
          codes,
        };

        await axios.post("/api/notes", newNote, {
          headers: { Authorization: token },
        });

        return history.push("/");
      }
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <div className="create-note">
      <h2>Add Note</h2>
      <form onSubmit={createNote} autoComplete="off">
        <div className="row">
          <label htmlFor="title">Title</label>
<select required  value={note.title} id="title"
            name="title"  onChange={onChangeInput}>
    <option value="" disabled>--Please choose an option--</option>
            <option value="docker">Docker</option>
            <option value="linux">Linux</option>
            <option value="git">Git</option>
            <option value="Install">Install</option>
            <option value="UnInstall">UnInstall</option>
               <option value="Error">Error</option>

          </select>
        </div>

        <div className="row">
          <label htmlFor="content">Code Description</label>
          <textarea
            // type="text"
            value={note.content}
            id="content"
            name="content"
            required
            rows={2}
            style={{resize:"none"}}
            cols={ 5}
            onChange={onChangeInput}
          />
        </div>

        <label htmlFor="codes">Code</label>
          <div className="row">
          <textarea     rows={2}
            style={{ resize: "none" }}
            cols={ 5} required  value={note.codes} id="codes" name="codes" onChange={onChangeInput} />
        </div>

        <button type="submit">Post</button>
      </form>
    </div>
  );
}
