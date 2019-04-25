import React from 'react'
import styles from './styles.module.css';

export default function UserList(props) {
  let renderInfo = <div className={styles.info}>用户信息为空</div>
  if(props.users && props.users.length > 0){
    let renderTableList = props.users.map((u,i)=>{
        return (<tr key={i}>
            <td>{u.email}</td>
            <td>{u.level}</td>
            <td>{u.usage_disk_size}</td>
            <td>{u.disk_limit}</td>
            <td>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        点击管理
                    <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                    <li><a>重置密码</a></li>
                    <li><a>设置配额</a></li>
                    <li><a>删除用户</a></li>
                    </ul>
                </div>
            </td>
        </tr>)
    })
    renderInfo = <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>用户邮箱</th>
                            <th>级别</th>
                            <th>存储使用量</th>
                            <th>存储配额</th>
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
