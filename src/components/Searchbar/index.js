import React from 'react'
import PropTypes from 'prop-types';
import style from './style.module.css'

function SearchBar(props) {
  let handleKeyPress = function(event){
    let keyCode = event.keyCode || event.which;
    if (keyCode === 13){
        props.onSearch()
    }
  }
  return (
    <div className={style.searchbar}>
        <div id="custom-search-input">
            <div className="input-group col-md-12">
                <input 
                    type="text" 
                    onChange={props.onChange} 
                    className="form-control" 
                    placeholder="输入搜索内容"
                    onKeyPress={handleKeyPress}
                />
                <span className="input-group-btn">
                    <button className="btn" type="button"onClick={props.onSearch}>
                        <i className="glyphicon glyphicon-search"></i>
                    </button>
                </span>
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