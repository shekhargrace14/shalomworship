import { useQuery } from "@tanstack/react-query";
import { songs } from "../actions/song";
import { songById } from "../actions/songById";
import { songBySlug } from "../actions/songBySlug";
import { artists } from "../actions/artists";
import { artistBySlug } from "../actions/artistBySlug";
import { artistById } from "../actions/artistById";
import { category } from "../actions/category";
import { categoryBySlug } from "../actions/categoryBySlug";
import { season } from "../actions/season";


const fetchSongs = async () => {
  const res = await songs();
  return res;
};


const useGetSongs = () => {
  return useQuery({
    queryKey: ["songs"],
    queryFn: async () => await songs(),
  });
};

// Song By Id

const fetchSongById = async (id:string) => {
  const res = await songById(id);
  return res;
};

const useGetSongById = (id:string) => {
  return useQuery({
    queryKey: ["songs", id],
    queryFn: async () => await songById(id),
  });
};

// Song By Slug

const fetchSongBySlug = async (songSlug:string) => {
  const res = await songBySlug(songSlug);
  return res;
};

const useGetSongBySlug = (songSlug:string) => {
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

const fetchArtistBySlug = (artistSlug:string) =>{
  const res = artistBySlug(artistSlug)
  return res;
}

const useGetArtistBySlug = (artistSlug:string) =>{
  return useQuery({
    queryKey:["artist"],
    queryFn : async ()=> await artistBySlug(artistSlug)
  })
}

const fetchArtistById = (id:string) =>{
  const res = artistById(id)
  return res;

}
const useGetArtistById = (id:string) =>{
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

const fetchCategoryBySlug = (categorySlug:string) =>{
  const res = categoryBySlug(categorySlug)
  return res;
}

const useGetCategoryBySlug = (categorySlug:string) =>{
  return useQuery({
    queryKey:["artist"],
    queryFn : async ()=> await categoryBySlug(categorySlug)
  })
}

// ------------------------- season ----------------------------

export const fetchSeason = async () =>{
  const res = await season()
  return res;
}

export const useGetSeason = () =>{
  return useQuery({
    queryKey:["season"],
    queryFn: season,
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