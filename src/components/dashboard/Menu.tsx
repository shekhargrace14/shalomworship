import Link from 'next/link'
import React from 'react'

const nav = [
  { "name": "Song", "path": "/dashboard/song" },
  { "name": "Artist", "path": "/dashboard/artist" },
  { "name": "Category", "path": "/dashboard/category" },
  { "name": "SongGenre", "path": "/dashboard/song-genre" },
  { "name": "SongScripture", "path": "/dashboard/song-scripture" },
  { "name": "SongSeason", "path": "/dashboard/song-season" },
  { "name": "Album", "path": "/dashboard/album" },
  { "name": "Author", "path": "/dashboard/author" },
  { "name": "Genre", "path": "/dashboard/genre" },
  { "name": "Scripture", "path": "/dashboard/scripture" },
  { "name": "Season", "path": "/dashboard/season" },
]


const Menu = () => {
  return (
    <ul>
      {nav.map((item, i) => (
        <Link href={item.path}  key={i}>
        <li>{item.name}</li>
        </Link>
      ))}
    </ul>
  )
}

export default Menu