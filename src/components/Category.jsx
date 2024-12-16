import { DataContext } from "@/app/context/DataContext";
import Link from "next/link";

import { useContext } from "react";

const Category=()=>{
    const {songData} = useContext(DataContext)
    // console.log(songData)


    let allcat = [];
    songData.forEach(element => {
        element.category.forEach(cat => { // Loop through each category in the array
            if (!allcat.includes(cat)) {
                console.log("Adding unique category:", cat);
                allcat.push(cat);
            } else {
                console.log("Duplicate category:", cat);
            }
        });
    });
    console.log("Final unique categories:", allcat);


    
    return(
        <>
            <h2>Category</h2>
            <ul>

                {allcat.map((item)=>(
                    // <Link href={`/song/${item.tile}`} key={item.id}>
                        <li key={item.id} className=" rounded-lg hover:bg-gradient-to-l from-[#121212] to-[#000000]">{item}</li>
                    // </Link>

                ))}
            </ul>

        </>
    )
}
export default Category;