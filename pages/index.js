import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Search from './search'

export default function Home({ data }) {

  return (
    <div>
      <Search/>
      {data.map((item) => (
        <ul key={item.id}>
          <li>{item.name}</li>
          <li>{item.category}</li>
          <li>{item.price}</li>
          <li>{item.gender}</li>
          <img src={item.image} height="180px" width="135px"/>
        </ul>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`http://localhost:3000/home`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }
  }
}
