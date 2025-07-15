import Link from "next/link";
import React from "react";

const CategoryCard = ({ category }: any) => {
  // console.log(category);

  return (
    <>
      <Link key={category.id} href={`/category/${category.slug}`}>
        <div className="category-card h-16 flex justify-between items-end hover:bg-[#1f1f1f] p-2 px-4 py-2 rounded-lg text-shadow-lg/30"   style={{
    backgroundImage: `linear-gradient(180deg, ${category?.color}, #00000080)`, // fallback to black or any second color
  }}>
          <h2 className="text-white text-lg">{category.name}</h2>
          {/* <p className=" text-sm text-white" >({category.song.length})</p> */}

        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
