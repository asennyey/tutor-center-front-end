import {DateTime} from 'luxon';

export function within(date, hours){
    return date > DateTime.now().minus({
        hours
    })
}

export function parseSpreadsheet(response){
    return response.map(e=>{
        return {
            date: toCommonDate(e[0]),
            fullName: e[1],
            email: e[2],
            className: e[4],
            topic: e[5],
            tutor: e[8],
            isComplete: e[10] === "TRUE",
            e
        }
    })
}

export default function toCommonDate(date){
    if(!date) return null;
    return DateTime.fromFormat(date, "M/d/yyyy hh:mm:ss");
}