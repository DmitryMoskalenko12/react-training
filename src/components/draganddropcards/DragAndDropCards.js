import './draganddropcards.scss';
import { useState } from 'react';

const DragAndDropCards = () =>{
  const [cardList, setCardList] = useState([
    {id: 1, order: 3, text:'Card3'},
    {id: 2, order: 1, text:'Card1'},
    {id: 3, order: 2, text:'Card2'},
    {id: 4, order: 4, text:'Card4'},
  ])
  const [currentCard, setCurrentCard] = useState(null)

function dragStartHandler(e, card) {
  console.log('drag', card)
  setCurrentCard(card)
}

function dragEndHandler(e) {
  e.target.style.background = 'white'
}

function dragOverHandler(e) {
  e.preventDefault()
  e.target.style.background = 'lightgray'
}

function dropHandler(e, card) {
  e.preventDefault()
  setCardList(cardList.map(c => {
    if (c.id === card.id) { /* карточке в которую хотим закинуть присва номер той которую держим */ 
      return {...c, order: currentCard.order}
    }
    if (c.id === currentCard.id) { /* карточке которую держим записываем номер той карточки в которую хотим закинуть */
      return {...c, order: card.order}
    }
    return c
  }))
  e.target.style.background = 'white'
}

const sortCards = (a, b) =>{
  if (a.order > b.order) {
    return 1
  } else {
    return -1
  }
}

  return(
    <div className="cards">
      {
        cardList.sort(sortCards).map(card =>
        <div 
         key={card.id}
         onDragStart={e => dragStartHandler(e, card)}
         onDragLeave={e => dragEndHandler(e)}
         onDragEnd={e => dragEndHandler(e)}
         onDragOver={e => dragOverHandler(e)}
         onDrop={e => dropHandler(e, card)}

         draggable = {true}
         className={'card'}>
          {card.text}
        </div>  
          )}
    </div>
  )
}
export default DragAndDropCards;