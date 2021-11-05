import QueueItem from '../Card/Card'
import Deck from '../Deck/deck'

export default function InProgress({items}){
    return (
        <Deck items={items} options={{unassign: true, assignToMe:true, markComplete: true}}/>
    )
}