import React, { useState, useEffect, useRef } from 'react';
import {
Button,
MenuList,
MenuListItem,
ScrollView,
Separator,
Toolbar,
Window,
WindowContent,
WindowHeader } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import {Document, Page} from `react-pdf`;
import "./resumeWindow.css"

function ResumeWindow() {
  const fileName = "Chartier_Resume";
  const fileUrl = "/Chartier_Resume.pdf"

  const handleDownload = (event) => {
    // Create a link element
    const link = document.createElement('a');

    // Set the link's href to the file URL
    link.href = fileUrl;

    // Set the link's download attribute to the file name
    link.download = fileName;

    // Append teh link tot he document body
    document.body.appendChild(link);

    // Click the link to initiate the download
    link.click();

    // Remove the link form the document body
    document.body.removeChild(link);
  };

  function PdfViewer(props) {
    const { pdfUrl } = props;
  
    return (
      <iframe src={fileUrl} className="pdf-viewer"/>
      // <Document file={pdfUrl}>
      //   <Page pageNumber={1} />
      // </Document>
    );
  }


return (
    <div>
    <ThemeProvider theme={original}>
    <Window style={{ width: '100%', height: '100%' }}>
        <WindowHeader> Resume.exe </WindowHeader>
        <Toolbar noPadding>
        <Button variant='thin' onClick={handleDownload}>
          Download
        </Button>
        <Button variant='thin' disabled>
          Edit
        </Button>
        </Toolbar>
        <WindowContent style={{ padding: '0.25rem' }}>
        {/* <ScrollView> */}
          <PdfViewer pdfUrl="./Chartier_Resume.pdf" />
        {/* </ScrollView> */}
        </WindowContent>
    </Window>
    </ThemeProvider>
    </div>
);
}

export default ResumeWindow;