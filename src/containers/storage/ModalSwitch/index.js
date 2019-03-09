import React ,{Component}from 'react'
import {
    Modal,
    Dropbox} from '../../../components';

import style from './styles.module.css';

class ModalSwitch extends Component {
  state = {
    folderName: "",
    folderNameChanged: false,
    renameFileName: "",
    renameFileNameChanged:false,
    error:""
  }
  handleInputChange=(e) =>{
    this.setState({
        [e.target.name]: e.target.value,
        [`${e.target.name}Changed`]:true,
        error: "",
    });
  }
  handleRenameSubmit = ()=>{
    if(this.state.renameFileNameChanged === false){
        this.setState({error:"请修改文件名后再提交"})
        return 
    }
    if(this.state.renameFileName.trim() === ""){
        this.setState({error:"不能重命名为空"})
        return 
    }    
    this.props.onRenameModalSubmit(this.state.renameFileName)
  }
  renderNewFolderModal = () =>{
      return (<Modal
        title="新建文件夹"
        onSubmit = {()=>{this.props.onNewFolderSubmit(this.state.folderName)}} 
        onClose = {this.props.onClose}>
            <div className={style.modalContent}>
                <div className={style.modalForm}>
                    <form className="form-inline">
                        <div className="form-group col-md-12">
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

  renderRenameFileModal = () =>{
    return(
        <Modal
            title="文件(夹)重命名"
            onSubmit={this.handleRenameSubmit}
            onClose={this.props.onClose}
        >
           <div className={style.modalContent}>
                <div className={style.modalForm}>
                    <form className="form-inline">
                        <div className="form-group col-md-12">
                            <label htmlFor="newfolder">重命名为: </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="renameFileName"
                                value = {
                                    (!this.state.renameFileNameChanged && this.props.storage.pendingRenameFileName) 
                                    || this.state.renameFileName 
                                }
                                onChange = {this.handleInputChange}/>
                            </div>
                                           
                    </form>
                    <div className={style.errorMessage}>{this.state.error}</div>
                </div>
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
            case "renameFileModal":
                return this.renderRenameFileModal()
            default :
                return null;
            }
    }
 
}


export default ModalSwitch;
