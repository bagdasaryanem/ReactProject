import axios from 'axios';
import React, { useEffect, useState } from 'react'

import "./styles.css";

const ListViewItem = ({ login, avatar_url, type, repos_url }) => {
  const [userRepos, setUserRepos] = useState([]);

  useEffect(() => {
    if (!userRepos.length) {
      axios.get(repos_url)
        .then((response) => {
          setUserRepos(response.data.slice(0, 3));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [])

  return (
    <div className="ListViewItem">
      <div className="userNameAndImg">
        <img src={avatar_url} alt={`${login} Logo`} className="userLogo" />
        <a className="userName" href={`/${login}`}>{login}</a>
      </div>
      <div className="userDescription">
        <p className="userType"><span>Type:</span> {type}</p>
      </div>

      <p>Popular Repositories: </p>
      <div className="userRepos">
        {!userRepos.length ? <span>No Repositories</span> : userRepos.map(({ name, description, html_url }, i) => (<div key={name} className="userRepo">
          <a className="repoName" href={html_url}>{name}</a>
          <p className="RepoDesription"><span>Description:</span> {description || "No Description"}</p>
        </div>))}
      </div>
    </div>
  )
}

export default ListViewItem
