import Head from 'next/head'
import { useEffect } from 'react';
import api from '../api';

export default function Home() {
  useEffect(() => {
    api.get('/api/devices').then(console.log).catch(console.log)
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
//todo: after authentication should check if the user is authedicated or not
// export async function getServerSideProps({ res, params }) {
//   try {
//     const response = await api.get('/api/devices');
//     console.log(response);
//     return { props: {} }
//   } catch (error) {
//     console.log(error);
//   }
//   // res.statusCode = 307
//   // res.setHeader('Location', `/login`)
//   return { props: {} }
// }
