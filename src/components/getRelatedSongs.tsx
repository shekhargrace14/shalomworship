// function getRelatedSongs(currentSong, allSongs) {
//   return allSongs
//     .filter(song => song.id !== currentSong.id)
//     .map(song => {
//       let score = 0;

//       if (song.category.includesAny(currentSong.category)) score += 40;
//       if (song.artist.includesAny(currentSong.artist)) score += 30;
//       if (song.language === currentSong.language) score += 15;
//       if (song.theme === currentSong.theme) score += 10;
//       if (song.album && song.album === currentSong.album) score += 10;

//       return { song, score };
//     })
//     .filter(item => item.score >= 25)     // important threshold
//     .sort((a, b) => b.score - a.score)
//     .slice(0, 20);                         // 10–20 ideal
// }
