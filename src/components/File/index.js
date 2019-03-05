import React from 'react'
import style from './style.module.css'
import PropTypes from 'prop-types';
const File = (props) =>{
    return(
        <div 
            className={style.document} 
            onClick={()=>props.downloadFile(props.data.id, props.data.file_name)}>
            {props.data.file_name}
        </div>
    )
}
File.propTypes = {
    data: PropTypes.object.isRequired,
    downloadFile: PropTypes.func.isRequired,
};
export default File