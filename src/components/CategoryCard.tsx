import Link from "next/link";
import React from "react";

const CategoryCard = ({ category }: any) => {

  return (
    <>
      <Link key={category.id} href={`/category/${category.slug}`}>
        <div className="category-card h-16 flex justify-between items-end bg-card hover:bg-[#1f1f1f] px-3 py-2 rounded-lg text-shadow-lg/30 overflow-hidden" style={{
          backgroundImage: `linear-gradient(180deg, ${category?.color}, #00000030)`, // fallback to black or any second color
        }}>
          <h2 className="text-foreground text-base">{category.title}</h2>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
