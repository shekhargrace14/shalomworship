import React from "react";
import CategoryCard from "./CategoryCard";

type Category = {
  id: string;
  title: string;
  image: string;
};
const CategorySection: React.FC<any> = ({number, categories,}) => {

  return (
    <div className="py-2">
      <section className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 rounded-lg">
        {categories?.slice(number).reverse().map((category: Category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </section>
    </div>
  );
};

export default CategorySection;
