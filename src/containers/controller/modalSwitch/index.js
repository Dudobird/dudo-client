import React ,{Component}from 'react'
import { NotificationManager } from 'react-notifications';
import {
    Modal,
    Dropbox
} from '../../../components';

import style from './styles.module.css';
const DefaultPass = 'Password123'
class ModalSwitch extends Component {
  state = {
    folderName: "",
    folderNameChanged: false,
    renameFileName: "",
    renameFileNameChanged:false,
    settingUserStorageLimit: "",
    settingUserStorageLimitChanged:false,
    shareExpire: 7,
    shareDescription: "",
    error:"",
  }
  handleInputChange=(e) =>{
    this.setState({
        [e.target.name]: e.target.value,
        [`${e.target.name}Changed`]:true,
        error: "",
    });
  }
  handleShareFileSubmit = () =>{
    const date = parseInt(this.state.shareExpire)
    if(typeof date !== 'number' || date <=0){
        this.setState({error:"请输入正确的共享时间长度，默认为7天"})
        return
    }
    this.props.onShareFileSubmit(date,this.state.shareDescription)
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
                <div className={style.modalContentSpan}>
                    {this.props.storage.pendingDeleteFileName}
                </div>
            </div>
        </Modal>   
    )
  }
  renderDeleteUserModal=(id,email)=>{
    return(
      <Modal
          title={this.props.controller.modalData.toggleSoftDelete?"确认删除用户":"恢复用户状态"}
          onSubmit={this.props.onDeleteUserSubmit}
          onClose={this.props.onClose}
      >
         <div className={style.modalContent}>
         {this.props.controller.modalData.toggleSoftDelete?
            "是否确定禁用该用户:":"恢复的用户账号如下:"}
              <div className={style.modalContentSpan}>
              Email: {this.props.controller.modalData.email} 
              <br/>
              ID:{this.props.controller.modalData.id}
              </div>
          </div>
      </Modal>   
  )
}
handleUserResetPassword=()=>{
    let id = this.props.controller.modalData.id
    if(id){
        this.props.onResetUserPassword(id,DefaultPass)
        return
    }
    NotificationManager.error("无法获取用户ID")
}
renderResetPassword=(id)=>{
    return(
      <Modal
          title="重置用户密码"
          onSubmit={this.handleUserResetPassword}
          onClose={this.props.onClose}
      >
         <div className={style.modalContent}>
            是否确定重置用户密码信息为以下内容:
              <div className={style.modalContentSpan}>
              ID:{this.props.controller.modalData.id}
              <br/>
              Password: {DefaultPass}
              </div>
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
            reset = {()=>{this.setState({renameFileNameChanged:false,renameFileName:""})}}
        >
           <div className={style.modalContent}>
                <div className={style.modalForm}>
                    <form className="form-inline">
                        <div className="form-group col-md-12">
                            <label htmlFor="renameFile">重命名为: </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="renameFileName"
                                value = {this.state.controller.modalData.user
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
  handlerSettingUserLimit=()=>{
    if(this.state.settingUserStorageLimitChanged === false){
        NotificationManager.error("请修改用户存储空间后提交")
        return 
    }
    this.props.onSettingUserLimit(this.props.controller.modalData.id, this.state.settingUserStorageLimit)
  }
  renderSettingUserLimit = () =>{
    return(
        <Modal
            title="调整用户存储限度"
            onSubmit={this.handlerSettingUserLimit}
            onClose={this.props.onClose}
        >
           <div className={style.modalContent}>
                <div className={style.modalForm}>
                    <form className="form-inline">
                        <div className="form-group col-md-12">
                            <label htmlFor="renameFile">调整容量大小: </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="settingUserStorageLimit"
                                value = {
                                    (!this.state.settingUserStorageLimitChanged && this.props.controller.modalData.currentLimit) 
                                    || this.state.settingUserStorageLimit 
                                }
                                onChange = {this.handleInputChange}/>
                        </div>
                                          
                    </form>
                    <div className={style.infoMessage}>输入的格式如下：50MB,50GB,50GB 无输入单位的按照MB计算</div>
                    <div className={style.errorMessage}>{this.state.error}</div>
                </div>
            </div>
        </Modal>   
    )    
  }
  renderShareFileModal = () =>{
    return(
        <Modal
            title="共享文件"
            onSubmit={this.handleShareFileSubmit}
            onClose={this.props.onClose}
            reset = {()=>{this.setState({shareExpire:7,shareDescription:""})}}
        >
           <div className={style.modalContentLeft}>
                <div className={style.modalForm}>
                    <form>
                        <div className="form-group">
                            <label  className="col-sm-12"  htmlFor="expiredata">设置有效期(天)</label>
                            <div  className="col-sm-12">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="shareExpire"
                                    value = {this.state.shareExpire} 
                                    onChange = {this.handleInputChange}/>
                            </div>
                            <label  className="col-sm-12"  htmlFor="expiredata">备注信息</label>
                            <div  className="col-sm-12">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="shareDescription"
                                    value = {this.state.shareDescription} 
                                    onChange = {this.handleInputChange}/>
                            </div>
                            </div>   
                            <div className="form-group hidden" id="shareLinkInfoBox">
                                <label  className="col-sm-12"  htmlFor="linkinfo">链接信息</label>
                                <div className="col-sm-12">
                                <textarea 
                                    readOnly
                                    rows="3"
                                    id="shareLinkInfo"
                                    type="textarea" 
                                    className="form-control" 
                                    name="shareExpire"></textarea></div>
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
            case "shareFileModal":
                return this.renderShareFileModal()
            case "deleteUserModal":
                return this.renderDeleteUserModal()
            case "showSettingUserLimit":
                return this.renderSettingUserLimit()
            case "resetUserPasswordModal":
                return this.renderResetPassword()
            default :
                return null;
            }
    }
 
}


export default ModalSwitch;
