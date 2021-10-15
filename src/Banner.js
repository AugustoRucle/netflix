import React, {  useState, useEffect } from 'react';
import './Banner.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import requests from './Request';
import axios from './axios';

function Banner () {
	const [movie, setMovie] = useState([]);
	
	useEffect(() => {
		async function fetchData() {
			let validMovie = false;
			do {
				const request = await axios.get(requests.fetchNetflixOriginals);
				const { results } = request.data;
				const randomResult = (Math.random() * results.length - 1).toFixed(0);

				if (results[randomResult]) {
					setMovie(results[randomResult]);
					validMovie = true;
				} else {
					validMovie = false;
				}
			} while(!validMovie)
		}

		fetchData();
	}, []);
	
	function truncate(string, n) {
		return string?.length > n ? string.substr(0, n - 1) + '...' : string;
	}

	return <div
		className="banner"
		style={{
			backgroundSize: "cover",
			backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
			backgroundPosition: "center center"
		}}
	>
		<div className="banner__contents">
			<h1 className="banner__title">
				{ movie?.title || movie?.name || movie?.original_name }
			</h1>

			<div className="banner__buttons">
				<h1 className="banner__description">
					{ truncate(movie?.overview , 150) }
				</h1>
				
				<button className="banner__button banner__button---active">
					<FontAwesomeIcon
						className="banner__button-icon"
						icon={faPlay}
					/>

					Reproducir
				</button>

				<button className="banner__button">
					<FontAwesomeIcon
						className="banner__button-icon"
						icon={faInfoCircle}
					/>

					Más información
				</button>

			</div>

		</div>

		<div className="banner--fade-bottom" />
	</div>
}	

export default Banner;