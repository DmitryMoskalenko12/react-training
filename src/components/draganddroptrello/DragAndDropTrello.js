import './draganddroptrello.scss';
import { useState } from 'react';

const DragAndDropTrello = () =>{
const [boards, setBoards] = useState([
  {id: 1, title: 'Сделать', items: [{id: 1, title: 'Пойти в магазин'}, {id:2, title: 'Выкинуть мусор'}, {id:3, title: 'Покушать'}]},
  {id: 2, title: 'Проверить', items: [{id: 4, title: 'Код ревью'}, {id:5, title: 'Задачи на факториал'}, {id:6, title: 'Задачи на фибоначчи'}]},
  {id: 3, title: 'Сделано', items: [{id: 7, title: 'Снять видео'}, {id:8, title: 'Смонтировать'}, {id:9, title: 'Отрендерить'}]}
])
const [currentBoard, setCurrentBoard] = useState(null)
const [currentItem, setCurrentItem] = useState(null)

function dragStartHandler(board, item) {
  setCurrentBoard(board)
  setCurrentItem(item)
}

function dragEndHandler(e) {
  e.target.style.boxShadow = 'none'
}

function dragLeaveHandler(e) {
  e.target.style.boxShadow = 'none'
 }

function dragOverHandler(e) {
  e.preventDefault()
  if (e.target.className == 'item') {
    e.target.style.boxShadow = '0 4px 3px gray'
  }
 
}

function dropHandler(e, board, item) {
  e.preventDefault()
  const currentIndex = currentBoard.items.indexOf(currentItem)
  currentBoard.items.splice(currentIndex, 1)

  const dropIndex = board.items.indexOf(item) /* в ту доску в которую я бросил задачу */
  board.items.splice(dropIndex + 1, 0, currentItem)

  setBoards(boards.map(b => {
    if(b.id === board.id){
      return board
    }
    if(b.id === currentBoard.id){
      return currentBoard
    }
    return b
  }))
}
const dropCardHadler = (e, board) =>{
  board.items.push(currentItem)
  const currentIndex = currentBoard.items.indexOf(currentItem)
  currentBoard.items.splice(currentIndex, 1)
  
  setBoards(boards.map(b => {
    if(b.id === board.id){
      return board
    }
    if(b.id === currentBoard.id){
      return currentBoard
    }
    return b
  }))
  e.target.style.boxShadow = 'none'
}

  return(
    <div className='trello'>
     {
      boards.map(board =>
        <div key={board.id} className='board'  
             onDragOver={e => dragOverHandler(e)}
             onDrop={e => dropCardHadler(e, board)}>
         <div className='board__title'>{board.title}</div>
         {
          board.items.map(item =>
           <div key={item.id}
           onDragStart={e => dragStartHandler(board, item)}
           onDragLeave={e => dragLeaveHandler(e)}
           onDragEnd={e => dragEndHandler(e)}
           onDragOver={e => dragOverHandler(e)}
           onDrop={e => dropHandler(e, board, item)}
           draggable = {true} 
           className='item'>{item.title}</div> )
         }
        </div> 

        )}
    </div>
   
  )
}
export default DragAndDropTrello;