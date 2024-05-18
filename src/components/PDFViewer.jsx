// при установке важно добавить worker
import React, { useState, useRef, useEffect } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import "pdfjs-dist/build/pdf.worker.js"
// Import styles
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry')

import ru_RU from '@react-pdf-viewer/locales/lib/ru_RU.json';


const renderToolbar = (Toolbar) => (
    <Toolbar>
        {(slots) => {
            const {
                CurrentPageInput,
                Download,
                Open,
                EnterFullScreen,
                GoToNextPage,
                GoToPreviousPage,
                NumberOfPages,
                // Print,
                ShowSearchPopover,
                Zoom,
                ZoomIn,
                ZoomOut,
            } = slots;
            return (
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        top:'0',
                        left:'0',
                        backgroundColor: '#82c46b',
                        justifyContent: 'space-around',
                        width:'100%',
                        height:'100%'
                    }}
                >
                    <div style={{ padding: '0px 2px' }}>
                        <ShowSearchPopover />
                    </div>
                    <div style={{ padding: '0px 2px' }}>
                        <EnterFullScreen />
                    </div>
                    <div style={{ padding: '0px 2px' }}>
                        <ZoomOut />
                    </div>
                    <div style={{ padding: '0px 2px' }}>
                        <Zoom />
                    </div>
                    <div style={{ padding: '0px 2px' }}>
                        <ZoomIn />
                    </div>
                    <div style={{ padding: '0px 1px', marginLeft: 'auto', display:'inherit' }}>
                        <GoToPreviousPage />
                        <GoToNextPage />
                    </div>
                    <div style={{ padding: '0px 2px', display:'inherit' }}>
                        <CurrentPageInput />
                    </div>
                    <div style={{ padding: '0px 2px', display:'inherit', fontSize:'14px', color:'gray' }}>
                        страниц - <NumberOfPages />
                    </div>
                    <div style={{ padding: '0px 2px' }}>
                        <Open />
                    </div>
                    <div style={{ padding: '0px 2px' }}>
                        <Download />
                    </div>
                </div>
            );
        }}
    </Toolbar>
);

export function PdfViewer(props) {
    
    const defaultLayoutPluginInstance = defaultLayoutPlugin(
        {
            sidebarTabs: (defaultTabs) => [],
            renderToolbar
        }
    );

    const plugins = [
        defaultLayoutPluginInstance,
        props.searchPluginInstance
    ]

    const viewerStyle = {
        height: '100%',
        width: '100%' // Устанавливаем ширину просмотра страницы в 100%
    };

    const pathPDf = encodeURIComponent(props.PDFile)
    
    return (
        <>
         <Worker workerUrl={pdfjsWorker} >
                <Viewer
                    fileUrl={decodeURIComponent(pathPDf)}
                    plugins={plugins}
                    style={viewerStyle}
                    localization={ru_RU}
                />
            </Worker>
        </>
    );
}
