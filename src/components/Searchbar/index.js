import React from 'react'
import PropTypes from 'prop-types';
import style from './style.module.css'

function SearchBar(props) {
  return (
    <div className={style.searchbar + " container"}>
        <div className="row">
            <div className="col-md-6 col-md-offset-3">
                <div id="custom-search-input">
                    <div className="input-group col-md-12">
                        <input type="text" onChange={props.onChange} className="form-control input-lg" placeholder="输入文件名" />
                        <span className="input-group-btn">
                            <button className="btn btn-lg" type="button"onClick={props.onSearch}>
                                <i className="glyphicon glyphicon-search"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default SearchBar