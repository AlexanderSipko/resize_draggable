// при установке важно добавить worker
import React, { useState, useEffect } from 'react';

import { MinimalButton, Position, Tooltip } from '@react-pdf-viewer/core';
import { NextIcon, PreviousIcon} from '@react-pdf-viewer/search';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

import { Input } from './BaseInputSearch';

import SameRegister from '../assets/same-register.png'
import DifferentRegister from '../assets/different-register.png'
import PartText from '../assets/part-text.png'
import FullText from '../assets/full-text.png'
import IsDigit from '../assets/digit.png'

const synonymSearch = (keyword, keywordWord) => {
    if (keywordWord === 'площадь') {
        return [keyword, 'метры', 'кв.м']
    } else {
        return keyword
    }
}


export const CustomSearch = ({searchPluginInstance}) => {
    const [ matches, setMatches] = useState([]);
    const [ hasDigit, setHasDigit] = useState(false);
    const [currentKeyword, setCurrentKeyword] = React.useState({
        keyword: '',
        matchCase: false,
        wholeWords: false,
    });
    const [extendsIndex, setExtendsIndex] = React.useState({
        beforeStartIndex:25,
        afterStartIndex:75
    });
    const { highlight, jumpToNextMatch, jumpToPreviousMatch, jumpToMatch, currentMatch, clearHighlights } = searchPluginInstance;

    const baseSearch = (keyword) => {
        setCurrentKeyword(keyword);
        highlight(synonymSearch(keyword, keyword.keyword)).then(matches => {
            setMatches(matches)
        });
    };

    useEffect(() => {
        if (!currentKeyword.keyword) {
            clearHighlights()
            setMatches([])
        }
    }, [currentKeyword])

    return (
        <>
            <div style={{'display':'flex', position:'static', alignItems: 'center'}}>
                <Input 
                    type={'base'}
                    search={baseSearch}
                    setCurrentKeyword={setCurrentKeyword} 
                    currentKeyword={currentKeyword} 
                    clearHighlights={clearHighlights}
                    placeholder={"Поиск в документе"}
                />
                <Tooltip
                        position={Position.BottomCenter}
                        target={
                            <MinimalButton onClick={jumpToPreviousMatch}>
                                <PreviousIcon />
                            </MinimalButton>
                        }
                        content={() => 'Предыдущий'}
                        offset={{ left: 0, top: 8 }}
                    />
                <Tooltip
                        position={Position.BottomCenter}
                        target={
                            <MinimalButton onClick={jumpToNextMatch}>
                                <NextIcon />
                            </MinimalButton>
                        }
                        content={() => 'Следующий'}
                        offset={{ left: 0, top: 8 }}
                    />
               <Tooltip
                        position={Position.BottomCenter}
                        target={
                            <img
                                style={!currentKeyword.keyword ? {'opacity':'0.2', 'cursor':'not-allowed'} : {
                                    'background':currentKeyword.matchCase ? '#9af29a': 'none'
                                }}
                                onClick={() =>
                                currentKeyword.keyword && 
                                baseSearch({
                                    keyword: currentKeyword.keyword,
                                    matchCase: !currentKeyword.matchCase,
                                    wholeWords: currentKeyword.wholeWords,
                                })
                                }
                            src={currentKeyword.matchCase ? DifferentRegister: SameRegister}
                            alt=""
                            />
                        }
                        content={() => {return currentKeyword.matchCase ? 'Учет регистра': 'Без учета регистра'}}
                        offset={{ left: 0, top: 8 }}
                />
                <Tooltip
                        position={Position.BottomCenter}
                        target={
                            <img
                                style={!currentKeyword.keyword ? {'opacity':'0.2', 'cursor':'not-allowed'} : {
                                    'background':currentKeyword.wholeWords ? '#9af29a': 'none'
                                }}
                                onClick={() =>
                                 currentKeyword.keyword && 
                                    baseSearch({
                                        keyword: currentKeyword.keyword,
                                        matchCase: currentKeyword.matchCase,
                                        wholeWords: !currentKeyword.wholeWords,
                                    })
                                }
                    src={currentKeyword.wholeWords ? FullText: PartText}
                    alt=""
                />
                        }
                        content={() => {return currentKeyword.wholeWords ? 'Целиком фраза': 'Часть фразы'}}
                        offset={{ left: 0, top: 8 }}
                />
                <Tooltip
                        position={Position.BottomCenter}
                        target={
                            <input 
                            id={'beforeStartIndex'}
                            style={{textAlign:'center', padding: '8px', width: '25px', borderRadius:'4px', border:'none',
                             'opacity':!currentKeyword.keyword ? '0.2': '1', 'cursor':'help'}} 
                            type="number" 
                            min={0} 
                            max={500} 
                            value={extendsIndex.beforeStartIndex} 
                            onChange={(e) => 
                            setExtendsIndex((prevent) => (
                                {...prevent, beforeStartIndex:e.target.value
                            }))
                        } />
                        }
                        content={() => {return `вывод ${extendsIndex.beforeStartIndex} символов до ключевого слова`}}
                        offset={{ left: 0, top: 8 }}
                />
                <Tooltip
                        position={Position.BottomCenter}
                        target={
                            <input 
                                style={{textAlign:'center', padding: '8px', width: '25px', borderRadius:'4px', border:'none',
                                    'opacity':!currentKeyword.keyword ? '0.2': '1', 'cursor':'help'}} 
                                type="number" 
                                min={0} 
                                max={500} 
                                value={extendsIndex.afterStartIndex} 
                                onChange={(e) => 
                                setExtendsIndex((prevent) => (
                                    {...prevent, afterStartIndex:e.target.value
                                    }))
                                }
                            />
                        }
                        content={() => {return `вывод ${extendsIndex.afterStartIndex} символов после ключевого слова`}}
                        offset={{ left: 0, top: 8 }}
                />
                <Tooltip
                        position={Position.BottomCenter}
                        target={
                            <img
                                style={!currentKeyword.keyword ? {'opacity':'0.2', 'cursor':'not-allowed'} : {
                                    'background':hasDigit ? '#9af29a': 'none'
                                }}
                                onClick={() =>
                                currentKeyword.keyword && 
                                setHasDigit(prevent => !prevent)
                                }
                            src={hasDigit? IsDigit: IsDigit}
                            alt=""
                            />
                        }
                        content={() => {return hasDigit ? 'Учитывать наличие цифр в контексте поиска': 'Без учета наличия цифр в контексте поиска'}}
                        offset={{ left: 0, top: 8 }}
                />
            </div>
            
            <RenderSearchMaths 
                match={matches} 
                jumpToNextMatch={jumpToNextMatch} 
                jumpToPreviousMatch={jumpToPreviousMatch}
                jumpToMatch={jumpToMatch}
                currentMatch={currentMatch}
                extendsIndex={extendsIndex}
                hasDigit={hasDigit}
            />
        </>
    )
}


