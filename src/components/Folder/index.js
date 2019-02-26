import React from 'react'
import style from './style.module.css'
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom'
const Folder = (props) =>{
    const goToFolder = `/storage/${props.data.id}`;
    return(
        <Link to={goToFolder}><div className={style.folder}>{props.data.file_name}</div></Link>
    )
}
Folder.propTypes = {
    data: PropTypes.object.isRequired,
};
export default Folder