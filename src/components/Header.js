import React from 'react';
import { Link } from "react-router-dom";
import style from './Header.module.css'
import { isAuthSuccess } from '../lib/check-auth';
const Header =({store})=>{
  const isAuth = isAuthSuccess(store)
  console.log(isAuth)
  const menu=(isAuth===false)?[<li className="right">
  <Link to="/login">用户登入</Link>
</li>,
<li className="right">
  <Link to="/signup">用户注册</Link>
</li>]:(<li className="right">
  <Link to="/logut">用户退出</Link>
</li>)


  return (<div className={style.Header}>
        <ul>
            <li>
              <Link to="/">首页</Link>
            </li>
            {menu}
      </ul>
      </div>
    )
}

export default Header