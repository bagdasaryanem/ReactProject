import React from 'react'
import ListViewItem from './ListViewItem/ListViewItem'

import './styles.css'

const ListView = ({users}) => {
    return (
        <div className="listViewWrapper">
            {users?.map(user => <ListViewItem key={user.id} {...user}/>)}
        </div>
    )
}

export default ListView;
