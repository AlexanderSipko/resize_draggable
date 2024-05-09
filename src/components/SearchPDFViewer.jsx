// при установке важно добавить worker
import React, { useState, useRef, useEffect } from 'react';

import { Icon, MinimalButton, Position, Tooltip } from '@react-pdf-viewer/core';
import { NextIcon, PreviousIcon} from '@react-pdf-viewer/search';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';


const styleMainDIV = {
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    display: 'flex',
    padding: '4px',
    marginBottom: '10px',
    width: '100%',
    // position:'sticky',
    // top:'20px',
    // zIndex:'2'
}

const styleWrapperInputDIV = {
    border: '1px solid rgba(0, 0, 0, 0.3)',
    display: 'flex',
    padding: '0 2px',
    borderRadius:'5px',
}

export const CustomSearch = ({searchPluginInstance}) => {
    
    const [ readyToSearch, setReadyToSearch ] = useState(false);
    const [ match, setMatches ] = useState([]);
    const { Search } = searchPluginInstance;

    const searchDespatch = (renderSearchProps, method, params) => {
        console.log(match)
    }

    return (
        <div style={styleMainDIV}>
        <Search>
            {(renderSearchProps) => {
                return (
                    <>
                        <div style={styleWrapperInputDIV}>
                            {match.length > 0 && 
                            <p style={{'fontSize':'12px', 'marginRight':'5px', 'cursor':'pointer'}} onClick={() => {
                                setReadyToSearch(false);
                                renderSearchProps.clearKeyword();
                                setMatches([])
                            }}>X</p>
                            }
                            
                            <input
                                style={{
                                    border: 'none',
                                    padding: '8px',
                                    width: '400px',
                                }}
                                placeholder="Поиск ..."
                                type="text"
                                value={renderSearchProps.keyword}
                                onChange={(e) => {
                                    // searchDespatch(renderSearchProps, 'go')
                                    setReadyToSearch(false);
                                    renderSearchProps.clearKeyword();
                                    setMatches([])
                                    if (e.target.value) {
                                        renderSearchProps.setKeyword(e.target.value);
                                    }
                                    
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && renderSearchProps.keyword && renderSearchProps.numberOfMatches === 0) {
                                        setReadyToSearch(true);
                                        // renderSearchProps.changeWholeWords(true)
                                        renderSearchProps.search().then((matches) => {
                                            setMatches(matches);
                                        });
                                        // searchDespatch(renderSearchProps, 'go')
                                    } else if (e.key === 'Enter' && renderSearchProps.numberOfMatches > 0) {
                                        renderSearchProps.jumpToNextMatch()
                                        // searchDespatch(renderSearchProps, 'go')
                                    } else if ((e.key === 'Enter' && e.ctrlKey) && renderSearchProps.numberOfMatches > 0) {
                                        renderSearchProps.jumpToPreviousMatch()
                                        // searchDespatch(renderSearchProps, 'go')
                                    }
                                }}
                            />
                            {/* <Tooltip
                                position={Position.BottomCenter}
                                target={
                                    <button
                                        style={{
                                            background: renderSearchProps.matchCase ? '#83c46b' : '#fff',
                                            border: `1px solid ${
                                                renderSearchProps.matchCase ? '#019201' : 'transparent'
                                            }`,
                                            height: '100%',
                                            padding: '0 2px',
                                        }}
                                        onClick={() =>
                                            {
                                                setReadyToSearch(true);
                                                setMatches([])
                                                renderSearchProps.changeMatchCase(!renderSearchProps.matchCase)
                                                
                                            }
                                        }
                                    >
                                        <Icon>
                                            <path d="M15.979,21.725,9.453,2.612a.5.5,0,0,0-.946,0L2,21.725" />
                                            <path d="M4.383 14.725L13.59 14.725" />
                                            <path d="M0.5 21.725L3.52 21.725" />
                                            <path d="M14.479 21.725L17.5 21.725" />
                                            <path d="M22.5,21.725,18.377,9.647a.5.5,0,0,0-.946,0l-1.888,5.543" />
                                            <path d="M16.92 16.725L20.794 16.725" />
                                            <path d="M21.516 21.725L23.5 21.725" />
                                        </Icon>
                                    </button>
                                }
                                content={() => 'С учетом регистра'}
                                offset={{ left: 0, top: 8 }}
                            />
                            <Tooltip
                                position={Position.BottomCenter}
                                target={
                                    <button
                                        style={{
                                            background: renderSearchProps.wholeWords ? '#83c46b' : '#fff',
                                            border: `1px solid ${
                                                renderSearchProps.wholeWords ? '#019201' : 'transparent'
                                            }`,
                                            height: '100%',
                                            padding: '0 2px',
                                        }}
                                        onClick={() =>
                                            
                                            {
                                            setReadyToSearch(true);
                                            setMatches([])
                                            renderSearchProps.changeWholeWords(!renderSearchProps.wholeWords)
                                            
                                        }
                                        }
                                    >
                                        <Icon>
                                            <path d="M0.500 7.498 L23.500 7.498 L23.500 16.498 L0.500 16.498 Z" />
                                            <path d="M3.5 9.498L3.5 14.498" />
                                        </Icon>
                                    </button>
                                }
                                content={() => 'Слово целиком'}
                                offset={{ left: 0, top: 8 }}
                            /> */}
                        </div>
                        {readyToSearch &&
                            renderSearchProps.keyword &&
                            renderSearchProps.numberOfMatches === 0 && (
                                <div style={{ padding: '0 8px' }}>Не найдено ...</div>
                            )}
                        {readyToSearch &&
                            renderSearchProps.keyword &&
                            renderSearchProps.numberOfMatches > 0 && (
                                <div style={{ padding: '0 8px' }}>
                                    {renderSearchProps.currentMatch} из {renderSearchProps.numberOfMatches}
                                </div>
                            )}
                        <div style={{ padding: '0 2px' }}>
                            <Tooltip
                                position={Position.BottomCenter}
                                target={
                                    <MinimalButton onClick={renderSearchProps.jumpToPreviousMatch}>
                                        <PreviousIcon />
                                    </MinimalButton>
                                }
                                content={() => 'Назад'}
                                offset={{ left: 0, top: 8 }}
                            />
                        </div>
                        <div style={{ padding: '0 2px' }}>
                            <Tooltip
                                position={Position.BottomCenter}
                                target={
                                    <MinimalButton onClick={renderSearchProps.jumpToNextMatch}>
                                        <NextIcon />
                                    </MinimalButton>
                                }
                                content={() => 'Далее'}
                                offset={{ left: 0, top: 8 }}
                            />
                            
                        </div>

                        <div style={{'weight':'800px', 'position':'absolute', 'top':'80px', 'maxHeight':'200px', 'overflow':'auto'}}>
                        {match.length > 0 && match.map((ma, index) => {
                                const isCurrent = renderSearchProps.currentMatch === index + 1
                                const START_INDEX = ma.startIndex -20 < 0 ? 0 : ma.startIndex - 100
                                const END_INDEX = ma.startIndex + ma.keyword.source.length + 100

                                return <div key={ma.matchIndex + '-index-'  + index}
                                style={{'cursor':'pointer', 'outline':isCurrent && '1px dashed green', 'marginBottom':'10px'}}
                                onClick={() => renderSearchProps.jumpToMatch(index + 1)}
                                >
                                    <span style={{'color':'gray'}}>
                                        стр. {ma.pageIndex + 1} {'\t'}
                                    </span>
                                    <span style={{'color':'black'}}>
                                        {ma.pageText.slice(START_INDEX, ma.startIndex)}
                                    </span>
                                    <span style={{'color':'red'}}>
                                        {ma.keyword.source}
                                    </span>
                                    <span style={{'color':'black'}}>
                                        {ma.pageText.slice(
                                            ma.startIndex + ma.keyword.source.length,
                                            END_INDEX
                                        )}
                                    </span>
                                    
                                    </div>
                            })}
                        </div>
                                
                        
                    </>
                );
            }}
        </Search>
        </div>
    )
}
