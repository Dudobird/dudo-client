import React,{Component} from 'react'
import PropTypes from 'prop-types';
import {MdDeleteForever,MdBorderColor,MdShare,MdFileDownload} from 'react-icons/md'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Folder from './Folder'
import File from './File'

import styles from './style.module.css';
const MENU_TYPE_FILE = 'STORAGE_LIST_FILE';
const MENU_TYPE_FOLDER = 'STORAGE_LIST_FOLDER'

class StorageFilesList extends Component{
  handleFileShare =(e,data,target)=>{
    console.log("share file")
  }
  handleFileDownload=(e,data,target)=>{
    const id = target.getAttribute("id")
    const fileName = target.getAttribute("name")
    this.props.downloadFile(id,fileName)    
  }
  handleFileRename = (e,data,target) =>{
    const id = target.getAttribute("id")
    const fileName = target.getAttribute("name")
    this.props.renameFile(id,fileName)
  }
  handleFileDelete = (e,data,target) =>{
    const id = target.getAttribute("id")
    const fileName = target.getAttribute("name")
    this.props.deleteFile(id,fileName)
  }
  renderFolders = ()=>{
    const folders = this.props.files.filter(f=>{
      return f.is_dir === true
    })
    return folders.map(f=>(
            <div  key={f.id}  
                  className={styles.storageItem}>
                  <ContextMenuTrigger 
                      id={MENU_TYPE_FOLDER} 
                      attributes={{id:f["id"],name:f["file_name"]}} 
                      holdToDisplay={1000}
                      collect={(props)=>{
                        return { name: props.name }}
                      }>
                      <Folder data={f}/>
                  </ContextMenuTrigger>
            </div>
          )
    )
  }
  renderFiles = ()=>{
    const files = this.props.files.filter(f=>{
      return f.is_dir !== true
    })   
   return  files.map(f=>(
            <div key={f.id} 
              className={
              // classNames(
                styles.storageItem
                // {[styles.deleteItemAnimation]:props.deleteStatus})
            }><ContextMenuTrigger 
                id={MENU_TYPE_FILE} 
                attributes={{id:f["id"],name:f["file_name"]}} 
                holdToDisplay={1000}
                collect={(props)=>{
                  return { name: props.name }}
                }>
                <File 
                    data={f} 
                    controlMode={this.props.controlMode}
                    onClickFile={this.props.downloadFile} 
                    onDeleteFile={this.props.deleteFile}
                />
              </ContextMenuTrigger>
            </div>
      )
  )
  }
  render(){
    return (
      <div className={styles.storageBox}>
        {this.renderFolders()}
        {this.renderFiles()}
        <ContextMenu id={MENU_TYPE_FILE}>
          <MenuItem onClick={this.handleFileDownload}><MdFileDownload /> 下载文件</MenuItem>
          <MenuItem onClick={this.handleFileShare}><MdShare /> 共享文件</MenuItem>
          <MenuItem onClick={this.handleFileRename}><MdBorderColor /> 文件重命名</MenuItem>
          <MenuItem onClick={this.handleFileDelete}><MdDeleteForever /> 删除文件</MenuItem>
        </ContextMenu>

        <ContextMenu id={MENU_TYPE_FOLDER}>
          <MenuItem onClick={this.handleFileDownload}><MdFileDownload /> 点击进入</MenuItem>
          <MenuItem onClick={this.handleFileRename}><MdBorderColor /> 文件夹重命名</MenuItem>
          <MenuItem onClick={this.handleFileDelete}><MdDeleteForever /> 删除文件夹</MenuItem>
        </ContextMenu>
      </div>
    )
  }
 
}

StorageFilesList.propTypes = {
    files: PropTypes.array.isRequired,
    downloadFile: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired,
};

export default StorageFilesList
