import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import Link from "next/link";
import slugify from "slugify";

type CardVariant =
    | "imageTop"
    | "imageLeft"
    | "imageOnly"
    | "compact";

interface CardProps {
    id?: string;
    title?: string;
    artist?: string;
    image?: string | null;
    item?: any;
    variant?: CardVariant;
    className?: string;
    language?: string | null;
    slug?: string;
}
const cardVariants = {
    imageTop: "flex flex-col",
    imageLeft: "flex flex-row items-center ",
    imageOnly: "p-0",
    compact: "flex items-center gap-3 p-2 hover:bg-muted cursor-pointer",
};

const imageVariants = {
    imageTop: "h-full w-full",
    imageLeft: "max-h-20 max-w-20 rounded-lg",
    imageOnly: "h-full w-full",
    compact: "hidden",
};

export function Mastercard({
    id,
    item,
    title,
    image,
    variant = "imageTop",
    className,
    language,
    slug: songSlug,
}: CardProps) {

    const artists: { title: string; image?: string }[] = [];
    const creators: { title: string; image?: string }[] = [];
    item?.artist?.forEach((item: { isCreator: boolean; artist: { title: string; image?: string } }) => {
        if (item.isCreator) {
            creators.push(item.artist);
        } else {
            artists.push(item.artist);
        }
    });
    const slug = slugify(`${songSlug}`, { lower: true });

    return (
        <>
            <Link href={`/song/${slug}-${id}`}>

                <div className={cn(" overflow-hidden rounded-xl bg-card text-card-foreground",
                    cardVariants[variant],
                    className
                )}
                >
                    {image && variant !== "compact" && (
                        <img
                            src={image}
                            alt={title ?? ""}
                            className={cn(
                                "object-cover",
                                imageVariants[variant]
                            )}
                        />
                    )}

                    {variant !== "imageOnly" && (
                        <div className="w-full flex items-start justify-between gap-2 p-2 pb-3">
                            <div className="flex flex-col gap-2 ">
                                <h3 className="text-base sm:text-base font-semibold leading-tight line-clamp-1 text-md text-foreground ">{title}</h3>
                                <p className="text-xs leading-none text-muted-foreground">{creators[0]?.title}</p>
                            </div>
                            {/* <Badge variant="secondary">{language}</Badge> */}
                        </div>
                    )}
                </div>
            </Link>
        </>

    );
}
