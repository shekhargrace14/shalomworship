import React from 'react';

const PageHero = ({ data, type }: any) => {
  return (
    <div
      className="flex items-end w-full h-60"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${data?.color}, transparent)`,
      }}
    >
      <div className="mt-30 max-w-7xl m-auto w-full h-fit px-4">
        <h1 className="sm:text-4xl text-4xl font-semibold mb-1 text-foreground">{data?.title} </h1>
        <p className="text-sm  text-foreground">{type}</p>
      </div>
    </div>
  );
};

export default PageHero;
