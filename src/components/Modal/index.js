import React, { Component } from 'react'
import style from './style.module.css'

export default class Modal extends Component {
  render() {
    if (!this.props.show){
        return null
    }
    return (
      <div className={style.modal}>
        <div className={style.modalMain}>
            <div class={style.header}>{this.props.title}</div>
            <div class={style.content}>
                {this.props.children}
            </div>
            <div class={style.footer}> 
            <button className="btn btn-primary" onClick={this.props.onSubmit}> 确认 </button>
            <button className="btn btn-default" onClick={this.props.onClose}> 关闭 </button>
            </div>
        </div>
      </div>
    )
  }
}
