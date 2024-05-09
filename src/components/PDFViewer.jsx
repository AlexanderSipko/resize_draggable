// при установке важно добавить worker
import React, { useState, useRef, useEffect } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import "pdfjs-dist/build/pdf.worker.js"
// Import styles
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry')

import ru_RU from '@react-pdf-viewer/locales/lib/ru_RU.json';


export function PdfViewer(props) {
    // const [fileUrl, setFileUrl] = useState(null);
    // const openPluginInstance = openPlugin();
    // const { OpenButton, fileUrl } = openPluginInstance;
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // console.log(defaultLayoutPluginInstance)
    const plugins = [
        defaultLayoutPluginInstance,
        // openPluginInstance
    ]

    const viewerStyle = {
        height: '100%',
        width: '100%' // Устанавливаем ширину просмотра страницы в 100%
    };

    let fileUrl = null
    if (props.URL && props.PDFile) {
        fileUrl = encodeURIComponent(props.URL + '/' + props.PDFile)
        fileUrl = decodeURIComponent(fileUrl)
    } else {
        fileUrl = props.testFile
    }

    
    return (
        <>
            <Worker workerUrl={pdfjsWorker}>
                <div style={{height: '100%'}}>
                    <Viewer
                        fileUrl={fileUrl}
                        plugins={plugins}
                        style={viewerStyle}
                        localization={ru_RU}
                    />
                </div>
            </Worker>
        </>
    );
}
