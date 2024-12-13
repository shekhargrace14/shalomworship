"use client";

import Artist from "./Artists";
import CircleCard from "./CircleCard"
import DisplayOne from "./DisplayOne";
import Search from "./Search"

const Main = () =>{
    return(
        <>
            <div className="min-h-full p-2">
                {/* <Songpage /> */}
                <CircleCard/>
                <br/>
                <br/>
                <br/>
                <br/>
                <DisplayOne/>

            </div>
        </>
    )
}
export default Main