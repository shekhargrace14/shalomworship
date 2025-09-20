import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fetchSongs } from "@/lib/api/songs";

import type { Song } from "@/types";
import { Edit, Edit2 } from "lucide-react";
import Link from "next/link";


// This is a Next.js Server Component
const Page = async () => {
  const songs = await fetchSongs()
  console.log(songs)

  return (
    <div className=''>
      <Table>
        <TableCaption>A list of your songs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px]">#</TableHead>
            <TableHead className="w-[150px]">Title</TableHead>
            <TableHead>createdAt</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs && songs?.map((song: Song, i: any) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{song.title}</TableCell>
              <TableCell>{song.createdAt}</TableCell>
              <TableCell>{song.title}</TableCell>
              <TableCell>{song.title}</TableCell>
              <TableCell>
                <Link href={`/dashboard/song/${song._id}`}>
                  <Edit2 size={16} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Page;
