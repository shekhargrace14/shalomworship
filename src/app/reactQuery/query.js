import { useQuery } from "@tanstack/react-query";
import { songServerAction } from "../actions/song";
import { songById } from "../actions/songById";
import { songBySlug } from "../actions/songBySlug";
import { artists} from "../actions/artists";
import { artistBySlug } from "../actions/artistBySlug";
import { category } from "../actions/category";
import { categoryBySlug } from "../actions/categoryBySlug";
import { artistById } from "../actions/artistById";


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
  const res = await artists()
  return res;
}

const useGetArtists = () =>{
  return useQuery({
    queryKey : ["artists"],
    queryFn: async ()=> await artists(),
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

const fetchArtistById = (id) =>{
  const res = artistById(id)
  return res;

}
const useGetArtistById = (id) =>{
  return useQuery({
    queryKey:["artist", id],
    queryFn : async ()=> await artistById(id)
  })
}



// Category
const fetchCategory = async () =>{
  const res = await category()
  return res;
}

const useGetCategory = () =>{
  return useQuery({
    queryKey : ["category"],
    queryFn: category,
  })
}

const fetchCategoryBySlug = (categorySlug) =>{
  const res = categoryBySlug(categorySlug)
  return res;
}

const useGetCategoryBySlug = (categorySlug) =>{
  return useQuery({
    queryKey:["artist"],
    queryFn : async ()=> await categoryBySlug(categorySlug)
  })
}




export { 
  fetchSongById, fetchSongs, 
  fetchSongBySlug, useGetSongBySlug,
  useGetSongById, useGetSongs, 

  fetchArtists, useGetArtists, 
  fetchArtistBySlug, useGetArtistBySlug,
  fetchArtistById, useGetArtistById,

  fetchCategory, useGetCategory, fetchCategoryBySlug, useGetCategoryBySlug,
};