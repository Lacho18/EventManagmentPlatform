//icons
import { FaUserCircle } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { LiaSaveSolid } from "react-icons/lia";
import { MdSkipPrevious } from "react-icons/md";

import "./NavigationHome.css";

export default function NavigationHome() {
    return(
        <div className="w-full h-20 flex text-2xl border-y-4 sticky top-0">
            <div className="basis-2/5 h-full flex justify-center items-center border-x-2">
                <FaUserCircle style={{fontSize: "3em", marginRight: "12px"}}/>
                <p>Ivan Ivanov</p>
            </div>
            <div className="basis-3/5 h-full buttons-nav">
                <button><IoChatbubbleEllipses className="mr-2 text-3xl" /> Chats</button>
                <button><LiaSaveSolid  className="mr-2 text-3xl"/> Saved</button>
                <button><MdSkipPrevious  className="mr-2 text-3xl"/> Passed</button>
            </div>
        </div>
    );
}