export function buildSongMetadata(song: {
  title: string;
  slug: string;
}) {
  return {
    title: song.title,
    description: `Lyrics and chords of ${song.title}`,
  };
}