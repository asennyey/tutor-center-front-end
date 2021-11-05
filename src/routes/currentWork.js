import QueueItem from '../shared/Card/Card'

export default function CurrentWork({item}){
    return item?(<QueueItem 
            name={item.name} 
            date={item.date} 
            row={item.row}
            className={item.class} 
            topic={item.topic} 
            options={{markComplete: true, unassign:true}}
        />
    ):<></>
}