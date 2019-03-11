import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styles from '../style.module.css'

const validate = values => {
  const errors = {}
  if (!values.password) {
    errors.password = '不能为空'
  } else if (values.password.length < 6) {
    errors.password = '密码长度不能少于6位'
  }
  if (!values.new_password) {
    errors.new_password = '不能为空'
  } else if (values.new_password.length < 6) {
    errors.new_password = '密码长度不能少于6位'
  }
  if (values.new_password !== values.confirm_password) {
    errors.confirm_password = '两次输入密码不一致'
  }
  if (values.password === values.new_password) {
    errors.new_password = '输入密码与原始密码一致，请修改'
  }
  return errors
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input className="form-control" {...input} type={type} />
      {touched &&
        ((error && <span className={styles.error}>{error}</span>) ||
          (warning && <span className={styles.warning}>{warning}</span>))}
    </div>
  </div>
)

let Password = (props) => { 
      const {handleSubmit,pristine,submitting,invalid} = props;
      return (
          <div>
              <div className="col-md-12">
                  <div className={styles.title}>
                      修改密码
                  </div>
                  <hr />
              </div>
              <div className="col-md-8">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <Field name="password" label="原始密码" type="text" component={renderField} />
                    </div>
                    <div className="form-group">
                        <Field name="new_password"  label="新密码" type="text" component={renderField}/>
                    </div>
                    <div className="form-group">
                        <Field  name="confirm_password" label="确认密码" type="text"  component={renderField} />
                    </div>
                    <button type="submit"
                        disabled={invalid|| pristine || submitting}
                        className="btn btn-default">提交信息</button>
                </form>
              </div>
          </div>
      )
}

Password =  reduxForm({
  form: 'profilepassword',
  validate,
})(Password)

export default Password;
