import Deck from '../shared/Deck/deck';
import {useData} from '../providers/data'

export default function InProgress(){
    const {itemsInProgress} = useData();
    return (
        <Deck 
            items={itemsInProgress.map(e=>{
                return {
                    title: e.tutor,
                    subtitle: e.fullName,
                    contentTitle: e.className,
                    contentText: e.topic,
                    row: e.row
                }
            })} 
            options={{unassign: true, assignToMe:true, markComplete: true}}
            />
    )
}