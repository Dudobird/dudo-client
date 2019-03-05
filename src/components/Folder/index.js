import React from 'react'
import style from './style.module.css'
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom'
const Folder = (props) =>{
    const goToFolder = `/storage/${props.data.id}`;
    const fileNameLength = props.data.file_name.length;
    let displayFileName = props.data.file_name;
    if(fileNameLength>20){
        displayFileName=props.data.file_name.slice(0,10)+"..."+props.data.file_name.slice(fileNameLength-10)
    }
    return(
        [<Link to={goToFolder}><div className={style.folder}></div></Link>,
         <span className={style.title}>{displayFileName}</span>
        ]
    )
}
Folder.propTypes = {
    data: PropTypes.object.isRequired,
};
export default Folder