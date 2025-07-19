import Search from "./components/Search";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";

export default function App(){

    const API_URL = 'https://api.themoviedb.org/3'

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY

    const API_OPTIONS = {
        method:'GET',
        headers:{
            accept:'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    }

    const [searchTerm, setSearchTerm] = useState('')

    const [errorMessage,setErrorMessage] = useState(null)

    const [movies, setMovies] = useState([])

    const [loading,setLoading] = useState(false)

    const fetchMovies = async () => {
        setLoading(true)
        setErrorMessage('')
        try {

        
            const response = await fetch(`${API_URL}/discover/movie?sort_by=popularity.desc`,API_OPTIONS)

           if(!response.ok){
            
            throw new Error('Failed to fetch movies')

           }

           const data = await response.json()
        

           if(data.Response == 'False'){
            setErrorMessage(data.Error || 'Failed to fetch movies')
            setMovies([])
            return
           }

           setMovies(data.results || [])
        } 
        catch (error) {

            console.log(`Error when fetching movies : ${error}`)

            setErrorMessage('Error fetching movie please try later')
            
        }
        finally{
            setLoading(false)
        }   
        
    }


    useEffect(() => {
        fetchMovies()
    },[])
    return (
        <main>
            <div className="pattern" />

            <div className="wrapper">
                <header>

                    <img src="./hero-img.png" alt="Hero image" />
                    <h1>Find <span className="text-gradient">Movies</span> You’ll Love Without the Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                
                </header>

                <section className="all-movies">

                    <h2>All Movies</h2>
                    {loading ? (<Spinner/>) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movies.map((movie) => (
                                <li key={movie.id} className="text-white">
                                    {movie.title}
                                </li>
                            ))}
                        </ul>
                    )} 
                   
                </section>
            </div>
        

        </main>
    )
}