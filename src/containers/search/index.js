import React, { Component } from 'react'
import {connect} from 'react-redux';
import { NotificationManager } from 'react-notifications';
import {SearchBar} from '../../components'
import FilesList from '../storage/fileslist'
import {
    updateSearchItem,
    searchFiles,
    clearSearchResult
} from './actions'
import HTTP404 from '../../components/404';
class Search extends Component {
  state = {
      touched: false
  }
  onSearch=()=>{
      const searchName = this.props.search.search;
      if(searchName.length===0){
        NotificationManager.error("输入信息不能为空")
        return
      }
      this.props.searchFiles(searchName,()=>this.setState({touched:true}))
  }
  onSearchUpdate=(e)=>{
      const item = e.target.value.trim("")
      this.props.updateSearchItem(item)
  }
  componentWillUnmount=() =>{
      this.props.clearSearchResult()
  }
  render() {
    let renderFilesView = this.state.touched === true ? <HTTP404/> : null
    if (this.props.search.files && this.props.search.files.length > 0) {
        let files = this.props.search.files.map(f=>{
            let file = f.file
            file["pID"] =f.parent_id
            file["pFileName"] = f.parent_filename
            return file
        })
        renderFilesView = <FilesList files={files} afterSubmit={this.onSearch} />
    }
    return (
      <div>
        <SearchBar 
            onSearch={this.onSearch}
            onChange={this.onSearchUpdate}
        />
        {renderFilesView}
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
        searchFiles,
        clearSearchResult
    })(Search);
