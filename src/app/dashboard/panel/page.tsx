"use client"


import { useState, useEffect } from 'react';
import axios from 'axios';

const page = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [editing, setEditing] = useState(false);
    const [userId, setUserId] = useState(null);
  
    useEffect(() => {
      axios.get('/api/users')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    const handleAddUser = () => {
      axios.post('/api/users', { name, age })
        .then(response => {
          setUsers([response.data, ...users]);
          setName('');
          setAge(0);
        })
        .catch(error => {
          console.error(error);
        });
    };
  
    const handleEditUser = () => {
      axios.put(`/api/users/${userId}`, { name, age })
        .then(response => {
          setUsers(users.map(user => user.id === userId ? response.data : user));
          setName('');
          setAge(0);
          setEditing(false);
          setUserId(null);
        })
        .catch(error => {
          console.error(error);
        });
    };
  
    const handleDeleteUser = (id) => {
      axios.delete(`/api/users/${id}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== id));
        })
        .catch(error => {
          console.error(error);
        });
    };
  return (
  <div>
      <h1>Panel</h1>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='text-center mt-10'/>
        </label><br/>
        <label>
          id:
          <input type="number" value={age} onChange={(e) => setAge(e.target.valueAsNumber)} className=' text-center mt-10' />
        </label><br/>
        {editing ? (
          <button onClick={handleEditUser}className='mt-10'>Save Changes</button>
        ) : (
          <button onClick={handleAddUser} className="mt-5">Add User</button>
        )}
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age})
            <button onClick={() => {
              setEditing(true);
              setUserId(user.id);
              setName(user.name);
              setAge(user.age);
            }}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default page