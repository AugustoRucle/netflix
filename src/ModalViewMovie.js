import React, { useState, useEffect } from 'react';

import { Modal, Button, Typography } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faPlus,
	faThumbsUp,
	faThumbsDown,
	faPlusCircle,
	faMinusCircle,
	faPlayCircle,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';

import {
	isEmptyArray,
	normalizeYearRelease,
	normalizeRuntime,
	truncate
} from './utils/functions';
import requests from './Request';
import axios from './axios';

import './ModalViewMovie.css';

const { Text, Link} = Typography;

function normalizeTags(tags, label) {
	return tags.map((tag) => tag[label]);
}

function TagContent(props) {
	const {
		label = '',
		className = '',
		onClick = () => { },
		href = ""
	} = props;

	return <a
		className={`details-metadata--tags-item ${className}`}
		href={href}
		onClick={onClick}
	>
		{label}
	</a>
}

function Tag(props) {
	const { label, children } = props;
	return <div className="details-metadata-tags">
		<span className="details-metadata--tags-label">
			{label}:
		</span>

		{children}
	</div>
}

function TagsCast(props) {
	const { cast } = props;
	if (isEmptyArray(cast)) {
		return null;
	}

	const items = normalizeTags(cast, 'original_name').splice(0, 5);

	return <Tag label="Elenco">
		{items.map((item) => {
			return <TagContent
				label={`${item}, `}
				href="#"
			/>
		})}

		<TagContent
			className="font-italic"
			label="más"
			href="#"
		/>
	</Tag>
}

function TagsGenres(props) {
	const { genres } = props;
	if (isEmptyArray(genres)) {
		return null;
	}

	const items = normalizeTags(genres, 'name');

	return <Tag label="Géneros">
		{items.map((item, indice) => {
			const label = `${item}${(indice !== items.length - 1) ? ',' : ''}`;
			return <TagContent
				label={label}
				href="#"
			/>
		})}
	</Tag>
}

function ModalViewMovie() {
	const [modalVisible, setModalVisible] = useState(false);
	const [moreDetails, setMoreDetails] = useState(false);

	const [similarMovies, setSimilarMovies] = useState([]);
	const [cast, setCast] = useState([]);
	const [movie, setMovie] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const route = requests.fetchMovie.replace('{movie_id}', 580489);
			const request = await axios.get(route);
			setMovie(request.data);
		}

		const fetchSimilarMovies = async () => {
			const route = requests.fetchSimilarMovies.replace('{movie_id}', 580489);
			const request = await axios.get(route);
			setSimilarMovies(request.data.results);
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
		setModalVisible(true);
	};

	const handleOk = () => {
		setModalVisible(false);
	};

	const handleClose = () => {
		setModalVisible(false);
	};

	const handleMoreDetails = () => {
		setMoreDetails(!moreDetails);
	};

	return <>
		<Button type="primary" onClick={showModal}>
			Open Modal
		</Button>

		<Modal
			closable={false}
			className="modal-view-movie"
			centered
			visible={modalVisible}
			width={900}
			onCancel={handleClose}
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

				<div
					className="poster-options__button-close"
					onClick={handleClose}
				>
					<FontAwesomeIcon icon={faTimes} />
				</div>

				<div className="poster--fade-bottom" />
			</div>

			<div className="details-container">
				{/* ---- INIT DETAILS METADATA ---- */}
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
						<TagsCast cast={cast} />

						<TagsGenres genres={movie.genres} />
					</div>
				</div>
				{/* ---- END DETAILS METADATA ---- */}

				{/* ---- INIT SIMILAR MOVIES ---- */}
				<div className="details-similar-movies">
					{similarMovies.map((movie) => (
						<div className="details-movie">
							<div className="details-movie-container-poster">
								<img
									className="details-movie-poster"
									src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
								/>
								
								<FontAwesomeIcon
									className="details-movie-container-poster--play"
									icon={faPlayCircle}
								/>

								<div className="details-movie-container-mask--play" />
							</div>

							<div className="details-movie-details">
								
								<div className="detail-movie-metadata">
									<Typography className="detail-movie-release-date">
										{normalizeYearRelease(movie?.release_date || '')}
									</Typography>

									{ moreDetails
										?	<FontAwesomeIcon
												className="detail-movie-add-list"
												icon={faMinusCircle}
												onClick={handleMoreDetails}
											/>

										:	<FontAwesomeIcon
												className="detail-movie-add-list"
												icon={faPlusCircle}
												onClick={handleMoreDetails}
											/>
									}
								</div>

								<Typography className="detail-movie-overview">
									{truncate(movie?.overview || '', 100)}
								</Typography>

								{movie?.overview && (
									<Link
										className="detail-movie-more-overview"
										href="https://ant.design"
										target="_blank"
									>
										Más información
									</Link>
								)}
							</div>
						</div>
					))}
				</div>
				{/* ---- END SIMILAR MOVIES ---- */}
			</div>
		</Modal>
	</>
}

export default ModalViewMovie;