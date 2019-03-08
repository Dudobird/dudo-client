import React ,{Component}from 'react'
import {
    Modal,
    Dropbox} from '../../../components';

import style from '../styles.module.css';

class ModalSwitch extends Component {
  state = {
    folderName: ""
  }
  handleInputChange=(e) =>{
    this.setState({
        [e.target.name]: e.target.value
    });
  }
  renderNewFolderModal =() =>{
      return (<Modal
        title="新建文件夹"
        onSubmit = {()=>{this.props.onNewFolderSubmit(this.state.folderName)}} 
        onClose = {this.props.onClose}>
                <div className={style.createFolderModel}>
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="newfolder">文件夹名称: </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="folderName" 
                                value = {this.state.folderName}
                                onChange = {this.handleInputChange}/>
                        </div>
                    </form> 
                </div>                   
            </Modal>)
  }
  renderUploadModal=()=>{
      return (<Modal
                    title="上传文件"
                    onSubmit={this.props.onUploadModalSubmit}
                    onClose={this.props.onClose}>
                    <Dropbox 
                        files={this.props.storage.uploadfiles}
                        updatefiles={this.props.updateUploadFiles}/>
              </Modal>)
  }
  renderDeleteFileModal=()=>{
      return(
        <Modal
            title="删除文件"
            onSubmit={this.props.onDeleteModalSubmit}
            onClose={this.props.onClose}
        >
           <div className={style.modalContent}>是否确定删除文件：
                <span className={style.modalContentSpan}>
                {this.props.storage.pendingDeleteFileName}?
                </span>
            </div>
        </Modal>   
    )
  }
    render(){
        switch(this.props.modalName){
            case "newFolderModal":
                return this.renderNewFolderModal()
            case "uploadFilesModal":
                return this.renderUploadModal()
            case "deleteFileModal":
                return this.renderDeleteFileModal()
            default :
                return null;
            }
    }
 
}


export default ModalSwitch;
