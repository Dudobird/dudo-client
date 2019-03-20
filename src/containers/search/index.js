import React, { Component } from 'react'
import {connect} from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Searchbar from '../../components/Searchbar'
import {updateSearchItem} from './actions'
class Search extends Component {
  onSearch=()=>{
      console.log("click search")
      const searchName = this.props.search.search;
      if(searchName.length===0){
        NotificationManager.error("输入信息不能为空")
        return
      }
      NotificationManager.info(searchName)
  }
  onSearchUpdate=(e)=>{
      const item = e.target.value.trim("")
      this.props.updateSearchItem(item)
  }
  render() {
    return (
      <div>
        <Searchbar 
            onSearch={this.onSearch}
            onChange={this.onSearchUpdate}
        />
        <hr/>
      </div>
    )
  }
}
const mapStateToProps = state => ({
    search: state.search,
})

export default connect(
    mapStateToProps,{
        updateSearchItem
    })(Search);
