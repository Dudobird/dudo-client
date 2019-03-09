import React from 'react'
import style from './style.module.css'
import { FaFolderPlus,FaUpload,FaThList } from 'react-icons/fa'
export default function Popup(props) {
  return (
        <div className={style.container+" dropup"}>
        <button className={style.btn+" dropdown-toggle"} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            +
        </button>
        <div className={style.menubox+" dropdown-menu"} aria-labelledby="dropdownMenuButton">
            <div 
                className={style.menuitem+" dropdown-item"} 
                onClick={props.onCreateFolder}>
                <FaFolderPlus/> 创建文件夹
            </div>
            <div 
                className={style.menuitem+" dropdown-item"} 
                onClick={props.onUploadFiles}>
                <FaUpload /> 上传文件
            </div>
            <div 
                className={style.menuitem+" dropdown-item"} 
                onClick={props.onToggleFileDisplayStyle}>
                <FaThList /> 切换展示模式
            </div>
        </div>
        </div>
  )
}
