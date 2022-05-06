import { useState } from "react";
import { useRouter } from "next/router";

export default function Search({ data }) {

    const [search, setSearch] = useState('');

    const router = useRouter();

    // handle search input
    const handleInput = (e) => {
        setSearch(e.target.value)
    }

    // handle search button
    const handleSubmit = () => {
        router.query.search = search;
        router.push(`/search?search=${search}`);
    }


    if (!data) {
        return (
            <div>
                <div className="search-container">
                    <div className="search-box">
                        <input type="text" placeholder="Search for products" onChange={handleInput} />
                    </div>
                    <div className="search-button">
                        <button onClick={handleSubmit}>Search</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className="search-container">
                    <div className="search-box">
                        <input type="text" placeholder="Search for products" onChange={handleInput} />
                    </div>
                    <div className="search-button">
                        <button onClick={handleSubmit}>Search</button>
                    </div>
                </div>
                <div className="search-results">
                    {data.map((item) => (
                        <ul key={item.id}>
                            <li>{item.name}</li>
                            <li>{item.category}</li>
                            <li>{item.price}</li>
                            <li>{item.gender}</li>
                            <img src={item.image} height="180px" width="135px" />
                        </ul>
                    ))}
                </div>
            </div>
        )
    }
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/search?search=${context.query.search}`)
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