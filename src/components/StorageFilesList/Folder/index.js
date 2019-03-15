import React from 'react'
import style from './style.module.css'
import PropTypes from 'prop-types';
import moment from 'moment';
import { MdFolder } from "react-icons/md";
import { Link } from 'react-router-dom'


const Folder = (props) =>{
    const goToFolder = `/storage/${props.data.id}`;
    const disable = typeof props.disable != 'boolean'?false:true;

    const renderFolder = (  <div className={style.container}>
        <div className={style.image}>
            <MdFolder size={'3em'}/>
        </div>
        <div className={style.info}>
                <span className={style.title}>
                    {props.data.file_name}
                </span>
                <div className={style.smallInfo}>
                    创建于:{moment(props.data.CreatedAt).fromNow()}
                </div>
        </div> 
    </div>)

    if(disable===true){
        return renderFolder
    }
    return(
        <Link to={goToFolder}>
          {renderFolder}
        </Link>
    )
}
Folder.propTypes = {
    data: PropTypes.object.isRequired,
};
export default Folder