import React from 'react'
import style from './style.module.css'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
const Folder = (props) =>{
    const goToFolder = `/storage/${props.data.id}`;
    const fileNameLength = props.data.file_name.length;
    let displayFileName = props.data.file_name;
    console.log(props.data)
    if(fileNameLength>50){
        displayFileName=props.data.file_name.slice(0,25)+"..."+props.data.file_name.slice(fileNameLength-20)
    }
    return(
            <Link to={goToFolder}>
                <FontAwesomeIcon icon={faFolder}/>
                <span className={style.title}>
                    {displayFileName}
                </span>
            </Link>
    )
}
Folder.propTypes = {
    data: PropTypes.object.isRequired,
};
export default Folder