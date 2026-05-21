import React from "react";
import Event from "./Event";

type Event = {
  id: string;
  title: string;
  image: string;
};

const EventSection: React.FC<any> = ({number, event, type, isModal}) => {

  return (
    <>
      <section className="w-full my-2">
        <div className={`${isModal ? "grid  grid-cols-1" :   "grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2"} `}>
          {event?.slice(number)
            .reverse()
            .map((item: Event) => (
              <Event key={item.id} item={item} type={type} />
            ))}
        </div>
      </section>
    </>
  );
};

export default EventSection;
