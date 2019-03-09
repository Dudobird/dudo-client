import React from 'react'
import style from './style.module.css'
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
const Folder = (props) =>{
    const goToFolder = `/storage/${props.data.id}`;
    return(
        <div className={style.container}>
            <div className={style.image}>
                <FontAwesomeIcon size="3x" icon={faFolder}/>
            </div>
            <div className={style.info}>
                <Link to={goToFolder}>
                    <span className={style.title}>
                        {props.data.file_name}
                    </span>
                    <div className={style.smallInfo}>
                        创建于:{moment(props.data.CreatedAt).fromNow()}
                    </div>
                </Link>
            </div>
        </div>
    )
}
Folder.propTypes = {
    data: PropTypes.object.isRequired,
};
export default Folder