export default function formatArtists(artist:string[]):string{
    if(artist.length === 0) return "";
    if(artist.length === 1) return artist[0];
    return artist.slice(0, -1).join(", ") + " & " + artist[artist.length - 1];
}