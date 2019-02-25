import React from 'react'
import style from './style.module.css'

const File = (props) =>{
    return(
        <div className={style.document}>{props.name}</div>
    )
}

export default File