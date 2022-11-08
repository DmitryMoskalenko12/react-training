import './draganddrop.scss';
import { useState } from 'react';
import axios from 'axios';
import {useHttp} from '../../hooks/http.hook';

const DragAndDrop = () =>{
  const [drag, setDrag] = useState(false);
  const {request} = useHttp();

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true)
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false)
  }

   async function onDropHandler(e) {
   e.preventDefault();
   let files = [...e.dataTransfer.files]
  
   const formData = files[0]
   let res= {}
   for (let key in formData) {
    res[key] = formData[key]
   }
  await request('http://localhost:3001/data', 'POST', JSON.stringify(res))

   setDrag(false)
  }
  return(
    <>
    {
     drag ? <div onDragStart={e => dragStartHandler(e)}
                 onDragLeave={e => dragLeaveHandler(e)}
                 onDragOver={e => dragStartHandler(e)}
                 onDrop={e => onDropHandler(e)} className="droparea">Отпустите файлы, чтобы загрузить их</div>
     : <div onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)} style={{textAlign: 'center', marginTop: '50px', marginBottom: '50px'}}>Перетащите файлы чтобы загрузить их</div>
    }
    </>
  )
}
export default DragAndDrop;