import Search from './search'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

export default function Home({ data }) {
  let login = Cookies.get('isloggedin')
  let user = Cookies.get('user')
  let router = useRouter()
  console.log(user)

  const handleCart = () => {
    //router.query.user = user
    router.push(`/cart?user=${user}`)
  }

  const handleWishlist = () => {
    //router.query.user = user
    router.push(`/wishlist?user=${user}`)
  }

  // Adding product to cart
  const addToCart = async (e) => {
    let id = e.target.value
    let user_id = user
    e.preventDefault()
    const data = {
      id,
      user_id
    }
    const response = await fetch('http://localhost:3000/addToCart', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });
            const resJson = await response.json()
            console.log(resJson)
  
  }

  // Adding product to wishlist
  const addToWishlist = async (e) => {
    let id = e.target.value
    let user_id = user
    e.preventDefault()
    const data = {
      id,
      user_id
    }
    const response = await fetch('http://localhost:3000/addToWishlist', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });
            const resJson = await response.json()
            console.log(resJson)
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
      <button onClick={handleWishlist}>Wishlist</button>
      {data.map((item) => (
        <div key={item.id}>
          <ul>
            <li>{item.name}</li>
            <li>{item.category}</li>
            <li>{item.price}</li>
            <li>{item.gender}</li>
            <img src={item.image} height="180px" width="135px" />
          </ul>
          <button onClick={addToWishlist} value={item.id}>Add to Wishlist</button>
          <button onClick={addToCart} value={item.id}>Add to Cart</button>
        </div>
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
