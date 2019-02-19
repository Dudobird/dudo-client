import React from 'react';
import { Link } from "react-router-dom";
import style from './Header.module.css'
const Header = () => (
  <div className={style.Header}>
      <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
    </ul>
    </div>
)

export default Header;