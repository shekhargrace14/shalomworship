import HeroBanner from "@/app/assets/HeroBanner.jpg";
import Image from "next/image";

const Banner = () => {
  return (
    <>
      <section className="sm:min-h-[30vh] min-h-[30vh] relative z-0 bg-cover bg-no-repeat bg-bottom  rounded-lg overflow-hidden">
        {/* <section
          className="min-h-[30vh] bg-cover bg-no-repeat bg-bottom md:py-16 py-8 md:px-24 px-4 rounded-2xl mx-4"
          style={{ backgroundImage: `url('/HeroBanner.jpg')` }}
        ></section> */}
        <Image
          src={HeroBanner}
          alt="Hero Banner"
          layout="fill"
          objectFit="cover"
          quality={100} // Adjust quality as needed
          priority // Ensures image loads quickly
          className=""
        />
        <div className="absolute px-4 py-16">
        {/* <p className=" text-xl">Welcome to</p> */}

          <h1 className="text-6xl sm:text-6xl lg:text-8xl text h1-text-shadow"> Shalom Worship</h1>
          {/* <div></div> */}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </section>

      <br></br>

    </>
  );
};

export default Banner;
