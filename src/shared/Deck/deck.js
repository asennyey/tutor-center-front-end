import './deck.css'
import QueueItem from '../Card/Card'

export default function Deck({items, options}){
    return (
        <div className="deck">
        {items.map(e=><QueueItem 
                {...e}
                options={options}
            />)}
        </div>
    )
}