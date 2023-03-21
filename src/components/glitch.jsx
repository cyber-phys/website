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

// Using React95 components create a window that contains the Dither component.
// Have color picker that looks like the one used in MS Paint. 
// The color picker should have have 2 rows of 8 colors, and be position at the bottom of the window.
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
        <Toolbar style={{ justifyContent: 'center', padding: '0.25rem' }}>
            <ColorPicker />
        </Toolbar>
    </Window>
    </ThemeProvider>
    </div>
);
}

const ColorPicker = () => {
  const colors = [
    '#000000',
    '#808080',
    '#800000',
    '#808000',
    '#008000',
    '#008080',
    '#000080',
    '#800080',
    '#C0C0C0',
    '#FFFFFF',
    '#FF0000',
    '#FFFF00',
    '#00FF00',
    '#00FFFF',
    '#0000FF',
    '#FF00FF',
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '160px' }}>
      {colors.map((color, index) => (
        <Button
          key={index}
          square
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: color,
            borderColor: color,
          }}
        />
      ))}
    </div>
  );
};

export default Glitch;