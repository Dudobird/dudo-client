import React from 'react'
import style from './style.module.css'
import classnames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt,faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const File = (props) =>{
    return(
     <div className={style.container}>
        <div className={style.image}>
            <FontAwesomeIcon size="2x" icon={faFileAlt}/>
        </div>
        <div className={style.info}  onClick={()=>props.onClickFile(props.data.id, props.data.file_name)}>
                <span className={style.title}>
                    {props.data.file_name}
                </span>
                
                <div className={style.smallInfo}>
                    <span>创建于:{moment(props.data.CreatedAt).fromNow()}</span>
                    <span>文件大小:{props.data.file_size_readable}</span>
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