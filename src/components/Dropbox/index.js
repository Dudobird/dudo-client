import React, { Component } from 'react'
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import style from './style.module.css';
import {NotificationManager} from 'react-notifications';

class Dropbox extends Component {
  state = {
    files: []
  }
  onDrop = (acceptedFiles, rejectedFiles) => {
    // Do something with files
    this.setState({files:acceptedFiles})
    NotificationManager.info("已选择"+acceptedFiles.length+"个文件待上传")
    if(rejectedFiles.length>0){
      NotificationManager.warn("部分文件因格式无法正常上传")
    }
  }
  render() {
    let renderfilesName = `直接拖拽文件，或点击选择文件用于上传`
    const files = this.state.files;
    if (files.length>0){
      renderfilesName = files.map(f=>`${f.path}\n`)
    }
    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps, isDragActive}) => {
          return (
            <div
              {...getRootProps()}
              className={classNames('dropzone',style.dropbox,{'dropzone--isActive': isDragActive})}
            >
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>拖拽文件上传</p> :
                  <p>{renderfilesName}</p>
              }
            </div>

          )
        }}
      </Dropzone>
    );
  }
}


export default Dropbox;