function ToolTips ({renderSearchProps, tips}) {
    const elementParams = {
        NEXT: {
            icon: <NextIcon />,
            text: 'Далее',
            action: 'jumpToNextMatch'
        },
        PREVIOUS: {
            icon: <PreviousIcon />,
            text: 'Назад',
            action: 'jumpToPreviousMatch'
        }
    }

    return (
        <div style={{ padding: '0 2px' }}>
            <Tooltip
                position={Position.BottomCenter}
                target={
                    <MinimalButton onClick={renderSearchProps[elementParams[tips].action]}>
                        {elementParams[tips].icon}
                    </MinimalButton>
                }
                content={() => elementParams[tips].text}
                offset={{ left: 0, top: 8 }}
            />
        </div>
    )
}


const getMashesArray = (array, extendsIndex, hasDigit) => {
    let renderArray = []
    array.map((ma, index) => {
        // const isCurrent = currentMatch === index + 1
        // console.log(ma)
        const KEYWORD_SOURCE = ma.pageText.slice(ma.startIndex, ma.endIndex)
        const KEYWORD_START_INDEX = ma.startIndex
        const KEYWORD_LENGTH =  ma.endIndex - ma.startIndex
        const START_INDEX_TEXT = (KEYWORD_START_INDEX - extendsIndex.beforeStartIndex * 1 < 0) ? 
            0:
            KEYWORD_START_INDEX - extendsIndex.beforeStartIndex * 1

        const END_INDEX_TEXT = KEYWORD_START_INDEX + KEYWORD_LENGTH + extendsIndex.afterStartIndex * 1
        const TEXT_BEFORE = ma.pageText.slice(START_INDEX_TEXT, KEYWORD_START_INDEX)
        const TEXT_AFTER = ma.pageText.slice(KEYWORD_START_INDEX + KEYWORD_LENGTH, END_INDEX_TEXT)

        const SEARCH_TEXT = TEXT_BEFORE + KEYWORD_SOURCE + TEXT_AFTER

        if (hasDigit && /\d{2,20}/.test(SEARCH_TEXT)) {
                renderArray.push({
                matchIndex:ma.matchIndex,
                index:index + 1,
                pageIndex:ma.pageIndex + 1,
                textBefore: TEXT_BEFORE,
                keywordSource: KEYWORD_SOURCE,
                textAfter: TEXT_AFTER
                })
        } else if (!hasDigit) {
            renderArray.push({
                matchIndex:ma.matchIndex,
                index:index + 1,
                pageIndex:ma.pageIndex + 1,
                textBefore: TEXT_BEFORE,
                keywordSource: KEYWORD_SOURCE,
                textAfter: TEXT_AFTER
                })
        }
        
    })
    return renderArray
}

