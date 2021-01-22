import React from 'react'
import { Button } from '@material-ui/core';

function NotFoundPage() {
    return (
        <div className="notFound">
            <img src="https://i.pinimg.com/236x/dc/ef/3a/dcef3abedf0e0761203aaeb85886a6f3--jedi-knight-open-source.jpg" alt="GitHub Logo" />
            <h1>Page Not Found</h1>
            <Button variant="contained" color="primary" onClick={() => window.location.href = "/"}>Back To The Main Page</Button>
        </div>
    )
}

export default NotFoundPage
