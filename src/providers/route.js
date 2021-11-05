import { BrowserRouter, Routes, Route } from "react-router-dom";
import CurrentWork from "../currentWork/currentWork";
import InProgress from "../inProgress/inProgress";
import Queue from "../queue/queue";
import Menu from '../Header/Menu'
import Nav from "../Footer/Navigation";

export default function Router({...children}){
    return (
    <BrowserRouter>
        <Menu/>
        <Routes>
            <Route exact path="/" element={<Queue />} />
            <Route exact path="in-progress" element={<InProgress />} />
            <Route exact path="my-work" element={<CurrentWork />} />
        </Routes>
        <Nav/>
    </BrowserRouter>
    )
}