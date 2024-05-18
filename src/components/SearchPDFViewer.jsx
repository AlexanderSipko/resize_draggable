// при установке важно добавить worker
import React, { useState, useRef, useEffect } from 'react';

import { Icon, MinimalButton, Position, Tooltip } from '@react-pdf-viewer/core';
import { NextIcon, PreviousIcon} from '@react-pdf-viewer/search';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';


const styleMainDIV = {
    alignItems: 'center',
    position:'relative',
    backgroundColor: '#eeeeee',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    display: 'flex',
    padding: '4px',
    borderRadius:'8px',
    // marginRight:'5px',
    // height: '50px',
    justifyContent: 'space-between',
    width: '98vw',
}

const styleWrapperInputDIV = {
    // border: '1px solid rgba(0, 0, 0, 0.3)',
    display: 'flex',
    borderRadius:'4px',
    alignItems: 'center'
}

export const CustomSearch = ({searchPluginInstance}) => {
    const { Search, highlight } = searchPluginInstance;

    console.log(highlight)
    return (
        <div style={styleMainDIV}>
            <Search>
                {(renderSearchProps) => SearchLogic(renderSearchProps, highlight)}
            </Search>
        </div>
    )
}


function SearchLogic (renderSearchProps, highlight) {
        
    const [ readyToSearch, setReadyToSearch ] = useState(false);
    const [ match, setMatches ] = useState([]);

    // useEffect(() => {
    //     highlight(['договор', 'док'])
    // }, [])

    return (
                <>
                    <div style={styleWrapperInputDIV}>
                        <SearchInput 
                            renderSearchProps={renderSearchProps} 
                            setMatches={setMatches} 
                            setReadyToSearch={setReadyToSearch}
                        />
 
                        <Tooltip
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
                                            // console.log(renderSearchProps.matchCase)
                                            renderSearchProps.changeMatchCase(!renderSearchProps.matchCase)
                                            renderSearchProps.search().then((matches) => {
                                                setMatches(matches);
                                            });
                                            
                                            // console.log(renderSearchProps.matchCase)
                                            
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
                                    {renderSearchProps.matchCase}
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
                                        // console.log(renderSearchProps.matchCase)
                                        renderSearchProps.changeWholeWords(!renderSearchProps.wholeWords)
                                        console.log(renderSearchProps.wholeWords)
                                        renderSearchProps.search().then((matches) => {
                                            setMatches(matches);
                                        });
                                        console.log(renderSearchProps.wholeWords)
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
                        />
                    <ClearingSearch
                            renderSearchProps={renderSearchProps}
                            match={match}
                            setReadyToSearch={setReadyToSearch}
                            setMatches={setMatches}/>
                    
                    {readyToSearch && <InformSearch renderSearchProps={renderSearchProps}/>}
                    <ToolTips renderSearchProps={renderSearchProps} tips={'NEXT'}/>
                    <ToolTips renderSearchProps={renderSearchProps} tips={'PREVIOUS'}/>
                    
                    </div>
                    <RenderSearchMaths renderSearchProps={renderSearchProps} match={match} />
                    <CustomizeFilter/>
                </>
            );
    
}

function ClearingSearch ({renderSearchProps, match, setReadyToSearch, setMatches}) {
    return (
        <>
            {match.length > 0 && 
                <p style={{'fontSize':'12px', 'marginRight':'5px', 'cursor':'pointer'}} onClick={() => {
                    setReadyToSearch(false);
                    renderSearchProps.clearKeyword();
                    setMatches([])}}
                >clear search</p>
            }
        </>

    )
}

function InformSearch ({renderSearchProps}) {
    if (renderSearchProps.keyword && renderSearchProps.numberOfMatches > 0) {
        return (
            <div style={{ padding: '0 8px' }}>
                {renderSearchProps.currentMatch} из {renderSearchProps.numberOfMatches}
            </div>
        )
    }

    if (renderSearchProps.keyword && renderSearchProps.numberOfMatches  === 0) {
        return (
            <div style={{ padding: '0 8px' }}>Не найдено ...</div>
        )
    }

}

function SearchInput ({renderSearchProps, setMatches, setReadyToSearch}) {
    return (
        <input
        style={{
            border: 'none',
            padding: '7px',
            width: '400px',
        }}
        placeholder="Поиск ..."
        type="text"
        value={renderSearchProps.keyword}
        onChange={(e) => {
            // setReadyToSearch(false);
            renderSearchProps.clearKeyword()
            setMatches([])
            if (e.target.value) {
                renderSearchProps.setKeyword(e.target.value)
            }
        }}
        onKeyDown={(e) => {
            if (e.key === 'Enter' && renderSearchProps.keyword) {
                setReadyToSearch(true);
                renderSearchProps.search().then((matches) => {
                    setMatches(matches);
                });
            } else if (e.key === 'Enter' && renderSearchProps.numberOfMatches > 0) {
                renderSearchProps.jumpToNextMatch()
            } else if ((e.key === 'Enter' && e.ctrlKey) && renderSearchProps.numberOfMatches > 0) {
                renderSearchProps.jumpToPreviousMatch()
            }
        }}
    />
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

function RenderSearchMaths ({renderSearchProps, match}) {

    const style = {
        'width':'max-content', 
        'position':'absolute', 
        'top':'50px', 
        'left':'1px',
        'maxHeight':'25vh', 
        'overflow':'auto',
        'padding':'5px 2px 5px 5px',
        'border':'0.5px solid gray',
        'borderRadius':'5px',
        'minWidth':'-webkit-fill-available',
        'maxWidth':'98vh',
    }

    return (
        <>
        <p style={{'padding':'0px', 'margin':'0px', 'fontSize':'12px'}}>
            {renderSearchProps.matchCase ? 'c учетом регистра' : 'без учета регистра'} и {renderSearchProps.wholeWords ? 'только целиком фраза' : 'по части фразы'}
        </p>
                
        {match.length > 0 && 
        <div style={style}>
            {match.map((ma, index) => {
                const isCurrent = renderSearchProps.currentMatch === index + 1
                const START_INDEX = ma.startIndex -20 < 0 ? 0 : ma.startIndex - 100
                const END_INDEX = ma.startIndex + ma.keyword.source.length + 100

                return <div key={ma.matchIndex + '-index-'  + index}
                className='searchItem'
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
        </div>}
        </>
    )
}

function CustomizeFilter () {
    
    return (
        <>
            <p>CustomizeFilter</p>
        </>
    )
}