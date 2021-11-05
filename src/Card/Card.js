import {Card, CardHeader, CardContent, Typography, CardActions, IconButton} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
export default function QueueItem({name, date, className, topic, options}){
    const updateRow = () =>{
        
    }

    const assignToMe = () => { 

    }

    const unassign = () => {

    }

    const markComplete = () => {

    }

    return (
        <Card sx={{ width: '45%', margin: 1, minWidth: 300 }}>
            <CardHeader
                title={name}
                subheader={date.toFormat("h:mm a")}
            />
            <CardContent>
                <Typography variant="h5" color="text.primary">
                {className}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                {topic}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {
                    options.assignToMe?
                    <IconButton aria-label="Assign to Me">
                        <PersonAddIcon />
                    </IconButton>:
                    <></>
                }
                {
                    options.unassign?
                    <IconButton aria-label="Unassign myself">
                        <PersonRemoveIcon />
                    </IconButton>:
                    <></>
                }
                {
                    options.markComplete?
                    <IconButton aria-label="Mark complete">
                        <DoneIcon />
                    </IconButton>:
                    <></>
                }
            </CardActions>
        </Card>
    )
}