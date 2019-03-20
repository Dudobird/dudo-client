import {
    UPDATE_SEARCH_ITEM
} from './constants'

function updateSearchItem(search){
    return {
        type: UPDATE_SEARCH_ITEM,
        search
    }
}

export {
    updateSearchItem
}