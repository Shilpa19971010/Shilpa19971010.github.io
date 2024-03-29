import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../axios.js'
import '../row.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")
    /* A snipet of code which runs based on a specific condition/variable */

    useEffect(() => {
        // const abc = axios.get(fetchUrl);
        // console.log(abc);

        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            // console.log(request);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            //https://developers.google.com/youtube/player_parameters,
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            let movieName = movie?.name || movie?.title || movie?.original_title || "";
            movieTrailer(movieName)
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get('v'))
                }).catch((error) => console.log(error))
        }
    }
    return (
        <div className="row">
            <h1>{title}</h1>
            <div className="row_posters">
                {movies.map((movie) => (
                    <img key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                            }`}
                        alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            {/* container -> posters */}
        </div>
    )
}

export default Row