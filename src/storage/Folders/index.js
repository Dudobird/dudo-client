import React from 'react'
import style from './style.module.css'

const Folder = (props) =>{
    return(
        <div className={style.folder}>{props.name}</div>
    )
}

export default Folder