import Deck from '../Deck/deck'

export default function Queue({items}){
    return (
        <Deck items={items} options={{assignToMe: true}}/>
    )
}