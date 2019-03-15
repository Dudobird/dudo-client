import React from 'react'
import {humanFileSize} from '../../utils';
import styles from '../style.module.css'
function Billing(props) {
  const {usage_disk_size,disk_limit} = props.profile;
  let usage = "0"
  // let usageStyle = {"width":"0%"}
  let usageReadable = "0 B"
  let diskLimitReadable ="0 B"
  if(typeof usage_disk_size === 'number' && typeof disk_limit ==='number'){
    usage = ((usage_disk_size/disk_limit) * 100).toFixed(2) + ""
    // usageStyle = {"width":""+usage+"%"}
    usageReadable = humanFileSize(usage_disk_size,false)
    diskLimitReadable = humanFileSize(disk_limit,false)
  }
  
  
  // console.log(usage,usageStyle)
  return (
    <div>
       <div className={styles.title}>配额信息</div>
       <hr/>
       <div className="panel-group">
        <div className="panel panel-default">
          <div className="panel-body"><span className={styles.infobar}>存储配额: </span>{diskLimitReadable}</div>
        </div>
        <div className="panel panel-default">
          <div className="panel-body">
            <span className={styles.infobar}>已使用:</span> {usageReadable}</div>
        </div>
        <div className="panel panel-default">
          <div className="panel-body">
          <span className={styles.infobar}>使用比例:</span> {usage}% </div>
        </div>
        
      </div>


       {/* <div className="progress">
          <div className="progress-bar" role="progressbar" aria-valuenow={usage}
          aria-valuemin="0" aria-valuemax="100" style={usageStyle}>
            <span className="sr-only">当前磁盘使用情况</span>
          </div>
        </div> */}
    </div>
  )
}

export default Billing;
