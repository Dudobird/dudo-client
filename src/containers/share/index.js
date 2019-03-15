import React, { Component } from 'react'
import ReactTable from "react-table";
import moment from 'moment'
import 'react-table/react-table.css'
import styles from './styles.module.css'
import {connect} from 'react-redux';
import File from '../../components/StorageFilesList/File'
import Folder from '../../components/StorageFilesList/File'
import {MdClear} from 'react-icons/md'
import {
    getShareFiles,
    deleteShareFile,
} from './actions'

class Share extends Component {
  componentDidMount(){
      this.props.getShareFiles()
  }
  renderFile=(props)=>{
    const file = props.value;
    if (file.is_dir === false){
        return <File data={file}
                    controlMode={false}
                    onClickFile={()=>{}} 
                    onDeleteFile={()=>{}}
                    onShareFile ={()=>{}}/>
    }
    return <Folder data={file}/>
  }
  renderControlPanel = (props) =>{
        return <button className={styles.btn}
                onClick={()=>this.props.deleteShareFile(props.value)}>
                    <MdClear />
              </button>
  }
  render() {
    const columns = [{
        Header: "共享文件",
        accessor:"StorageFile",
        Cell: this.renderFile,
        width: 500,
    },
    {
        Header: '共享时间',
        accessor: 'created_at',
        Cell: props => <span className={styles.cell}>{moment(props.value).calendar()}</span> // Custom cell components!
    },
    {
        Header: '到期时间',
        accessor: 'expire',
        Cell: props => <span className={styles.cell}>{moment(props.value).calendar()}</span> // Custom cell components!
    },
     {
        Header: '描述信息',
        accessor: 'description',
        Cell: props => <span className={styles.cell}>{props.value}</span> // Custom cell components!
    },
    {
        Header: '共享控制',
        accessor: 'id',
        Cell:  this.renderControlPanel// Custom cell components!
    },    
]
    return <div className={styles.shareBox}>
        <ReactTable className="-striped -highlight"
                data={this.props.shares.files}
                columns={columns}
            />
        </div>
  }
}



const mapStateToProps = state => ({
    shares: state.shares,
})

export default connect(
    mapStateToProps,{
        getShareFiles,
        deleteShareFile
    })(Share);