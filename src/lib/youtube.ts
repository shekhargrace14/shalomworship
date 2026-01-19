// lib/youtube.js
export async function getYouTubeMetadata(videoId:any) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${API_KEY}`;

            //    https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=xs4tIjv7xBc&key=AIzaSyBirmB6E6maBw5BzYnYuGV9H_-uqsbASCg

  const res = await fetch(url);
  const data = await res.json();
//   console.log(data, "getYouTubeMetadata data")


  if (data.items && data.items.length > 0) {
    const video = data.items[0];
    return {
      duration: video.contentDetails.duration || null, // Returns "PT5M4S" automatically!
      viewCount: video.statistics.viewCount || null,
      uploadDate: video.snippet?.publishedAt || null 
    };
  }
  return null;
}