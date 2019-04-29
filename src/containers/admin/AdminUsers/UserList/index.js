import React from 'react'
import styles from './styles.module.css';

export default function UserList(props) {
  let renderInfo = <div className={styles.info}>用户信息为空</div>
  
  if(props.users && props.users.length > 0){
    let renderTableList = props.users.map((u)=>{
        return (<tr key={u.id}>
            <td>{u.email}</td>
            <td>{u.isSoftDeleted === true ?"已禁用":""}</td>
            <td>{u.role}</td>
            <td>{u.profiles.readable_disk_limit}</td>
            <td>{u.profiles.readable_disk_usage}</td>
            <td>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        点击管理
                    <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                    <li onClick={()=>props.onResetPassword(u.id)}>重置密码</li>
                    <li onClick={()=>props.onSetUserStorageLimit(u.id,u.profiles.readable_disk_limit)}>设置配额</li>
                    {u.isSoftDeleted !== true?
                        <li onClick={()=>props.onDeleteUser(u.id,u.email,true)}>禁用用户</li>:
                        <li onClick={()=>props.onDeleteUser(u.id,u.email,false)}>解除禁用状态</li>
                    }
                    </ul>
                </div>
            </td>
        </tr>)
    })
    renderInfo = <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>用户邮箱</th>
                            <th>禁用状态</th>
                            <th>级别</th>
                            <th>存储配额</th>
                            <th>存储使用量</th>
                            <th>管理操作</th>
                        </tr>
                    </thead>
                    <tbody>
                    {renderTableList}
                    </tbody>
            </table>
  }
  return (
    <div className={styles.userlistBox}>
        {renderInfo}
    </div>
  )
}
