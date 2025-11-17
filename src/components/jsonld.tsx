export default function Head() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shalom Worship (TEST)",
    url: "https://shalomworship.com/test",
    description: "This is a static JSON-LD test to check if <head> renders correctly."
  };

  return (
    <>
      <title>Static Test Title</title>
      <meta name="description" content="Static test meta description" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }}
      />
    </>
  );
}
