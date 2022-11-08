import './App.scss';
import Love from '../love/Love';
import DragAndDrop from '../draganddrop/DragAndDrop';
import Upload from '../upload/Upload';

function App() {
  return (
    <div className="app">
     <Love/>
     <DragAndDrop/>
     <Upload/>
    </div>  
  );
}

export default App;
