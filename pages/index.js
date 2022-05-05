import Search from './search'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

export default function Home({ data }) {
  let login = Cookies.get('isloggedin')
  let user = Cookies.get('user')
  let router = useRouter()
  console.log(user)

  const handleCart = () => {
    router.query.user = user
    router.push(`/cart?user=${user}`)
  }

  return (
    <div>
      <Search/>
      <button onClick={ () => router.push('/login') } style={{display: login ? 'none' : ''}}>Login</button>
      <button onClick={ () => router.push('/signup') } style={{display: login ? 'none' : ''}}>Signup</button>
      <button onClick={ () => {
                            Cookies.remove('user')
                            Cookies.remove('isloggedin')
                            router.push('/')
                            }} style={{display: login ? '' : 'none'}}>LOGOUT</button>
      <button onClick={handleCart}>Cart</button>
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
