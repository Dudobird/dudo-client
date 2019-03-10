import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styles from '../style.module.css'
function ProfileInfo(props) {
    const { handleSubmit, pristine, submitting } = props
    return (
        <div>
            <div className="col-md-12">
                <div className={styles.title}>
                    个人信息
            <span className={styles.titleID}>ID: user_abc1234455</span>
                </div>
                <hr />
            </div>
            <div className="col-md-8">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputName">用户名</label>
                        <Field className="form-control" name="name" type="text" label="inputName" id="name" component="input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPhone">电话</label>
                        <Field className="form-control" name="phone" type="text" label="inputPhone" id="phone" component="input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputMobilePhone">移动电话</label>
                        <Field className="form-control" name="mobile_phone" type="text" label="inputMobilePhone" id="mobile_phone" component="input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDepartment">所属部门</label>
                        <Field className="form-control" name="department" type="text" label="inputDepartment" id="department" component="input" />
                    </div>
                    <button type="submit"
                        disabled={pristine || submitting}
                        className="btn btn-default">提交信息</button>
                </form>
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
export default reduxForm({
    form: 'profileinfo'
})(ProfileInfo)
