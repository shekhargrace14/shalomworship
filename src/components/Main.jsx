"use client";

import Artist from "./Artists";
import Banner from "./Banner";
import CircleCard from "./CircleCard"
import DisplayOne from "./DisplayOne";
import Search from "./Search"

const Main = () =>{
    return(
        <>
            <div className=" p-2  h-[90vh] overflow-y-auto custom-scrollbar ">
                {/* <Songpage /> */}
                <Banner/>
                <CircleCard/>
                <br/>
                {/* <DisplayOne/> */}

            </div>
        </>
    )
}
export default Main