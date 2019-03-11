import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import styles from '../style.module.css'

class ProfileInfo extends React.Component { 
    // https://github.com/erikras/redux-form/issues/4069
    componentDidMount(){
        this.props.initialize(this.props.initialValues);
    }
    renderForm = () =>{
        const { handleSubmit, pristine, submitting} = this.props
        return (
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="inputName">用户名</label>
                <Field name="name" className="form-control"  type="text" label="inputName" component="input" />
            </div>
            <div className="form-group">
                <label htmlFor="inputPhone">电话</label>
                <Field name="phone" className="form-control" type="text" label="inputPhone"  component="input" />
            </div>
            <div className="form-group">
                <label htmlFor="inputMobilePhone">移动电话</label>
                <Field  name="mobile_phone" className="form-control" type="text" label="inputMobilePhone"  component="input" />
            </div>
            <div className="form-group">
                <label htmlFor="inputDepartment">所属部门</label>
                <Field name="department" className="form-control" type="text" label="inputDepartment" component="input" />
            </div>
            <button type="submit"
                disabled={pristine || submitting}
                className="btn btn-default">提交信息</button>
        </form>
        )
    }
    render(){
        return (
            <div>
                <div className="col-md-12">
                    <div className={styles.title}>
                        个人信息
                    <span className={styles.titleID}>ID: {this.props.profile && this.props.profile.user_id}</span>
                    </div>
                    <hr />
                </div>
                <div className="col-md-8">
                    {this.renderForm()}
                </div>
                <div className="col-md-4">
                    <div className={styles.headerImage}>
                        <img alt="header" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzE0MHgxNDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNjk2NzRjODQ2ZCB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE2OTY3NGM4NDZkIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ0LjA1NDY4NzUiIHk9Ijc0LjUiPjE0MHgxNDA8L3RleHQ+PC9nPjwvZz48L3N2Zz4=" className="img-rounded" />
                        <div className="form-group">
                            <label htmlFor="inputHeaderImage">修改头像</label>
                            <input type="file" id="headerImage" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ProfileInfo =  reduxForm({
    form: 'profileinfo'
})(ProfileInfo)
ProfileInfo = connect(
    state => ({
            initialValues: state.profile.profile
        }),null
)(ProfileInfo)
export default ProfileInfo;
