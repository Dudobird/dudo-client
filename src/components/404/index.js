import React from 'react'
import style from './style.module.css'
function HTTP404() {
  return (
		<div className={style.notfound}>
			<div>
				<h1><span>4</span><span>0</span><span>4</span></h1>
			</div>
			<h2>非常抱歉，您查询的资源无法找到，请确认输入数据是否正确</h2>
		</div>
  )
}
export default  HTTP404;