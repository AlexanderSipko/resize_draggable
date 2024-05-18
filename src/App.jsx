import React, { useEffect } from 'react';
import { searchPlugin } from '@react-pdf-viewer/search';
import { RNDElement } from './components/RNDElement';
import {PdfViewer} from './components/PDFViewer'
import { CustomSearch } from './components/SearchPDFViewer'
import './App.css'
import PDFtest from './components/test.pdf'

export const App = () => {
  const searchPluginInstance = searchPlugin();
  useEffect(() => {
    document.title = import.meta.env.VITE_NAME
  }, [])
  
  return (
    <div style={{'height':'100vh'}}>
      <p style={{'fontSize':'10px', 'color':'gray', 'margin':'0px 0px 0px 5px', 'padding':'0', 'position':'static'}}>
        {import.meta.env.VITE_VERSION}
      </p>
      <CustomSearch searchPluginInstance={searchPluginInstance}/>
      <RNDElement idBox={'box1'} REVISABLE={null} x={5} y={300}>
        <PdfViewer PDFile={PDFtest} searchPluginInstance={searchPluginInstance}/>
      </RNDElement>
    </div>
  )
}
