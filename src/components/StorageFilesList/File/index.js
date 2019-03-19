import React from 'react'
import style from './style.module.css'
import PropTypes from 'prop-types';
import classnames from 'classnames'
import moment from 'moment';
import FileIcon from '../../Icons'

import {MdCloudDownload,MdShare,MdModeEdit,MdDelete} from 'react-icons/md'
const File = (props) =>{
    return(
     <div className={style.container}>
        <div className={style.image}>
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
        <div className={classnames({"hidden":props.hiddenBtn,[style["btn-group"]]:true})}>
            <button className="btn" onClick={()=>props.onRenameFile(props.data.id,props.data.file_name)}><MdModeEdit/></button>
            <button className="btn" onClick={()=>props.onClickFile(props.data.id, props.data.file_name)}><MdCloudDownload/></button>
            <button className="btn" onClick={()=>props.onShareFile(props.data.id)}><MdShare/></button>
            <button className="btn" onClick={()=>props.onDeleteFile(props.data.id,props.data.file_name)}><MdDelete/></button>
        </div>
    </div>
    )
}
File.propTypes = {
    data: PropTypes.object.isRequired,
    onClickFile: PropTypes.func.isRequired,
    onDeleteFile: PropTypes.func.isRequired,
    onShareFile: PropTypes.func.isRequired,
};
export default File