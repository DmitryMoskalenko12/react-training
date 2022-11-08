import './upload.scss';
import { useState, useRef } from 'react';
import { useHttp } from '../../hooks/http.hook';

const Upload = () =>{
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState();
  const filePicker = useRef(null);
  const {request} = useHttp()

  const handleChange = (e) =>{
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = async () =>{
    if(!selectedFile){
      alert('Please select a file')
      return
    }
    /* const formData = new FormData();
    formData.append('file', selectedFile);

    const res = await fetch('url', {
      method:'POST',
      body: formData
    });
    const data = await res.json();
    setUploaded(data); */

    const formData = {}
    for (let key in selectedFile) {
     formData[key] = selectedFile[key]
    }
    request("http://localhost:3001/data", 'POST', JSON.stringify(formData) )
    .then((res) => setUploaded(res))

  }
 
  const handlePick = () =>{
    filePicker.current.click();
  }
  return(
    <>
    <button onClick={handlePick}>Pick file</button>
    <input type="file" accept='image/*' className='hidden' ref={filePicker}
     onChange={handleChange} />

     <button onClick={handleUpload}>Upload now!</button>

     {
      selectedFile &&(
        <ul>
          <li>Name: {selectedFile.name}</li>
          <li>Type: {selectedFile.type}</li>
          <li>Size: {selectedFile.size}</li>
          <li>lastModifiedDate: {''}
          {selectedFile.lastModifiedDate.toLocaleDateString()}
          </li>
        </ul>
      )}


      {
        uploaded && (
          <div>
            <h2>{uploaded.name}</h2>
            <img src={uploaded.filePath} alt="" width='200'/>
          </div>
        )
      }
    </>
  )
}
export default Upload;