function RenderSearchMaths ({
        match,
        jumpToMatch,
        currentMatch,
        extendsIndex,
        hasDigit
    }) {

    const style = {
        'width':'max-content', 
        // 'position':'absolute', 
        // 'top':'50px', 
        // 'left':'1px',
        'maxHeight':'40vh', 
        'overflow':'auto',
        'padding':'5px 2px 5px 5px',
        'border':'0.5px solid gray',
        'borderRadius':'5px',
        'minWidth':'-webkit-fill-available',
        'maxWidth':'98vh',
    }

    const [ searchArray, setSearchArray] = useState([])

    useEffect(() => {
        setSearchArray(getMashesArray(match, extendsIndex, hasDigit))
    }, [getMashesArray, match, extendsIndex, hasDigit])

    return (
        <>
        <div>
            <p>{searchArray.length === 0 ? 'ничего не найдено' : `найдено - ${searchArray.length}`}</p>
        </div>
        {searchArray.length > 0 && 
        <div style={style}>
            <RenderSearchArray searchArray={searchArray} currentMatch={currentMatch} jumpToMatch={jumpToMatch}/>
        </div>}
        </>
    )
}

function RenderSearchArray ({searchArray, currentMatch, jumpToMatch}) {
    
    return (
        <>
            {searchArray.map((item, index) => {
                const isCurrent = currentMatch === item.index
                return <div 
                            key={`${index}-matchIndex-'`}
                            id={`${index}-matchIndex-'`}
                            className='searchItem'
                            style={{'cursor':'pointer', 'outline':isCurrent && '1px dashed green', 'marginBottom':'10px'}}
                            onClick={() => jumpToMatch(item.index)}
                        >
                            <div style={{'color':'gray', 'fontSize':'10px'}}>
                                стр. {item.pageIndex + 1}
                            </div>
                            <div style={{'color':'black', 'marginLeft':'38px'}}>
                                {item.textBefore}
                            </div>
                            <div style={{'color':'black', 'marginLeft':'38px'}}>
                                <span style={{'color':'red'}}>
                                    {item.keywordSource}
                                </span>
                                {item.textAfter}
                            </div>
                        </div>
            })}
        </>
    )
}