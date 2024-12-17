"use server";
import prisma from "@/lib/prisma";

const fetchServerSongs = async () => {
  try {
    const data = await prisma.song.findMany();
    return { result: data, success: true };
  } catch {
    return { success: false, error: "Failed to fetch data" };
  }
};

const fetchServerSongById = async (id) => {
  try {
    const data = await prisma.song.findFirst({ where: { id } });
    if (!data) return { success: false, error: "Song not found" };
    console.log(data);
    return { result: data, success: true };
  } catch (error) {
    return { success: false, error: "Failed to fetch data" };
  }
};

export { fetchServerSongById, fetchServerSongs };
