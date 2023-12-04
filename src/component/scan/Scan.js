import './scan.css'
import Button from '../../component/element/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import InputImg from './InputImg';
import { saveAs } from 'file-saver';

function Scan() {
    const [isSafe, setIsSafe] = useState()
    const [file, setFile] = useState(null)
    const [image, setImage] = useState('')
    const [showVideo, setShowVideo] = useState(false)
    const [selectedFileName, setSelectedFileName] = useState('Choose a file');
    const [isDownload, setIsDownload] = useState(false)
    const [currentFile, setCurrentFile] = useState('')

    const handleFileChange = (event) => {
        const fileName = event.target.files[0]?.name || 'Choose a file';
        setFile(event.target.files[0])
        setSelectedFileName(fileName);
    };

    const uploadFile = () => {
        const formData = new FormData()
        formData.append('file', file)
        axios.post('http://localhost:1000/upload', formData)
            .then(res => {
                setImage(res.data.image)
                setShowVideo(isVideo(res.data.image))
                console.log(res.data.image)
            })
            .catch(err => console.error(err))
    }

    function cutExtension(path) {
        for (let i = path.length - 1; i >= 0; i--) {
            if (path[i] === '.') {
                console.log(path.slice(0,i))
                return path.slice(0, i);
            }
        }
        // Jika tidak ditemukan ekstensi, kembalikan path asli
        return path;
    }

    function isVideo(path) {
        const videoExtensions = [".mp4", ".avi", ".mov"];
        const imageExtensions = [".jpg", ".jpeg", ".png"];

        let extension = ''
        for (let i = 0; i < path.length; i++) {
            if (path[i] === '.') {
                for (let j = i; j < path.length; j++) {
                    extension = path.slice(i).toLowerCase();
                }
            }
        }
        console.log(extension)

        for (let i = 0; i < 3; i++) {
            if (extension === videoExtensions[i]) {
                setShowVideo(true)
                return true;
            } else if (extension === imageExtensions[i]) {
                return false
            }
        }
    }

    const generateInference = async () => {
        try {
            
            const imageUrl = `C:\\Users\\lenov\\Documents\\TSDN\\ServerSide\\public\\image\\${image}`;


            if (isVideo(image)) {
                console.log("VIDEOS")
                axios.post('http://localhost:5000/detect_video', {
                    video_path: imageUrl
                }).then(response => {
                    console.log('Succesfully')
                    console.log(response.data.output_path)
                    // setImage(response.data.output_path)
                    setIsDownload(true)
                }).catch(err => console.error(err))
            } else {
                console.log("IMAGE")
                axios.post('http://localhost:5000/detect_objects', {
                    image_path: imageUrl,
                }).then(response => {
                    console.log(imageUrl)
                    console.log("PATH"+response.data.output_path)
                    setFile(`${image}_blurred.jpg`)
                    setImage(`${image}_blurred.jpg`)
                    console.log(image)
                    setIsDownload(true)
                })
            }
            setIsSafe(true)
            // Make a request to your detection endpoint using axios


            // Handle the response as needed
        } catch (error) {
            console.error(error.message);
            // Handle the error as needed
        }
    };

    const saveImage = () => {
        saveAs(`http://localhost:1000/image/${image}`, `${image}`)
    }

    // useEffect(() => {
    //     fetch('http://localhost:1000/get/image')
    //     .then(file => {
    //         setImage(file.formData.image)
    //         console.log(file.formData.image)})
    //     .catch(err => console.log(err))
    // }, [])

    useEffect(()=> {
            setCurrentFile(image);
            console.log(image)
            sourceImg()
    }, [image])

    function sourceImg(){
        return (
            <video controls loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
               
                <source src={`http://localhost:1000/image/${currentFile}`} type='video/mp4'/>
              Your browser does not support the video tag.
            </video>
        )
    }

    return (
        <div className="scan" id='scan'>
            <div className='box'>
                <div className='video'>
                {showVideo ? (
            sourceImg()
          ) : (
            <div className='preview' style={{ backgroundImage: `url(http://localhost:1000/image/${image})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
              {image !== '' ? <p></p> : <InputImg selectedFileName={selectedFileName} onChange={handleFileChange} />}
            </div>
          )}
                    
                </div>
                <div className='text'>
                    {image === '' ? <p></p> :
                        isSafe ?
                            <p style={{ color: 'green' }}>SAFE<br />VERIFIED SAFE</p> :
                            <p style={{ color: 'red' }}>WARNING<br />THERE IS PERSONAL DATA</p>}
                </div>

                {selectedFileName !== 'Choose a file' ?
                    (image === '' ? <Button onClick={uploadFile} buttonText={'SCAN'} /> :
                        isSafe ? (isDownload? <Button onClick={saveImage} buttonText={'SAVE'}  /> : <Button buttonText={'LOADING'} disabled={!isDownload}/>) :
                            <Button onClick={generateInference} buttonText={'CENSOR'} />)

                    : <Button  disabled={true} buttonText={'DISABLE'} />}
                {/* <Button buttonText={isWarning ? 'CENSOR' : 'DOWNLOAD'} onC /> */}
            </div>
        </div>
    )
}

export default Scan;