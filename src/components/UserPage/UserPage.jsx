import axios from 'axios';
import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

import "./styles.css";

const UserPage = ({ match, history }) => {
  const [user, setUser] = useState();
  const [notFound, setNotFound] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    if (!user) {
      axios.get(`https://api.github.com/users/${match.params.username}`)
        .then(({data}) => {
          setUser(data);
        })
        .catch((error) => {
          setNotFound(true);
        });

      axios.get(`https://api.github.com/users/${match.params.username}/orgs`)
        .then(({data}) => {
          setOrganizations(data);
        })
        .catch((error) => { });

      axios.get(`https://api.github.com/users/${match.params.username}/repos`)
        .then(({data}) => {
          setRepositories(data.slice(0, 6));
        })
        .catch((error) => { });
    }
  }, [])

  return (
    <div className="userPage">
      {notFound ? (<div className="notFound">
        <img src="https://i.pinimg.com/236x/dc/ef/3a/dcef3abedf0e0761203aaeb85886a6f3--jedi-knight-open-source.jpg" alt="GitHub Logo" />
        <h1>User Was Not Found</h1>
      </div>) : (
          <div className="user">
            <div className="userInfo">
              <img src={user?.avatar_url} alt={`${user?.login} Avatar`} className="userAvatar" />
              <a href={`https://github.com/${user?.login}`} target="_blank" className="userName">{user?.name}</a>
              <h3 className="userLogin">{user?.login}</h3>
              <p className="stats" ><span>{user?.followers}</span> followers - <span>{user?.following}</span> following</p>
              <p className="bio">{user?.bio ? user.bio : ''}</p>
              {!organizations.length ? null :
                (<> <p className="organizationsHeader">Organizations</p>

                  <div className="organizations">
                    {organizations.map(({ login, avatar_url }) => (<a key={login} target="_blank" className="organization" href={`https://github.com/${login}`} style={{ backgroundImage: `url(${avatar_url})` }}> </a>))}
                  </div>
                </>
                )
              }
            </div>
            <div className="repositories">
              <h2>Repositories: </h2>
              {!repositories.length ? "No Repositories" : (
                <div className="repositoriesGrid">
                  {repositories.map(({ name, description, language, stargazers_count, svn_url, id }) => (<div key={id} className="repo">
                    <div>
                      <a className="repoName" target="_blank" href={svn_url}>{name}</a>
                      <p className="description">{description}</p>
                    </div>

                    <div className="repoStats">
                      <p className="repoLanguage">{language}</p>

                      <p className="repoStars">
                        <svg aria-label="star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
                          <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                          </path>
                        </svg>
                        {stargazers_count}</p>
                    </div>

                  </div>))}
                </div>)
              }
            </div>
          </div>
        )}
      <Button variant="contained" color="primary" onClick={() => history.push('/')}>Back To The Main Page</Button>
    </div>
  )
}

export default UserPage
