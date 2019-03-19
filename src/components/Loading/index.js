import React from 'react'
import classnames from 'classnames'
import style from './style.module.css';
import {FaSpinner} from 'react-icons/fa'
function Loading(props) {
  return (
    <div className={classnames({"hidden": props.hidden, [style["loading"]]:true})}>
        <div className={style.loadingbox}>
            <FaSpinner size={"2em"} className="fa-spin"/>
        </div>
    </div>
  )
}
export default Loading;
