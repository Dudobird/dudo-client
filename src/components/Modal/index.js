import React, { Component } from 'react'
import style from './style.module.css'

export default class Modal extends Component {
  componentDidMount(){
    if(this.props.reset){
      this.props.reset()
    }
  }
  render() {
    return (
      <div className={style.modal}>
        <div className={style.modalMain}>
            <div className={style.header}>{this.props.title}</div>
            <div className={style.content}>
                {this.props.children}
            </div>
            <div className={style.footer}> 
            <button className="btn btn-primary" onClick={this.props.onSubmit}> 确认 </button>
            <button className="btn btn-default" onClick={this.props.onClose}> 关闭 </button>
            </div>
        </div>
      </div>
    )
  }
}
