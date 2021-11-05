import Deck from '../shared/Deck/deck'
import { useData } from '../providers/data'

export default function Queue(){
    const {itemsInQueue} = useData()
    return (
        <Deck items={itemsInQueue.map(e=>{
            return {
                title: e.fullName,
                subtitle: e.date.toFormat("h:mm a"),
                contentTitle: e.className,
                contentText: e.topic,
                row: e.row
            }
        })}  options={{assignToMe: true}}/>
    )
}