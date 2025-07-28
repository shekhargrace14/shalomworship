import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

export default function Section({ title, data }: { title: string; data: any[] }) {
  if (!data.length) return null;
    const artists: { name: string }[] = [];
  const creators: { name: string }[] = [];
  
  return (
    <>
      {data.map((item, idx) => (
        // <Link href={`/song/${slug}-${item.id}`}> 
        <Link href={`/song/${slugify(`${item.title||item.name}`, { lower: true})}-${item.id}`}> 
        <div key={idx} className=" hover:bg-[#1f1f1f] p-2 rounded-lg flex gap-2">
          <div className="w-2/6 rounded-lg overflow-hidden">
            <Image
              src={item?.image}
              alt={"Song Image"}
              width={700}
              height={500}
            />
          </div>
          <div className="w-4/6 lg:w-full py-2">
            <div className="">
              <h3 className="line-clamp-1 text-1xl mb-1 text-white">{item.title || item.name}</h3>
              <p className=" line-clamp-1 text-sm leading-none text-white">{creators[0]?.name}</p>
            </div>
          </div>
        </div>
        </Link>
      ))}
    </>
  );
}
