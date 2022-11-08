import './App.scss';
import Love from '../love/Love';
import DragAndDrop from '../draganddrop/DragAndDrop';
import Upload from '../upload/Upload';
import DragAndDropCards from '../draganddropcards/DragAndDropCards';

function App() {
  return (
    <div className="app">
     <Love/>
     <DragAndDrop/>
     <Upload/>
     <DragAndDropCards/>
    </div>  
  );
}

export default App;
