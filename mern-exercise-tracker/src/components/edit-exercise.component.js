import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditExercise = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const userInputRef = useRef();

  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/'+id)
      .then(response => {
        setUsername(response.data.username);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setDate(new Date(response.data.date));
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/'+id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  const formattedDate = date instanceof Date
    ? date.toISOString().substr(0,10) // If date is a Date object
    : date; // If date is already a string

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref={userInputRef}
              required
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}>
              {
                users.map(user => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input type="text"
              required
              className="form-control"
              value={description}
              onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input type="text" 
              className="form-control"
              value={duration}
              onChange={e => setDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <input type="date"
              className="form-control"
              value={formattedDate}
              onChange={e => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default EditExercise;
