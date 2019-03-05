import React from 'react'
import style from './style.module.css'
import PropTypes from 'prop-types';
const File = (props) =>{
    const fileNameLength = props.data.file_name.length;
    let displayFileName = props.data.file_name;
    if(fileNameLength>20){
        displayFileName=props.data.file_name.slice(0,10)+"..."+props.data.file_name.slice(fileNameLength-10)
    }
    return(
            [<div 
                className={style.document} 
                onClick={()=>props.onClickFile(props.data.id, props.data.file_name)}>
            </div>,
            <span className={style.title}>{displayFileName}</span>
            ]
    )
}
File.propTypes = {
    data: PropTypes.object.isRequired,
    onClickFile: PropTypes.func.isRequired,
};
export default File