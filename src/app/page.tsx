import type { NextPage } from 'next';
import Head from 'next/head';
import CompanyDescription from '../components/CompanyDescription';
import ProductList from '../components/ProductList';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Company Profile</title>
        <meta name="description" content="Company Profile Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <CompanyDescription />
        <ProductList />
      </main>
    </div>
  );
};

export default Home;
