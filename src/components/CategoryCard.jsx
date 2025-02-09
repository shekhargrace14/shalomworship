import Link from "next/link";
import React from "react";

const CategoryCard = ({ category }) => {
  console.log(category);

  return (
    <>
          <Link key={category.id} href={`/category/${category.slug}`}>
        <div className="category-card flex justify-between hover:bg-[#1f1f1f] bg-black p-2 px-4 py-2 rounded-lg">
            <h2>{category.name}</h2>
            <p className=" text-sm">({category.song.length})</p>

        </div>
          </Link>
    </>
  );
};

export default CategoryCard;
