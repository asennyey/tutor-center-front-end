// the UserProvider in user-context.js is basically:
// const UserProvider = props => (
//   <UserContext.Provider value={useAuth().data.user} {...props} />
// )
// and the useUser hook is basically this:

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";

import { parseSpreadsheet, within } from '../util';
import { environment } from "../environment";
import { Backdrop, CircularProgress } from "@mui/material";

// const useUser = () => React.useContext(UserContext)
const DataContext = createContext({
    current:null, 
    setCurrent: () => {},
    itemsInQueue:[], 
    setQueue: () => {},
    itemsInProgress: [],
    setInProgress: () => {},
    reload: () => {}
});
export default function DataProvider(props){
    const [loading, setLoading] = useState(true);
    const [dataIntervalId, setDataIntervalId] = useState(null);
    const [itemsInQueue, setQueue] = useState([]);
	const [itemsInProgress, setInProgress] = useState([]);
    const [lastQueriedRow, setLastQueriedRow] = useState(2);
	const [current, setCurrent] = useState(null);
    const {user} = useAuth();

    const getData = () =>{
        setLoading(true)
        window.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: environment.spreadsheetId,
            range: `Form Responses 1!A${lastQueriedRow}:K`,
        }).then(function(response) {
            setLoading(false)
            console.log(new Date(), response)
            var range = response.result;
            if (range.values.length > 0) {
                range = parseSpreadsheet(range.values);
                let validVals = range.filter(e=>e.date && within(e.date, 36));
                setLastQueriedRow(validVals.length ? validVals[0].row + 2 : range.values.length + 2)
                console.log(new Date(), validVals)
                setQueue(validVals.filter(e=>!e.tutor && !e.isComplete));
                setInProgress(validVals.filter(e=>e.tutor && !e.isComplete));
                setCurrent(validVals.find(e=>e.tutor===user.getEmail() && !e.isComplete))
            }
        })
    }

    const tryClearDataInterval = () => {
        if(dataIntervalId){
            try{
                clearInterval(dataIntervalId);
            }catch(err){}
        }
    }

    const updateData = () =>{
        tryClearDataInterval()
        console.log(dataIntervalId)
        getData()
        setDataIntervalId(
            setInterval(()=>{
                getData()
            }, 60000)
        )
    }
    
	useEffect(() => {
		if(user){
            updateData();
		}
        return () => {
            tryClearDataInterval()
        }
	}, [user]);

    /*if(loading) {
    return <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
                >
                <CircularProgress color="primary" />
            </Backdrop>
    }*/

    return <DataContext.Provider value={{
        itemsInQueue, 
        setQueue,
        itemsInProgress, 
        setInProgress,
        current,
        setCurrent,
        reload: () => updateData()
    }} {...props}/>
}

const useData = () => useContext(DataContext);

export {DataContext, useData}