import React from 'react'
import style from './style.module.css'
import PropTypes from 'prop-types';

const Folder = (props) =>{
    return(
        <div  className={style.folder}>{props.data.file_name}</div>
    )
}
Folder.propTypes = {
    data: PropTypes.object.isRequired,
};
export default Folder