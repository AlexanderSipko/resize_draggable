import React, { useState } from 'react';
import {Rnd} from 'react-rnd';
import './App.css'

const Box = () => (
  <div className="box1">box1</div>
);

const Box_2 = () => (
  <div className="box2">box2</div>
);

const Box_3 = () => (
  <div className="box3">box3</div>
);

const Box_4 = () => (
  <div className="box4">box4</div>
);


function RNDElement ({children, idBox, REVISABLE, x=0, y=0, width=200, height=100, zIndex=1}) {
  const [ position, setPosition] = useState({x:x, y:y})
  const [ size, setSize] = useState({width:width, height:height})
  const [isDragged, setIsDragged] = useState(false)
  const [isResized, setIsResized] = useState(false)

  const resized = (newSize) => {
    setSize(newSize)
  }
  const moving = (newPosition) => {
    setPosition(newPosition)
    setIsDragged(false)
  }
  const onDragStart = () => {
    setIsDragged(true)
    REVISABLE && REVISABLE.reVisibleElement(idBox)
  }

  const setStyle = () => {
    if (isDragged) {
      return 'isDragged'
    }
    if (isResized) {
      return 'isResized'
    }
    return null
  }

  return (
    <Rnd
      style={{'zIndex':REVISABLE ? REVISABLE.zIndex[idBox] : zIndex}}
      className={setStyle()}
      size={size}
      position={position}
      disableDragging={false}
      onDragStart={onDragStart}
      onDragStop={(e, d) => { moving({ x: d.x, y: d.y }) }}
      onResize={(e, direction, ref, delta, position) => {
        resized({width: ref.offsetWidth, height: ref.offsetHeight})
        moving(position)
      }}
      onResizeStart={() => {setIsResized(true)}}
      onResizeStop={() => {setIsResized(false)}}
    >
    {children}
    </Rnd>
  )
}

export const App = () => {
  const [ zIndex, setZIndex] = useState({
    'box1':1,
    'box2':2,
    'box3':3,
    'box4':4
  })

  const reVisibleElement = (idBox) => {
    const maxZIndex = Object.values(zIndex).sort((a, b) => b-a)[0]
    const maxElementKey = Object.keys(zIndex).find(key => zIndex[key] === maxZIndex);
    const newZIndex = {...zIndex, ...{[idBox]:maxZIndex, [maxElementKey]:zIndex[idBox]}}
    console.log(Object.values(zIndex).sort((a, b) => b-a)[1])
    // console.log(zIndex)
    setZIndex(newZIndex)
  }

  const REVISABLE = {
    reVisibleElement:reVisibleElement,
    zIndex:zIndex
  }
  
  return (
    <div>
      <RNDElement idBox={'box1'} REVISABLE={REVISABLE} x={50}>
        <Box />
      </RNDElement>
      <RNDElement idBox={'box2'} REVISABLE={REVISABLE} x={60} >
        <Box_2 />
      </RNDElement>
    </div>
  )
}
