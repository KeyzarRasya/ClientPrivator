import './upload.css'
import * as React from 'react';
import { useState } from 'react';
import Button from '../../component/element/Button';


function ImageUpload() {
    const [file, setFile] = useState(null)
    const [selectedFileName, setSelectedFileName] = useState('Choose a file');

    const handleFileChange = (event) => {
        const fileName = event.target.files[0]?.name || 'Choose a file';
        setFile(event.target.files[0])
        setSelectedFileName(fileName);
    };

    const uploadFile = () => {
        const formData = new FormData()
        formData.append('file', file)
        fetch('http://localhost:1000/upload', {
            method:'POST',
            body:formData
        })
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }
        
    return (
        <div className="upload">
            <div className='box'>
                <div className='yt'>
                    <p></p>
                </div>
                <label htmlFor="file-input" className="custom-file-input">
                    {selectedFileName}
                </label> 
                <input
                    type="file"
                    id="file-input"
                    className="actual-file-input"
                    onChange={handleFileChange}
                    name='image'
                />
                <Button buttonText={"Scan"} onClick={uploadFile}/>
            </div>

        </div>
    )
}

export default ImageUpload