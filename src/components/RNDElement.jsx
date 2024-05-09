import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

function RNDElement ({children, idBox, REVISABLE, x=0, y=0, width=700, height=400, zIndex=1}) {
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
        minWidth={500}
        minHeight={500}
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

export {RNDElement}