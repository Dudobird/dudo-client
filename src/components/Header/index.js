import React from 'react';
import { Link } from "react-router-dom";
import style from './Header.module.css'
import { isAuthSuccess } from '../../lib/check-auth';
import {MdStorage,MdAccountCircle} from 'react-icons/md'
import {FaSignInAlt, FaSignOutAlt, FaWindowRestore,FaUserPlus} from 'react-icons/fa'

const Header =({store})=>{
  const isAuth = isAuthSuccess(store)
  const menu=(isAuth===false)?[<li key={1} className="right">
  <Link to="/login"><FaSignInAlt /> 用户登入</Link>
</li>,
<li key={2} className="right">
  <Link to="/signup"><FaUserPlus /> 用户注册</Link>
</li>]:([<li key={3} className="right">
  <Link to="/logout"><FaSignOutAlt/> 用户退出</Link>
</li>,
<li key={4} className="right">
  <Link to="/profile"><MdAccountCircle /> 个人信息</Link>
</li>
,<li key={5} className="right">
  <Link to="/storage"><FaWindowRestore /> 我的文件</Link>
</li>])

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