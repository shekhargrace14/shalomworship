"use client";
import React from "react";
import CategoryCard from "./CategoryCard";
import { fetchCategory, useGetCategory } from "@/app/reactQuery/query";
import { Link } from "lucide-react";

const CategorySection = ({number}) => {
  // const categories = fetchCategory()
  const categories = useGetCategory();
  // console.log(categories.data, "categories");

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
