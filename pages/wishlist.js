import { useRouter } from "next/router"

export default function Cart(data) {
    let router = useRouter()
    console.log(router.query.user)
    console.log(data.data)
    if(data){
        return(
            <div>
                <h1>Wishlist</h1>
                <div className="cart-container">
                    {data.data.map(item => (
                         <ul key={item.id}>
                         <li>{item.name}</li>
                         <li>{item.category}</li>
                         <li>{item.price}</li>
                         <li>{item.gender}</li>
                         <img src={item.image} height="180px" width="135px"/>
                       </ul>
                    ))}
                </div>
            </div>
        )
    }
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/wishlist?user=${context.query.user}`)
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
  