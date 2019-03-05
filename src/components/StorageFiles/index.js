import React from 'react'
import PropTypes from 'prop-types';
import Folder from '../Folder'
import File from '../File'

const StorageFiles =(props) =>{
  const render = props.files.map(f=>{
      if(f.is_dir===true){
        return <Folder key={f.id} data={f}/>
      }
      return <File key={f.id} data={f} downloadFile={props.downloadFile}/>
  })
  return (
    <div>
      {render}
    </div>
  )
}

StorageFiles.propTypes = {
    files: PropTypes.array.isRequired,
};

export default StorageFiles
