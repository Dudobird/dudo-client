import React from 'react'
import style from './style.module.css'
import classnames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import FileIcon from '../../Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const File = (props) =>{
    return(
     <div className={style.container} onClick={()=>props.onClickFile(props.data.id, props.data.file_name)}>
        <div className={style.image}>
            {/* <FontAwesomeIcon size="2x" icon={faFileAlt}/> */}
            <FileIcon type={props.data.file_type} fileName = {props.data.file_name}/>
        </div>
        <div className={style.info}>
                <span className={style.title}>
                    {props.data.file_name}
                </span>
                
                <div className={style.smallInfo}>
                    <span>创建于:{moment(props.data.CreatedAt).fromNow()}</span>
                    <span>文件大小:{props.data.file_size_readable}</span>
                    <span>文件类型:{(props.data.file_type || "").toUpperCase()}</span>
                </div>
        </div>
        <div className={style.filler}></div>
        <div className={classnames({[style.hidden]: !props.controlMode})}>
            <div className={style.deleteBtn} onClick={props.onDeleteFile}><FontAwesomeIcon size="2x" icon={faTimesCircle}/></div>
        </div>
    </div>
    )
}
File.propTypes = {
    data: PropTypes.object.isRequired,
    onClickFile: PropTypes.func.isRequired,
    onDeleteFile: PropTypes.func.isRequired,
};
export default File