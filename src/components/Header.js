import React from 'react';
import { Link } from "react-router-dom";
import style from './Header.module.css'
const Header = () => (
  <div className={style.Header}>
      <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li className="right">
            <Link to="/login">用户登入</Link>
          </li>
          <li className="right">
            <Link to="/signup">用户注册</Link>
          </li>
    </ul>
    </div>
)

export default Header;