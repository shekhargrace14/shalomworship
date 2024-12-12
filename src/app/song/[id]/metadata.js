// /app/song/[id]/metadata.js

export async function generateMetadata({ params }) {
    const res = await fetch(`https://shalomworship.vercel.app/api/song/${params.id}`);      
    const song = await res.json();
    console.log(song,"sooooooooooooooooooooooooooo")
  
    return {
      title: song.title,
      description: song.excerpt,
      openGraph: {
        title: song.title,
        description: song.excerpt,
        url: `https://www.shalomworship.com/blog/${song.seo.slug}`,
        images: [{ url: song.image }],
      },
    };
  }
  