import React, { useState, useEffect, useRef } from 'react';
import './Nav.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

function Nav() {
	const [idTimeOutActivedSearch, setIdTimeOutActivedSearch] = useState('');
	const [isActivatedSearch, setIsActivatedSearch] = useState(false);
	const [isClickedSearch, setIsClickedSearch] = useState(false);
	const [search, setSearch] = useState('');
	const inputSearch = useRef(null);

	const [show, handleShow] = useState(false);

	const transitionNavBar = () => {
		if (window.scrollY > 100) {
			handleShow(true);
		} else {
			handleShow(false);
		}
	};

	const handleSearch = (event) => {
		const { value } = event.target;
		setSearch(value);
	};

	const clearSearch = (event) => {
		inputSearch.current.value = "";
		inputSearch.current.focus();
		setSearch('');

		clearTimeout(idTimeOutActivedSearch);
	};
	

	const toogleActiveSearch = (event) => {
		if (!isClickedSearch) {			
			setIsClickedSearch(true);
	
			setTimeout(() => {
				inputSearch.current.focus();
				setIsActivatedSearch(true)
			}, 50);
		} else{
			const id = setTimeout(() => {
				setIsActivatedSearch(false);
		
				setTimeout(() => {
					setIsClickedSearch(false)
				}, 500);
			}, 100);
			setIdTimeOutActivedSearch(id);
		}
	};
	
	useEffect(() => {
		window.addEventListener("scroll", transitionNavBar);
		return () => window.removeEventListener("scroll", transitionNavBar);
	});

	return <div className={`nav ${show && "nav__black"}`}>
		<div className="nav__contents">
			<div className="nav__left-contents">
				<img
					className="nav__logo"
					src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo-5.png"
					alt="logo netflix"
				/>

				<ul className="nav__links">
					<li className="nav__link nav__link--active">
						<a href="#">Inicio</a>	
					</li>

					<li className="nav__link">
						<a href="#">Series</a>	
					</li>

					<li className="nav__link">
						<a href="#">Películas</a>	
					</li>

					<li className="nav__link">
						<a href="#">Novedades</a>	
					</li>

					<li className="nav__link">
						<a href="#">Mi Lista</a>	
					</li>
				</ul>
			</div>

			<div className="nav__right-contents">

				{
					isClickedSearch
					?	<div className={`nav__search ${isActivatedSearch && 'nav__search--active'}`}>
							<FontAwesomeIcon
								className="nav__search-icon"
								icon={faSearch}
								onClick={toogleActiveSearch}
							/>
							
							<input
								ref={inputSearch}
								className="nav__input"
								placeholder="Títulos, personas, géneros"
								onChange={handleSearch}
								onBlur={toogleActiveSearch}
								type="text"
							/>

							{search.length > 0 && (
								<FontAwesomeIcon
									className="nav__close-icon"
									icon={faTimes}
									onClick={clearSearch}
								/>
							)}
						</div>

					:	<div className="nav__search-inactive">
							<FontAwesomeIcon
								className="nav__search-icon"
								icon={faSearch}
								onClick={toogleActiveSearch}
							/>
						</div>
				}

				<img
					className="nav__avatar"
					src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
					alt="profile netflix"
				/>
			</div>
		</div>
	</div>
}

export default Nav;