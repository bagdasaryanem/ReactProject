import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FormControlLabel, Switch, TextField } from '@material-ui/core';

import UsersView from '../UsersView/UsersView';

import './styles.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchUsersInput, setSearchUsersInput] = useState("");

  useEffect(() => {
    if (!users.length) {
      axios.get('https://api.github.com/users')
        .then((response) => {
          setUsers(response.data);
          setSearchedUsers(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [])

  useEffect(() => {
    setSearchedUsers(users.filter(({ login }) => login.toLowerCase().includes(searchUsersInput.toLowerCase())))
  }, [searchUsersInput])

  return (
    <div className="usersWrapper">
      <div className="header">
        <h1>Github Popular Users</h1>
        <div className="controls">
          <FormControlLabel
            control={
              <Switch
                checked={isGridView}
                onChange={() => setIsGridView(!isGridView)}
                color="primary"
              />
            }
            label="Grid View"
          />
          <TextField label="Search" onChange={(e) => setSearchUsersInput(e.target.value)} value={searchUsersInput} />

        </div>
      </div>

      <UsersView users={searchedUsers} isGridView={isGridView} />
    </div>
  )
}

export default Users
