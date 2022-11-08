import './App.scss';
import Love from '../love/Love';
import DragAndDrop from '../draganddrop/DragAndDrop';
import Upload from '../upload/Upload';
import DragAndDropCards from '../draganddropcards/DragAndDropCards';
import DragAndDropTrello from '../draganddroptrello/DragAndDropTrello';

function App() {
  return (
    <div className="app">
     <Love/>
     <DragAndDrop/>
     <Upload/>
     <DragAndDropCards/>
     <DragAndDropTrello/>
    </div>  
  );
}

export default App;
