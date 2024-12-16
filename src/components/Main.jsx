"use client";

import Artist from "./Artists";
import CircleCard from "./CircleCard"
import DisplayOne from "./DisplayOne";
import Search from "./Search"

const Main = () =>{
    return(
        <>
            <div className=" p-2  h-[90vh] overflow-y-auto custom-scrollbar ">
                {/* <Songpage /> */}
                <CircleCard/>
                <br/>
                <DisplayOne/>

            </div>
        </>
    )
}
export default Main