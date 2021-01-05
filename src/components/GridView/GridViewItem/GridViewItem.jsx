import axios from 'axios';
import React, { useEffect, useState } from 'react'

import "./styles.css";

const GridViewItem = ({ login, avatar_url, type, repos_url }) => {
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
    <div className="GridViewItem">
      <div className="userNameAndImg">
        <img src={avatar_url} alt={`${login} Logo`} className="userLogo" />
        <a className="userName" href={`/${login}`}>{login}</a>
      </div>
      <div className="userDescription">
        <p className="userType"><span>Type:</span> {type}</p>
        <p className="userRepos">Repositories: {!userRepos.length ? <span>No Repos</span> : userRepos.map(({ name, svn_url }, i) => (<a className="userRepoName" href={svn_url} key={name}>{i + 1}) {name}</a>))}</p>
      </div>
    </div>
  )
}

export default GridViewItem
