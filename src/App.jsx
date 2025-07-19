import Search from "./components/Search";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { updateSearchCount } from "./appwrite";

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

    const [debounceSearchTerm,setDebounceSearchTerm] = useState('')

    useDebounce(() => setDebounceSearchTerm(searchTerm),1000,[searchTerm])

    const fetchMovies = async (query='') => {

        setLoading(true)
        setErrorMessage('')

        try {

            const endpoint = query ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}`
            : `${API_URL}/discover/movie?sort_by=popularity.desc`
            const response = await fetch(endpoint,API_OPTIONS)

           if(!response.ok){
            
            throw new Error('Failed to fetch movies')

           }

           const data = await response.json()

           console.log(data);
           
        

           if(data.Response == 'False'){

            setErrorMessage(data.Error || 'Failed to fetch movies')
            setMovies([])
            return

           }

           setMovies(data.results || [])

           if(query && data.results.length > 0){
            await updateSearchCount(query,data.results[0])
           }
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
        fetchMovies(debounceSearchTerm)
    },[debounceSearchTerm])
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

                    <h2 className="mt-[40px]">All Movies</h2>
                    {loading ? (<Spinner/>) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movies.map((movie) => (
                                <MovieCard title={movie.title} poster_path={movie.poster_path} key={movie.id}
                                vote_average={movie.vote_average}
                                release_date={movie.release_date}
                                original_language={movie.original_language} />
                            ))}
                        </ul>
                    )} 
                   
                </section>
            </div>
        

        </main>
    )
}