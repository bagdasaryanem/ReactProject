import React from 'react'
import GridViewItem from './GridViewItem/GridViewItem'

import './styles.css'

const GridView = ({users}) => {
    return (
        <div className="gridViewWrapper">
            {users?.map(user => <GridViewItem key={user.id} {...user}/>)}
        </div>
    )
}

export default GridView
