"use client";

import Banner from "./Banner";
import Category from "./Category";
import CircleCard from "./CircleCard"

const Main = () =>{
    return(
        <>
            <div className=" p-2  h-[90vh] overflow-y-auto custom-scrollbar ">
                {/* <Songpage /> */}
                <Banner/>
                {/* <Category/> */}
                <CircleCard/>
                <br/>
                {/* <DisplayOne/> */}

            </div>
        </>
    )
}
export default Main