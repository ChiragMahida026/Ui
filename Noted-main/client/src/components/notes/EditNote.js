import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function EditNote({ match }) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    id: "",
    codes:"",
  });
  const history = useHistory();

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStore");
      if (match.params.id) {
        const res = await axios.get(`/api/notes/${match.params.id}`, {
          headers: { Authorization: token },
        });
        setNote({
          title: res.data.title,
          content: res.data.content,
          codes:res.data.codes,
          id: res.data._id,
        });
      }
    };
    getNote();
  }, [match.params.id]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content,codes, id } = note;
        const newNote = {
          title,
          content,
          codes,
          // date,
        };

        await axios.put(`/api/notes/${id}`, newNote, {
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
      <h2>Edit Note</h2>
      <form onSubmit={editNote} autoComplete="off">
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={note.title}
            id="title"
            name="title"
            required
            onChange={onChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Code Description</label>
          <textarea
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
            style={{resize:"none"}}
            cols={ 5} required  value={note.codes} id="codes" name="codes" onChange={onChangeInput} />
        </div>
        {/* <label htmlFor="date">New Deadline (Current: {note.date} ) </label>
        <div className="row">
          <input type="date" id="date" name="date" onChange={onChangeInput} />
        </div> */}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
