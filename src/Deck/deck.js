import './deck.css'
import QueueItem from '../Card/Card'

export default function Deck({items, options}){
    return (
        <div className="deck">
        {items.map(e=><QueueItem 
                name={e.name} 
                date={e.date} 
                className={e.class} 
                topic={e.topic} 
                options={options}
            />)}
        </div>
    )
}