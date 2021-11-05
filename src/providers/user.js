// the UserProvider in user-context.js is basically:
// const UserProvider = props => (
//   <UserContext.Provider value={useAuth().data.user} {...props} />
// )
// and the useUser hook is basically this:

import { createContext, useContext } from "react";
import { useAuth } from "./auth";

// const useUser = () => React.useContext(UserContext)
const UserContext = createContext();
export default function UserProvider(props){
    return <UserContext.Provider value={useAuth().user} {...props}/>
}

const useUser = () => useContext(UserContext);

export {UserContext, useUser}