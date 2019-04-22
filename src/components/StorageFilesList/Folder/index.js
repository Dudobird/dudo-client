import React from 'react'
import style from './style.module.css'
import PropTypes from 'prop-types';
import moment from 'moment';
import {MdFolder,MdCloudDownload,MdModeEdit,MdDelete} from 'react-icons/md'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

const Folder = (props) =>{
    const goToFolder = `/storage/${props.data.id}`; 
    return(  
        <div className={style.container}>
            <Link to={goToFolder}>
            <div className={style.image}>
                <MdFolder size={'4em'}/>
            </div>
            <div className={style.info}>
                    <span className={style.title}>
                        {props.data.file_name}
                    </span>
                    <div className={style.smallInfo}>
                        创建于:{moment(props.data.CreatedAt).fromNow()}
                    </div>
            </div>
            </Link>
            <div className={style.filler}></div>
            <div className={classnames({"hidden":props.hiddenBtn,[style["btn-group"]]:true})}>
                <button className={style.btn} onClick={()=>props.onRenameFile(props.data.id,props.data.file_name)}><MdModeEdit/></button>
                <button className={style.btn} onClick={()=>props.onClickFile(props.data.id, props.data.file_name)}><MdCloudDownload/></button>
                <button className={style.btn} onClick={()=>props.onDeleteFile(props.data.id,props.data.file_name)}><MdDelete/></button>
            </div>
        </div>)
}
Folder.propTypes = {
    data: PropTypes.object.isRequired,
};
export default Folder