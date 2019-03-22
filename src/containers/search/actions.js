import {
    UPDATE_SEARCH_ITEM, 
    SEARCH_FILES
} from './constants'

function updateSearchItem(search){
    return {
        type: UPDATE_SEARCH_ITEM,
        search
    }
}

function searchFiles(search){
    return {
        type: SEARCH_FILES,
        search
    }
}

export {
    updateSearchItem,
    searchFiles
}