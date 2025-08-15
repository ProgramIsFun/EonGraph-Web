import React, {useRef, useState} from 'react';

const FileDrop = (props) => {
    const fileContent = props.fileContent;
    const setFileContent = props.setFileContent;
    const setrepo = props.setrepo;
    const setdd = props.setdd;
    const text = props.text;

    const fileInputRef = useRef(null);


    // Reads and handles a file object
    const readFile = (file) => {
        const reader = new FileReader();
        reader.onload = (readEvent) => {
            setFileContent(readEvent.target.result);

            // Parse the file as JSON and set state accordingly
            try {
                const data = JSON.parse(readEvent.target.result);
                if (setdd) {
                    setdd(data);
                } else if (setrepo) {
                    setrepo(data);
                }
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        };
        reader.readAsText(file);
    };
    // Handle file drop
    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        // Retrieve the first file from FileList object if it exists
        const file = event.dataTransfer.files[0];

        // Only proceed if a file was actually dropped
        if (file) {
            readFile(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            readFile(file);
        }
    };

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <span
                style={{
                    border: '2px dashed #ccc',
                    // padding: '20px',
                    // textAlign: 'center',
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={openFileDialog}
            >
                {text}
                {/*<div style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>{fileContent}</div>*/}

            </span>
            <input
                type="file"
                style={{display: 'none'}}
                ref={fileInputRef}
                onChange={handleFileInputChange}
            />
        </>
    );
};

export default FileDrop;