import Link from 'next/link';

const Custom404 = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '3rem' }}>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">
        <a style={{ color: 'blue', textDecoration: 'underline' }}>Go back to Home</a>
      </Link>
    </div>
  );
};

export default Custom404;
