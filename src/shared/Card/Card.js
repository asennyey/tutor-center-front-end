import {Card, CardHeader, CardContent, Typography, CardActions, IconButton} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import { environment } from '../../environment';
import { useUser } from '../../providers/user';
import { useData } from '../../providers/data';
import { useState } from 'react';
export default function QueueItem({title, subtitle, contentTitle, contentText, options, row}){
    const user = useUser();
    const {reload} = useData();
    const [sheetsRow] = useState(row + 2);
    const updateRow = (range, data) => {
        var params = {
            // The ID of the spreadsheet to update.
            spreadsheetId: environment.spreadsheetId,
    
            // The A1 notation of the values to update.
            range,
    
            // How the input data should be interpreted.
            valueInputOption: 'USER_ENTERED',
        };
    
        var valueRangeBody = {
            // TODO: Add desired properties to the request body. All existing properties
            // will be replaced.
            range,
            values: [
                data
            ]
        };
    
        var request = window.gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
        request.then(function(response) {
            // TODO: Change code below to process the `response` object:
            reload()
        }, function(reason) {
            console.error('error: ' + reason.result.error.message);
        });
    }

    const updateCell = (column, data) =>{
        updateRow(
            `${column}${sheetsRow}:${column}${sheetsRow}`, 
            [data]
        )
    }

    const assignToMe = () => { 
        updateCell('I', user.getEmail());
    }

    const unassign = () => {
        updateCell('I', '');
    }

    const markComplete = () => {
        updateCell('K', 'TRUE');
    }

    return (
        <Card sx={{ width: '45%', margin: 1, minWidth: 300 }}>
            <CardHeader
                title={title}
                subheader={subtitle}
            />
            <CardContent>
                <Typography variant="subtitle1" color="text.primary">
                {contentTitle}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                {contentText}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {
                    options.assignToMe?
                    <IconButton aria-label="Assign to Me" onClick={assignToMe}>
                        <PersonAddIcon />
                    </IconButton>:
                    <></>
                }
                {
                    options.unassign?
                    <IconButton aria-label="Unassign myself" onClick={unassign}>
                        <PersonRemoveIcon />
                    </IconButton>:
                    <></>
                }
                {
                    options.markComplete?
                    <IconButton aria-label="Mark complete" onClick={markComplete}>
                        <DoneIcon />
                    </IconButton>:
                    <></>
                }
            </CardActions>
        </Card>
    )
}