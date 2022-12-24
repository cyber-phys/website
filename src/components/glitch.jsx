import Dither from '../components/Dither';
import './glitch.css';
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
import styled from 'styled-components';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
/* Original Windows95 font (optional) */
// import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
// import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

// const Wrapper = styled.div`
// 17  padding: 5rem;
// 18  background: ${({ theme }) => theme.material};
// 19  #default-buttons button {
// 20    margin-bottom: 1rem;
// 21    margin-right: 1rem;
// 22  }
// 23
// 24  #cutout {
// 25    background: ${({ theme }) => theme.canvas};
// 26    padding: 1rem;
// 27    width: 300px;
// 28  }
// 29`;

function Glitch() {
const [isFilePicked, setIsFilePicked] = useState(false);
const [selectedFile, setSelectedFile] = useState("/emojiGrillz.jpg");
const fileInput = useRef();
const dither = React.createRef();

const handleFileUpload = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const { result } = e.target;
        setSelectedFile(result);
      };
    reader.readAsDataURL(event.target.files[0]);
    setIsFilePicked(true);
};

const handleUploadClick = (event) => {
    fileInput.current.click();
};

// When save button is clicked, download the gif created by the dither component
const handelSaveClick = (event) => {
  const ditherElement = dither.current;
  const linkElement = ditherElement.querySelector('a');
  const url = linkElement.href;
  const a = document.createElement('a');
  a.href = url;
  a.download = 'datamosh.gif';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

return (
    <div>
    <ThemeProvider theme={original}>
    <Window style={{ maxWidth: '1000px' }}>
        <WindowHeader> Datamoshing.app </WindowHeader>
        <Toolbar noPadding>
        <input
            ref={fileInput} 
            onChange={handleFileUpload}
            type="file"
            id="file"
            style={{ display: "none" }}
        />
        <Button variant='thin' onClick={handleUploadClick}>
          Upload
        </Button>
        <Button variant='thin' onClick={handelSaveClick}>
          Save
        </Button>
        <Button variant='thin' disabled>
          Share
        </Button>
        </Toolbar>
        <WindowContent style={{ padding: '0.25rem' }}>
        <ScrollView>
        <Dither ref={dither} src={selectedFile}/>
        </ScrollView>
        </WindowContent>
    </Window>
    </ThemeProvider>
    </div>
);
}

export default Glitch;