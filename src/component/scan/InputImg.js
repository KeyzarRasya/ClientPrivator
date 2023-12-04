

function InputImg({onChange, selectedFileName}){
    return(
        <div className="inputimg">
        <label htmlFor="file-input" className="custom-file-input">
                            {selectedFileName}
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            className="actual-file-input"
                            onChange={onChange}
                            name='image'
                        />
                        </div>
    )
}

export default InputImg;