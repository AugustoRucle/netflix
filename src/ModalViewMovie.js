import React, { useState, useEffect } from 'react';

import { Modal, Button } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faPlus,
	faThumbsUp,
	faThumbsDown
} from '@fortawesome/free-solid-svg-icons';

import requests from './Request';
import axios from './axios';

import './ModalViewMovie.css';

function Tags (props) {
	const { label } = props;
	const limitItems = !props.limitItems
		?	props.items.length
		:	props.limitItems
	
	const items = props.items.splice(0, limitItems);
	console.log('limit items: ', limitItems);
	console.log('itesm');
	console.log(items);
	console.log('\n');



	return <div className="details-metadata-tags">
		<span className="details-metadata--tags-label">
			{label}:
		</span>
		
		{items.map((item, indice) => (
			<a
				className="details-metadata--tags-item"
				href="#">
				{item}{(indice !== items.length - 1) && ','}
			</a>
		))}
	</div>
}

function ModalViewMovie () {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const [similarMovie, setSimilarMovie] = useState([]);
	const [cast, setCast] = useState([]);
	const [movie, setMovie] = useState([]);

	useEffect(() => {
		const  fetchData = async () => {
			const route = requests.fetchMovie.replace('{movie_id}', 580489);
			const request = await axios.get(route);
			setMovie(request.data);
		}

		const fetchSimilarMovies = async () => {
			const route = requests.fetchSimilarMovies.replace('{movie_id}', 580489);
			const request = await axios.get(route);
			setSimilarMovie(request.data.results);
		}

		const fetchCast = async () => {
			const route = requests.fetchCreditsMovie.replace('{movie_id}', 580489);
			const request = await axios.get(route);
			setCast(request.data.cast);
		}

		fetchData();
		fetchSimilarMovies();
		fetchCast();
	}, []);

	const showModal = () => {
		setIsModalVisible(true);
	};
	
	const handleOk = () => {
		setIsModalVisible(false);
	};
	
	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const normalizeYearRelease = (release) => {
		return (release || '').substring(0, 4);
	}

	const normalizeRuntime = (runtime) => {
		const hours = (runtime / 60);
		const rhours = Math.floor(hours);

		const minutes = (hours - rhours) * 60;
		const rminutes =  Math.round(minutes);

		return `${rhours} h ${rminutes} min`;
	};

	console.log('cast');
	console.log(cast);

	return <>
		<Button type="primary" onClick={showModal}>
			Open Modal
		</Button>

      	<Modal
		  	className="modal-view-movie"
			centered
		  	visible={isModalVisible}
			width={900}
		>
			<div className="poster-container">
				<img
					className="poster__img"
					alt="poster"
					src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
				/>

				<div className="poster-options">
					<button className="poster-options__button">
						<FontAwesomeIcon icon={faPlay} />
						Reproducir
					</button>

					<button className="poster-options__button-icon">
						<FontAwesomeIcon icon={faPlus} />
					</button>

					<button className="poster-options__button-icon">
						<FontAwesomeIcon icon={faThumbsUp} />
					</button>

					<button className="poster-options__button-icon">
						<FontAwesomeIcon icon={faThumbsDown} />
					</button>
				</div>

				<div className="poster--fade-bottom" />
			</div>

			<div className="details-container">
				<div className="details-metadata">
					<div className="details-metadata-left">
						<div className="details-metadata-info">
							<span>{normalizeYearRelease(movie.release_date)}</span>
							<span>{normalizeRuntime(movie.runtime)}</span>
						</div>

						<div className="details-metadata-synopsis">
							{movie?.overview || ''}
						</div>
					</div>

					<div className="details-metadata-right">
						<Tags
							label="Elenco"
							items={cast.map(({ original_name }) => original_name) || []}
							limitItems={4}
						/>

						<Tags
							label="Géneros"
							items={movie.genres?.map(({ name }) => name) || []}
						/>

					</div>
				</div>
			</div>
      	</Modal>
	</>
}

export default ModalViewMovie;