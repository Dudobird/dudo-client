import React,{Component} from 'react'
import PropTypes from 'prop-types';
import Folder from './Folder'
import File from './File'
import styles from './style.module.css';

class StorageFilesList extends Component{
  renderFolders = ()=>{
    const folders = this.props.files.filter(f=>{
      return f.is_dir === true
    })
    return folders.map(f=>(
            <div  key={f.id}  
                  className={styles.storageItem}>
              <Folder data={f}
                      hiddenBtn = {false}
                      onClickFile={this.props.downloadFile} 
                      onDeleteFile={this.props.deleteFile}
                      onRenameFile = {this.props.renameFile}
                      onShareFile ={this.props.shareFile}/>
            </div>
          )
    )
  }
  renderFiles = ()=>{
 
    const files = this.props.files.filter(f=>{
      return f.is_dir !== true
    })   
    return files.map(f=>(
              <div key={f.id} 
                className={
                  styles.storageItem
              }>
                  <File 
                      hiddenBtn = {false}
                      data={f} 
                      onClickFile={this.props.downloadFile} 
                      onDeleteFile={this.props.deleteFile}
                      onShareFile ={this.props.shareFile}
                      onRenameFile = {this.props.renameFile}
                  />
              </div>
        ))
  }
  render(){
    return (
      <div className={styles.storageBox}>
        {this.renderFolders()}
        {this.renderFiles()}
      </div>
    )
  }
 
}

StorageFilesList.propTypes = {
    files: PropTypes.array.isRequired,
    downloadFile: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired,
    shareFile: PropTypes.func.isRequired,
    renameFile: PropTypes.func.isRequired,
};

export default StorageFilesList
