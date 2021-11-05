	import './App.css';
	import { useState} from 'react'
	import Queue from './queue/queue';
	import InProgress from './inProgress/inProgress';
	import { useUser } from './providers/user';
	import { BottomNavigation, BottomNavigationAction } from '@mui/material';
	import ListIcon from '@mui/icons-material/List'
	import WorkIcon from '@mui/icons-material/Work'
	import AccessTimeIcon from '@mui/icons-material/AccessTime'
	import CurrentWork from './currentWork/currentWork';
import { useData } from './providers/data';

	function App() {
	
	const [label, setLabel] = useState(1)
	const user = useUser();
	const {current, itemsInQueue, itemsInProgress} = useData();

	/**
	 *  Sign out the user upon button click.
	 */
	const handleSignoutClick = (event) => {
		window.gapi.auth2.getAuthInstance().signOut();
	}
	
	
	return (
			<div className="container">
				{
				user &&
				<>
					<div className="container">
					{label===0 && <CurrentWork item={current}/>}
					{label===1 && <Queue items={itemsInQueue}/>}
					{label === 2 && <InProgress items={itemsInProgress}/>}
					<button className='btn-primary' onClick={handleSignoutClick}>Log Out</button>
					</div>
					<footer>
					<BottomNavigation
						showLabels
						value={label}
						onChange={(event, label) => {
						setLabel(label);
						}}
					>
						<BottomNavigationAction label="My Work" icon={<WorkIcon />} />
						<BottomNavigationAction label="Queue" icon={<ListIcon />} />
						<BottomNavigationAction label="In Progress" icon={<AccessTimeIcon />} />
					</BottomNavigation>
					</footer>
				</>
				}
			</div>
	);
	}


	export default App;
