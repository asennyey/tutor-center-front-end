// the UserProvider in user-context.js is basically:
// const UserProvider = props => (
//   <UserContext.Provider value={useAuth().data.user} {...props} />
// )
// and the useUser hook is basically this:

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";

import { parseSpreadsheet, within } from '../util';

// const useUser = () => React.useContext(UserContext)
const DataContext = createContext({
    current:null, 
    setCurrent: () => {},
    itemsInQueue:[], 
    setQueue: () => {},
    itemsInProgress: [],
    setInProgress: () => {}
});
export default function DataProvider(props){
    const [dataIntervalId, setDataIntervalId] = useState(null);
    const [itemsInQueue, setQueue] = useState([]);
	const [itemsInProgress, setInProgress] = useState([])
	const [current, setCurrent] = useState(null);
    const {user} = useAuth();
    
	useEffect(() => {
		if(user){
            try{
                clearInterval(dataIntervalId);
            }catch(err){}
            setDataIntervalId(
                setInterval(()=>{
                    window.gapi.client.sheets.spreadsheets.values.get({
                        spreadsheetId: '1H84QXobhrkLsmVGoB-7mpF_1yZ3diiNM0oRaL4EwSFY',
                        range: 'Form Responses 1!A2:K',
                    }).then(function(response) {
                        var range = response.result;
                        if (range.values.length > 0) {
                            range = parseSpreadsheet(range.values);
                            let validVals = range.filter(e=>e.date && within(e.date, 8));
                            setQueue(validVals.filter(e=>!e.tutor && !e.isComplete));
                            setInProgress(validVals.filter(e=>e.tutor && !e.isComplete));
                            setCurrent(validVals.find(e=>e.tutor===user.getEmail() && !e.isComplete))
                        }
                    })
                }, 60000)
            )
		}
	}, [user])
    return <DataContext.Provider value={{
        itemsInQueue, 
        setQueue,
        itemsInProgress, 
        setInProgress,
        current,
        setCurrent
    }} {...props}/>
}

const useData = () => useContext(DataContext);

export {DataContext, useData}