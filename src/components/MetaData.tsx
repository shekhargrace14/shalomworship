
export const MetaData = ({type, title, keyword, metaDescription, slug, image }: any) => {

  if (!title) {
    return {
      title: "Page Not Found",
      description: "The requested song could not be found.",
    };
  }

  // Prepare keywords if they exist
  const Keywords = keyword?.join(", ") || "";

  // Return the metadata object
  return {
    title: title || "Untitled Song",
    description: metaDescription || "No description available",
    keywords: Keywords, // Reuse the 'keywords' variable
    robots:
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    alternates: {
        canonical: `https://www.shalomworship.com/${type}/${encodeURIComponent(
          slug
        )}`,
    },
    openGraph: {
      title: title,
      description: metaDescription || "No description available",
      url: `https://www.shalomworship.com/${type}/${encodeURIComponent(
        slug
      )}`,
      images: [{ url: image || "/default-image.jpg" }],
    },
  };
}
