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
    <div>
      <section className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 rounded-lg">
        {categories.data?.slice(number).map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </section>
    </div>
  );
};

export default CategorySection;
