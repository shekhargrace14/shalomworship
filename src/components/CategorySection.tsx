"use client";
import React from "react";
import CategoryCard from "./CategoryCard";
import { useGetCategory } from "@/lib/query/query";

const CategorySection: React.FC<any> = ({number}) => {
  const categories = useGetCategory();

  return (
    <div className="py-2">
      <section className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 rounded-lg">
        {categories.data?.slice(number).map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </section>
    </div>
  );
};

export default CategorySection;
