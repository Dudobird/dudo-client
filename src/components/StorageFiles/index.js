import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons'

import Folder from './Folder'
import File from './File'
import styles from './style.module.css';

const StorageFiles =(props) =>{
  const clickFileFunc = props.controlMode === false ? props.downloadFile : props.deleteFile
  const render = props.files.map(f=>{
      if(f.is_dir===true){
        return (
          <div  key={f.id}  
                className={styles.storageItem}
          >
            <Folder data={f}/>
          </div>
        )
      }
      return (
            <div key={f.id} 
              className={
              classNames(
                styles.storageItem,
                {[styles.deleteItemAnimation]:props.controlMode})
            }>  
                <div className={classNames(
                styles.deleteIcon,
                {[styles.hide]:!props.controlMode})}><FontAwesomeIcon size="2x" icon={faTimesCircle}/></div>
                <File data={f} onClickFile={clickFileFunc}/>
            </div>
      )
  })
  return (
    <div className={styles.storageBox}>
      {render}
    </div>
  )
}

StorageFiles.propTypes = {
    files: PropTypes.array.isRequired,
    downloadFile: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired,
};

export default StorageFiles
