import { HashRouter, Routes, Route } from "react-router-dom";
import CurrentWork from "../routes/currentWork";
import InProgress from "../routes/inProgress";
import Queue from "../routes/queue";
import Menu from '../header/Menu'
import Nav from "../footer/Navigation";

export default function Router(){
    return (
    <HashRouter>
        <Menu/>
        <Routes>
            <Route exact path="/" element={<Queue />} />
            <Route exact path="in-progress" element={<InProgress />} />
            <Route exact path="my-work" element={<CurrentWork />} />
        </Routes>
        <Nav/>
    </HashRouter>
    )
}