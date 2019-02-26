import React from 'react'
import style from './style.module.css'
import PropTypes from 'prop-types';
const File = (props) =>{
    return(
        <div className={style.document}>{props.data.file_name}</div>
    )
}
File.propTypes = {
    data: PropTypes.object.isRequired,
};
export default File