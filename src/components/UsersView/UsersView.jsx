import React from 'react';

import GridViewItem from './GridViewItem/GridViewItem';
import ListViewItem from './ListViewItem/ListViewItem';

import './styles.css'

const UsersView = ({ users, isGridView }) => {
    if (!users.length) {
        return <div className="noUsers"><h1>No Users Found</h1></div>
    }

    return (
        <div className={`${isGridView ? "gridViewWrapper" : "listViewWrapper"}`}>
            {users.map(user => isGridView ? <GridViewItem key={user.id} {...user} /> : <ListViewItem key={user.id} {...user} />)}
        </div>
    )
}

export default UsersView
