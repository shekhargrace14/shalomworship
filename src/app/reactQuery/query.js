import { useQuery } from "@tanstack/react-query";
import { songServerAction } from "../actions/song";
import { songById } from "../actions/songById";
import { songBySlug } from "../actions/songBySlug";
import { artistServerAction } from "../actions/artist";
import { artistBySlug } from "../actions/artistBySlug";


const fetchSongs = async () => {
  const res = await songServerAction();
  return res;
};


const useGetSongs = () => {
  return useQuery({
    queryKey: ["songs"],
    queryFn: songServerAction,
  });
};

// Song By Id

const fetchSongById = async (id) => {
  const res = await songById(id);
  return res;
};

const useGetSongById = (id) => {
  return useQuery({
    queryKey: ["songs", id],
    queryFn: async () => await songById(id),
  });
};

// Song By Slug

const fetchSongBySlug = async (songSlug) => {
  const res = await songBySlug(songSlug);
  return res;
};

const useGetSongBySlug = (songSlug) => {
  return useQuery({
    queryKey: ["songs", songSlug],
    queryFn: async () => await songBySlug(songSlug),
  });
};


// artist 
const fetchArtists = async () =>{
  const res = await artistServerAction()
  return res;
}

const useGetArtists = () =>{
  return useQuery({
    queryKey : ["artists"],
    queryFn: artistServerAction,
  })
}

const fetchArtistBySlug = (artistSlug) =>{
  const res = artistBySlug(artistSlug)
  return res;
}

const useGetArtistBySlug = (artistSlug) =>{
  return useQuery({
    queryKey:["artist"],
    queryFn : async ()=> await artistBySlug(artistSlug)
  })
}
// creator

export { 
  fetchSongById, fetchSongs, 
  fetchSongBySlug, useGetSongBySlug,
  useGetSongById, useGetSongs, 
  fetchArtists, useGetArtists, 
  fetchArtistBySlug, useGetArtistBySlug};