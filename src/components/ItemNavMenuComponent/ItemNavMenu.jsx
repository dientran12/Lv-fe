import React from 'react'

const ItemNavMenu = ({ nameItem, icon, ...rests }) => {
    return (
        <div className="itemNavMenu" style={rests}>
            {icon}
            <div className="d-inline ps-1">{nameItem}</div>
        </div>
    )
}

export default ItemNavMenu
