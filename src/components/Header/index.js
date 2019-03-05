import React from 'react';
import { Link } from "react-router-dom";
import style from './Header.module.css'
import { isAuthSuccess } from '../../lib/check-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom,faSignInAlt, faSignOutAlt, faWindowRestore,faUserPlus} from '@fortawesome/free-solid-svg-icons'

const Header =({store})=>{
  const isAuth = isAuthSuccess(store)
  const menu=(isAuth===false)?[<li key={1} className="right">
  <Link to="/login"><FontAwesomeIcon icon={faSignInAlt}/> 用户登入</Link>
</li>,
<li key={2} className="right">
  <Link to="/signup"><FontAwesomeIcon icon={faUserPlus}/> 用户注册</Link>
</li>]:([<li key={3} className="right">
  <Link to="/logout"><FontAwesomeIcon icon={faSignOutAlt}/> 用户退出</Link>
</li>,<li key={4} className="right">
  <Link to="/storage"><FontAwesomeIcon icon={faWindowRestore}/> 我的文件</Link>
</li>])

  return (<div className={style.Header}>
        <ul>
            <li key={0} className={style.logo}>
              <Link to="/">内部存储系统</Link>
            </li>
            {menu}
      </ul>
      </div>
    )
}

export default Header