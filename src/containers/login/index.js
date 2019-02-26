import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { reduxForm , Field}from 'redux-form';
import { Link } from 'react-router-dom'
import { connect }from 'react-redux';
import {Messages,Errors} from '../../components';
import { loginRequest } from './actions'
import styles from './login.module.css';
class Login extends Component{
   static propTypes = {
       handleSubmit: PropTypes.func,
       loginRequest: PropTypes.func,
       login: PropTypes.shape({
           requesting: PropTypes.bool,
           successful: PropTypes.bool,
           messages: PropTypes.array,
           errors: PropTypes.array,
       }),
   }

   submit = (values) =>{
       this.props.loginRequest(values)
   }

   render(){
        const {
            handleSubmit,
            login:{
                requesting,
                successful,
                messages,
                errors,
            },
        } = this.props

        return (
        <div className={styles.login + " col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"}>
            <div className="panel">
                <div className={styles.panelHeading + " panel-heading"}>
                    <div className={styles.panelTitle + " panel-title text-center"}>Dudo登入页面</div>
                </div>     

                <div className="panel-body" >
                    <form className="form-horizontal widget-form" onSubmit={handleSubmit(this.submit)}>
                        <div className="form-group">
                            <label htmlFor="email">电子邮件</label>
                            <Field className="form-control" name="email" type="text" id="email" label="Email" component="input"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">登入密码</label>
                            <Field className="form-control" name="password" type="password" id="password" label="Password" component="input"/>                
                        </div>
                        <div className="form-group">
                            <div className="">
                            <button type="submit" className="btn btn-primary pull-right"><i className="glyphicon glyphicon-log-in"></i> 登入</button>                          
                        </div>
                    </div>
                    </form>
                </div>
                <div className="auth-messages">
                  {!requesting && !successful && (
                        <Link to="/signup">还没有注册账户? 点击这里注册 »</Link>
                    )}
                    {!requesting && !!errors.length && (
                    <Errors errors={errors} />
                    )}
                    {!requesting && !!messages.length && (
                    <Messages messages={messages} />
                    )}
                </div>
            </div>
        </div>
        )
   }
}

const mapStateToProps = state =>({
    login: state.login
})

const connected = connect(mapStateToProps, {loginRequest})(Login)

const formed = reduxForm({
    form: 'login'
})(connected);

export default formed;