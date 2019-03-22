import React, { Component } from 'react'
import {connect} from 'react-redux';
import { NotificationManager } from 'react-notifications';
import {SearchBar,StorageFilesList} from '../../components'
import {
    updateSearchItem,
    searchFiles
} from './actions'
class Search extends Component {
  onSearch=()=>{
      const searchName = this.props.search.search;
      if(searchName.length===0){
        NotificationManager.error("输入信息不能为空")
        return
      }
      this.props.searchFiles(searchName)
  }
  onSearchUpdate=(e)=>{
      const item = e.target.value.trim("")
      this.props.updateSearchItem(item)
  }
  renderFiles = () =>{
    let renderFilesContainer = null
    let renderFiles = [];
    if (this.props.search.files && this.props.search.files.length > 0) {
        renderFiles = this.props.search.files
    }
    renderFilesContainer =  <StorageFilesList
                                files={renderFiles}
                                renameFile={()=>{}}
                                deleteFile={()=>{}}
                                shareFile ={()=>{}}
                                downloadFile={this.downloadFile} />
    return renderFilesContainer
  }
  render() {
    return (
      <div>
        <SearchBar 
            onSearch={this.onSearch}
            onChange={this.onSearchUpdate}
        />
        <hr/>
        {this.renderFiles()}
      </div>
    )
  }
}
const mapStateToProps = state => ({
    search: state.search,
})

export default connect(
    mapStateToProps,{
        updateSearchItem,
        searchFiles
    })(Search);
