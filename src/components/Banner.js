import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../axios.js'
import requests from '../requests'
import '../Banner.css'

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            console.log(request)
            // console.log(Math.floor(Math.random() * request.data.results.length - 1));
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ])
            return request;
        }
        fetchData();
    }, [])

    // console.log(movie)
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    return (
        <div>
            <header className="banner" style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path || "/bUvjG6y10ITnLPwzWfSDKH9ZntK.jpg"}")`,
                backgroundPosition: 'center center'
            }}>
                <div className="banner_contents">
                    <h1 className="banner_title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                    <div className="banner_buttons">
                        <button className="banner_button">Play</button>
                        <button className="banner_button">My List</button>
                    </div>
                    <h1 className="banner_description">
                        {truncate(movie?.overview, 150)}
                    </h1>
                </div>

                <div className='banner_fadeBottom'></div>
            </header>
            {/* {header > backgroundImage} */}
            {/* {title} */}
            {/* {div> 2 buttons} */}
            {/* {description} */}
        </div>
    )
}

export default Banner