import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({ data }) {
  return (
    <div>
      {data.map((item) => (
        <ul>
          <li>{item.name}</li>
          <li>{item.category}</li>
          <li>{item.price}</li>
          <li>{item.gender}</li>
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
