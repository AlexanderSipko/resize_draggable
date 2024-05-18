
import { useState } from "react"

const searchDespatch = (renderSearch, method, params) => {
    switch (method) {
        case 'SET_KEY_WORD':
            // определяем ключевое слово для поиска
            renderSearch.setKeyword(params.value)
            return {method:method, matchCase:renderSearch.matchCase, wholeWords:renderSearch.wholeWords}
        case 'CLEAR_KEYWORD':
            // очистка контекста поиска
            renderSearch.clearKeyword()
            return {method:method, matchCase:renderSearch.matchCase, wholeWords:renderSearch.wholeWords}
        default:
            return {method:'default'}
    }
}

export {searchDespatch}
