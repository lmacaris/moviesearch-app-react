import { useState } from "react"

export const BuscadorPeliculas = () => {

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = 'c910542252b888953a769c97adc2904a'
    
    const [search, setSearch] = useState('')
    
    const [movies, setMovies] = useState([])
    
    const handleInputChange = (e) => {
        setSearch(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchMovies()
        console.log()
    }
    
    const fetchMovies = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${search}&api_key=${API_KEY}`)
            const data = await response.json()
            setMovies(data.results)
        } catch (error) {
            console.error('Ocurrio un error', error)
        }
    }
    
    return (
        <div className="container">
            <h1 className="title">Movie Searcher</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" 
                placeholder="Type a movie"
                value={search}
                onChange={handleInputChange}   
                />
                <button type="submit" className="searchButton">Search</button>
            </form>

            <div className="movie-list">
                {movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                </div>

                ))}

            </div>
        </div>
    )
}
