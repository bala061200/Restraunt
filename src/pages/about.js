// pages/about.js


import { useRouter } from 'next/router';

const About = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div>
      <h1>About Page</h1>
      <button onClick={handleGoBack}>Go Back to Home</button>
    </div>
  );
};

export default About;
