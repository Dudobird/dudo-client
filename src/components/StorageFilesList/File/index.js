import React from 'react'
import style from './style.module.css'
import PropTypes from 'prop-types';
const File = (props) =>{
    return(
            <div>
                <div
                    className={style.document} key={props.data.id+"_1"}
                    onClick={()=>props.onClickFile(props.data.id, props.data.file_name)}>
                </div>
                <span key={props.data.id+"_2"} className={style.title}>{props.data.file_name}</span>
            </div>
    )
}
File.propTypes = {
    data: PropTypes.object.isRequired,
    onClickFile: PropTypes.func.isRequired,
};
export default File