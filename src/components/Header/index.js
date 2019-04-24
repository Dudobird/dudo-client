import React from 'react';
import { Link } from "react-router-dom";
import style from './Header.module.css'
import { isAuthSuccess, isAdminOnly} from '../../lib/check-auth';
import {MdStorage, MdAccountCircle} from 'react-icons/md'
import {FaSignInAlt, FaSignOutAlt, FaWindowRestore,FaUserPlus,FaShareAltSquare,FaSearch} from 'react-icons/fa'

const Header =({store})=>{
  const isAuth = isAuthSuccess(store)
  const isAdmin = isAdminOnly(store)
  
  const menu=(isAuth===false)?[<li key={1} className="right">
  <Link to="/login"><FaSignInAlt /><span className={style.headeritem}>用户登入</span></Link>
</li>,
<li key={2} className="right">
  <Link to="/signup"><FaUserPlus /><span className={style.headeritem}>用户注册</span></Link>
</li>]:([<li key={3} className="right">
  <Link to="/logout"><FaSignOutAlt/><span className={style.headeritem}>用户退出</span></Link>
</li>,
<li key={4} className="right">
  <Link to="/profile"><MdAccountCircle /><span className={style.headeritem}>个人信息</span></Link>
</li>,
<li key={5} className="right">
  <Link to="/share"><FaShareAltSquare /><span className={style.headeritem}>我的分享</span></Link>
</li>
,<li key={6} className="right">
  <Link to="/storage"><FaWindowRestore /><span className={style.headeritem}>我的文件</span></Link>
</li>,
<li key={7} className="right">
  <Link to="/search"><FaSearch /><span className={style.headeritem}>搜索文件</span></Link>
</li>,
isAdmin === true ? <li key={8} className="right"><Link to="/admin"><FaSearch /><span className={style.headeritem}>系统管理</span></Link></li>:null
])
  return (<div className={style.Header}>
        <ul>
            <li key={0} className={style.logo}>
              <Link to="/storage"><MdStorage size={'2em'}/><span> 内部存储系统</span></Link>
            </li>
            {menu}
      </ul>
      </div>
    )
}

export default Header