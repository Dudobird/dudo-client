import React from 'react';
import { Link } from "react-router-dom";
import style from './Header.module.css'
import { isAuthSuccess } from '../../lib/check-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom,faSignInAlt, faSignOutAlt, faFileArchive,faUserPlus} from '@fortawesome/free-solid-svg-icons'

const Header =({store})=>{
  const isAuth = isAuthSuccess(store)
  const menu=(isAuth===false)?[<li className="right">
  <Link to="/login"><FontAwesomeIcon icon={faSignInAlt}/> 用户登入</Link>
</li>,
<li className="right">
  <Link to="/signup"><FontAwesomeIcon icon={faUserPlus}/> 用户注册</Link>
</li>]:([<li className="right">
  <Link to="/logut"><FontAwesomeIcon icon={faSignOutAlt}/> 用户退出</Link>
</li>,<li className="right">
  <Link to="/storage"><FontAwesomeIcon icon={faFileArchive}/> 我的文件</Link>
</li>])

  return (<div className={style.Header}>
        <ul>
            <li>
              <Link to="/"><FontAwesomeIcon icon={faAtom} size="lg"/> 首页</Link>
            </li>
            {menu}
      </ul>
      </div>
    )
}

export default Header