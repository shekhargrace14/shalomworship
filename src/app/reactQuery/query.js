import { useQuery } from "@tanstack/react-query";
import { songServerAction } from "../actions/song";
import { songbyidServerAction } from "../actions/songbyid";
import { artistServerAction } from "../actions/artist";
import { categorySeverAction } from "../actions/category";
import { artistByIdServerAction } from "../actions/artistById";


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
const fetchSongById = async (id) => {
  const res = await songbyidServerAction(id);
  return res;
};


const useGetSongById = (id) => {
  return useQuery({
    queryKey: ["songs", id],
    queryFn: async () => await songbyidServerAction(id),
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

const fetchArtistById = (id) =>{
  const res = artistByIdServerAction(id)
  return res;
}

const useGetArtistById = (id) =>{
  return useQuery({
    queryKey:["artist"],
    queryFn : async ()=> await artistByIdServerAction(id)
  })
}
// creator
// category

const fetchCategories = async () =>{
  const res = await categorySeverAction()
  return res;
}
const useGetCategories = () =>{
  return useQuery({
    queryKey : ["categories"],
    queryFn : categorySeverAction,
  })
}



export { fetchSongById, fetchSongs, useGetSongById, useGetSongs, fetchArtists, useGetArtists, fetchCategories, useGetCategories, fetchArtistById, useGetArtistById};