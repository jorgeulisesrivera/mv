import PageLoader from '../components/PageLoader';
import PageInit from '../components/PageInit';
import dynamic from 'next/dynamic';

// const HomePage = dynamic(() => import('../modules/Pages/HomePage'), {
//   loading: () => <PageLoader />,
// })

const HomePage = dynamic(() => import('../modules/pages/HomePage'))

const Home = () => {
  return (<PageInit><HomePage/></PageInit>)
}

export default Home;
