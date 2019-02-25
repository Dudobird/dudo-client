import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { reduxForm , Field}from 'redux-form';
import { Link } from 'react-router-dom'
import { connect }from 'react-redux';
import Messages from '../notifications/Messages';
import Errors from '../notifications/Error';
import { signupRequest } from './actions'
import styles from './signup.module.css';

class Signup extends Component{
   static propTypes = {
       handleSubmit: PropTypes.func,
       signupRequest: PropTypes.func,
       signup: PropTypes.shape({

           requesting: PropTypes.bool,
           successful: PropTypes.bool,
           messages: PropTypes.array,
           errors: PropTypes.array,
       }),
   }

   submit = (values) =>{
       this.props.signupRequest(values)
   }

   render(){
        const {
            handleSubmit,
            signup:{
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
                    <div className={styles.panelTitle + " panel-title text-center"}>Dudo注册页面</div>
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
                            <button type="submit" className="btn btn-primary pull-right"><i className="glyphicon glyphicon-log-in"></i> 注册</button>                          
                        </div>
                    </div>
                    </form>
                </div>
                <div className="auth-messages">
                  {!requesting && !successful && (
                        <Link to="/login">已经注册账户? 点击这里登入 »</Link>
                    )}
                    {!requesting && !!errors.length && (
                    <Errors errors={errors} />
                    )}
                    {!requesting && !!messages.length && (
                    <Messages messages={messages} />
                    )}
                    {!requesting && successful && (
                    <div>
                    注册成功! <Link to="/login">前往登入页面 »</Link>
                    </div>
                    )}
                </div>
            </div>
        </div>
        )
   }
}

const mapStateToProps = state =>({
    signup: state.signup
})

const connected = connect(mapStateToProps, {signupRequest})(Signup)

const formed = reduxForm({
    form: 'signup'
})(connected);

export default formed;