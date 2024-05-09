import React, { useEffect, useState } from 'react';
import { RNDElement } from './components/RNDElement';
import {PdfViewer} from './components/PDFViewer'
import testFile from './components/test.pdf';
import './App.css'

const Box = () => (
  <div className='box1'>
     box1
  </div>
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

export const App = () => {
  const [ zIndex, setZIndex] = useState({
    'box1':1,
    'box2':2,
    'box3':3,
    'box4':4
  })

  useEffect(() => {
    document.title = import.meta.env.VITE_NAME
  }, )
  
  const reVisibleElement = (idBox) => {
    const maxZIndex = Object.values(zIndex).sort((a, b) => b-a)[0]
    const maxElementKey = Object.keys(zIndex).find(key => zIndex[key] === maxZIndex);
    const newZIndex = {...zIndex, ...{[idBox]:maxZIndex, [maxElementKey]:zIndex[idBox]}}
    // console.log(Object.values(zIndex).sort((a, b) => b-a)[1])
    // console.log(zIndex)
    setZIndex(newZIndex)
  }

  const REVISABLE = {
    reVisibleElement:reVisibleElement,
    zIndex:zIndex
  }
  
  return (
    <div>
      <p>{import.meta.env.VITE_VERSION}</p>
      <RNDElement idBox={'box1'} REVISABLE={REVISABLE} x={50} y={20}>
        <PdfViewer testFile={testFile}/>
      </RNDElement>
      <RNDElement idBox={'box2'} REVISABLE={REVISABLE} x={150} y={80}>
        <PdfViewer URL={'https://pdfobject.com/pdf'} PDFile={'sample.pdf'}/>
      </RNDElement>
    </div>
  )
}
