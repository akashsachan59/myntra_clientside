import { useRouter } from "next/router"

export default function Cart(data) {
    let router = useRouter()
    console.log(router.query.user)
    console.log(data.data)
    
    // handle remove from cart
    const remove = async (e) => {
        e.preventDefault()
        let id = e.target.value
        let user_id = router.query.user
        const data = {
            id,
            user_id
        }
        const response = await fetch('http://localhost:3000/deleteCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resJson = await response.json()
        console.log(resJson)
        if (resJson.res) {
            router.push(`/cart?user=${user_id}`)
        }
    }

    // handle move to wishlist
    const moveToWishlist = async (e) => {
        e.preventDefault()
        let id = e.target.value
        let user_id = router.query.user
        const data = {
            id,
            user_id
        }
        const responseDel = await fetch('http://localhost:3000/deleteCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resDel = await responseDel.json()
        console.log(resDel)
        const responseAdd = await fetch('http://localhost:3000/addToWishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resAdd = await responseAdd.json()
        console.log(resAdd)
        if (resAdd.res) {
            router.push(`/cart?user=${user_id}`)
        }

    }
    
    if(data){
        return(
            <div>
                <h1>CART</h1>
                <div className="cart-container">
                    {data.data.map(item => (
                        <div key={item.id}>
                            <ul>
                                <li>{item.name}</li>
                                <li>{item.category}</li>
                                <li>{item.price}</li>
                                <li>{item.gender}</li>
                                <li>{item.id}</li>
                                <img src={item.image} height="180px" width="135px" />
                            </ul>
                            <button onClick={remove} value={item.id}>delete from Cart</button>
                            <button onClick={moveToWishlist} value={item.id}>Move to Wishlist</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/cart?user=${context.query.user}`)
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
  