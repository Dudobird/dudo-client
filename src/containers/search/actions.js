import {
    UPDATE_SEARCH_ITEM, 
    SEARCH_FILES,
    CLEAR_SEARCH_RESULT
} from './constants'

function updateSearchItem(search){
    return {
        type: UPDATE_SEARCH_ITEM,
        search
    }
}
function clearSearchResult(){
    return{
        type:CLEAR_SEARCH_RESULT
    }
}
function searchFiles(search,cb){
    return {
        type: SEARCH_FILES,
        search,
        cb
    }
}

export {
    updateSearchItem,
    searchFiles,
    clearSearchResult
}