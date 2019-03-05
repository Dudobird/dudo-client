import React from 'react'
import style from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faUpload, faTrash} from '@fortawesome/free-solid-svg-icons'

export default function Popup(props) {
  return (
        <div className={style.container+" dropup"}>
        <button className={style.btn+" dropdown-toggle"} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            +
        </button>
        <div className={style.menubox+" dropdown-menu"} aria-labelledby="dropdownMenuButton">
            <div className={style.menuitem+" dropdown-item"} onClick={props.onCreateFolder}><FontAwesomeIcon icon={faFolderPlus}/> 创建文件夹</div>
            <div className={style.menuitem+" dropdown-item"} onClick={props.onUploadFiles}><FontAwesomeIcon icon={faUpload}/> 上传文件</div>
            <div className={style.menuitem+" dropdown-item"} onClick={props.onChangeDeleteStatus}><FontAwesomeIcon icon={faTrash}/> 删除文件</div>
        </div>
        </div>
  )
}
