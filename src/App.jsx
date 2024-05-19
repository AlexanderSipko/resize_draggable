import React, { useEffect } from 'react';
import { searchPlugin } from '@react-pdf-viewer/search';
import { RNDElement } from './components/RNDElement';
import { PdfViewer } from './components/PDFViewer'
import { CustomSearch } from './components/SearchPDFViewer'
import { InformVersion } from './components/Inform'
import './index.css'
import PDFtest from './components/test.pdf'

export const App = () => {
  const searchPluginInstance = searchPlugin();
    
  useEffect(() => {
    document.title = import.meta.env.VITE_NAME
  }, [])
  
  return (
    <div style={{'height':'98vh'}}>
      <InformVersion/>
      <CustomSearch searchPluginInstance={searchPluginInstance}/>
      <RNDElement idBox={'box1'} REVISABLE={null} x={5} y={350}>
        <PdfViewer PDFile={PDFtest} searchPluginInstance={searchPluginInstance}/>
      </RNDElement>
    </div>
  )
}


