import { useContext,createContext, useState, useEffect } from "react"
const AuthContext = createContext()

const loadScript = (source, onload) => {
    //loads the Google JavaScript Library
    (function () {
      const id = 'google-js';
  
      //we have at least one script (React)
      const firstJs = document.getElementsByTagName('script')[0];
      
      //prevent script from loading twice
      if (document.getElementById(id)) { return; }
      const js = document.createElement('script'); 
      js.id = id;
      js.src = source;
      js.onload = onload; 
      firstJs.parentNode.insertBefore(js, firstJs);
    }());
}

const loadGoogleScript = () => {
    loadScript('https://apis.google.com/js/api.js', window.onGoogleScriptLoad);
}

const CLIENT_ID = '204563014780-78k7jldehlpht8unvftib66p6dkht79q.apps.googleusercontent.com';
//const clientSecret = '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';
const API_KEY = 'AIzaSyAkzOZf_4FlNTobVNvboqg7lEhXkRBuiKs';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/drive";

export default function AuthProvider(props){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
    const initClient = () => {
        window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
        }).then(() => {
        // Listen for sign-in state changes.
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        setLoading(false);
        });
    }

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    function updateSigninStatus(isSignedIn) {
        if(isSignedIn){
            var auth2 = window.gapi.auth2.getAuthInstance();
            var profile = auth2.currentUser.get().getBasicProfile()
            setUser(profile);
        }else{
            setUser(null);
        }
    }
  
  
    useEffect(() => {
        //window.gapi is available at this point
        window.onGoogleScriptLoad = () => {
            window.gapi.load('client:auth2', initClient);
        }
        
        //ensure everything is set before loading the script
        loadGoogleScript();
        
    }, []);

    /**
     *  Sign in the user upon button click.
     */
    const handleAuthClick = (event) => {
        window.gapi.auth2.getAuthInstance().signIn();
    }

    // 🚨 this is the important bit.
    // Normally your provider components render the context provider with a value.
    // But we post-pone rendering any of the children until after we've determined
    // whether or not we have a user token and if we do, then we render a spinner
    // while we go retrieve that user's information.
    if (loading) {
        return <p>Loading</p>
    }else if(!user){
        return <button onClick={handleAuthClick}>Sign In</button>
    }

    // note, I'm not bothering to optimize this `value` with React.useMemo here
    // because this is the top-most component rendered in our app and it will very
    // rarely re-render/cause a performance problem.
    return (
        <AuthContext.Provider value={{user, logout: ()=>setUser(null)}} {...props} />
    )
}

const useAuth = () => useContext(AuthContext)

export {AuthProvider, useAuth}