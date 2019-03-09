import React from 'react'
import FileIcon,{defaultStyles} from 'react-file-icon';
import PropTypes from 'prop-types';

function Icons(props) {
  let type=""
  let fileTypeStr = props.type.split("/")
  if(fileTypeStr.length===2){
    type = fileTypeStr[1]
  }
  if(typeof defaultStyles[type] === 'undefined'){
    if(props.fileName.split('.').length>1){
      type = props.fileName.split('.').pop();
    }else{
      type = "file"
    }
  }
  return (
      <FileIcon extension={type} {...defaultStyles[type]} />
  )
}
FileIcon.propTypes = {
    type: PropTypes.string,
    fileName: PropTypes.string,
}

export default Icons;