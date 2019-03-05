import React, { Component } from 'react'
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import style from './style.module.css';
import {NotificationManager} from 'react-notifications';

class Dropbox extends Component {
  state = {
    disabled: false,
  }
  onDrop = (acceptedFiles, rejectedFiles) => {
    // Do something with files
    if(rejectedFiles.length>0){
      NotificationManager.warn("部分文件由于格式问题,暂时无法上传")
    }
    this.props.updatefiles(acceptedFiles)
  }
  onCancel = ()=> {
    this.props.updatefiles([])
  }
  // 当上传的时候关闭文件的选择功能 通过redux store更新
  toggleDisabled() {
    this.setState({
      disabled: !this.state.disabled
    })
  }
  render() {
    let renderfilesName = `直接拖拽文件，或点击选择文件用于上传`
    const files = this.props.files;
    if (files.length>0){
      renderfilesName = files.map(f=>`${f.path}\n`)
    }
    return (
      <Dropzone 
        onDrop={this.onDrop}
        onFileDialogCancel={this.onCancel}
        disabled={this.state.disabled}
      >
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