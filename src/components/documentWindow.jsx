import Dither from './Dither';
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

function DocumentWindow(props) {
  const { fileName, fileUrl } = props;

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

return (
    <div>
    <ThemeProvider theme={original}>
    <Window style={{ maxWidth: '1000px' }}>
        <WindowHeader> Resume.exe </WindowHeader>
        <Toolbar noPadding>
        <input
            ref={fileInput} 
            onChange={handleFileUpload}
            type="file"
            id="file"
            style={{ display: "none" }}
        />
        <Button variant='thin' onClick={handleDownload}>
          Download
        </Button>
        <Button variant='thin' disabled>
          Edit
        </Button>
        </Toolbar>
        <WindowContent style={{ padding: '0.25rem' }}>
        <ScrollView>
        PDF Goes here.
        </ScrollView>
        </WindowContent>
    </Window>
    </ThemeProvider>
    </div>
);
}

export default DocumentWindow;