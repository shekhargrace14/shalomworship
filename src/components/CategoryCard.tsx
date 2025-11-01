import Link from "next/link";
import React from "react";

const CategoryCard = ({ category }: any) => {
  // console.log(category.song.length, "category section");

  return (
    <>
      <Link key={category.id} href={`/category/${category.slug}`}>
        <div className="category-card h-16 flex justify-between items-end hover:bg-[#1f1f1f] px-2 py-2 rounded-lg text-shadow-lg/30 overflow-hidden" style={{
          backgroundImage: `linear-gradient(180deg, ${category?.color}, #00000080)`, // fallback to black or any second color
        }}>
          <h2 className="text-white text-base">{category.title}</h2>
          <h2 className="text-white text-sm">{category.song.length}</h2>

        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
