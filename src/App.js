import './App.css';
import { useState} from 'react'
import Queue from './queue/queue';
import InProgress from './inProgress/inProgress';
import { useUser } from './providers/user';
import CurrentWork from './currentWork/currentWork';
import { useData } from './providers/data';
import Menu from './Header/Menu';
import Nav from './Footer/Navigation';

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
			<Menu/>
			<Nav/>
		</div>
	);
	}


	export default App;
