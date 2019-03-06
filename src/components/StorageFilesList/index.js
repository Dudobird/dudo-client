import React from 'react'
import PropTypes from 'prop-types';
import Folder from './Folder'
import File from './File'
import styles from './style.module.css';

const StorageFilesList =(props) =>{
  const clickFileFunc = props.deleteStatus === false ? props.downloadFile : props.deleteFile
  const folders = props.files.filter(f=>{
    return f.is_dir === true
  })
  const files = props.files.filter(f=>{
    return f.is_dir !== true
  })

  const renderFolders = folders.map(f=>(
          <div  key={f.id}  
                className={styles.storageItem}
          >
            <Folder data={f}/>
          </div>
        )
  )
  const renderFiles = files.map(f=>(
            <div key={f.id} 
              className={
              // classNames(
                styles.storageItem
                // {[styles.deleteItemAnimation]:props.deleteStatus})
            }>  
                <File data={f} onClickFile={clickFileFunc}/>
            </div>
      )
  )
  return (
    <div className={styles.storageBox}>
      {renderFolders}
      {renderFiles}
      
    </div>
  )
}

StorageFilesList.propTypes = {
    files: PropTypes.array.isRequired,
    downloadFile: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired,
};

export default StorageFilesList
