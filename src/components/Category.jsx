
import { useGetCategory } from "@/app/reactQuery/query";
import Link from "next/link";


const Category=()=>{
    // const categories = useGetCategory()

    // console.log(categories.data,"categories log")

    // let allcat = [];
    // songData.forEach(element => {
    //     element.category.forEach(cat => { // Loop through each category in the array
    //         if (!allcat.includes(cat)) {
    //             console.log("Adding unique category:", cat);
    //             allcat.push(cat);
    //         } else {
    //             console.log("Duplicate category:", cat);
    //         }
    //     });
    // });
    // console.log("Final unique categories:", allcat);


    
    return(
        <>
            <h2>Category</h2>
            <ul>

                {categories.data?.map((item)=>(
                    <Link href={`/song/${item.name}`} key={item.id}>
                        <li key={item.id} className=" rounded-lg hover:bg-gradient-to-l from-[#121212] to-[#000000]">{item.name}</li>
                    </Link>
                ))}
            </ul>

        </>
    )
}
export default Category;