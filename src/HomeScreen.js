import React from "react";
import './HomeScreen.css';

import Banner from "./Banner";
import Row from "./Row";
import Nav from "./Nav";

import request from "./Request";

function HomeScreen() {
	return <div className="home-screen">
		<Nav />
		
		<Banner />

		<Row
			title="NETFLIX ORIGINALS"
			fetchUrl={request.fetchNetflixOriginals}
			isLargeRow
		/>

		<Row
			title="Trending Now"
			fetchUrl={request.fetchTrending}
			isLargeRow
		/>

		<Row
			title="Top Rated"
			fetchUrl={request.fetchTopRated}
			isLargeRow
		/>

		<Row
			title="Action Movies"
			fetchUrl={request.fetchActionMovies}
			isLargeRow
		/>

		<Row
			title="Comedy Movies"
			fetchUrl={request.fetchComedyMovies}
			isLargeRow
		/>

		<Row
			title="Horror Movies"
			fetchUrl={request.fetchHorrorMovies}
			isLargeRow
		/>

		<Row
			title="Romance Movies"
			fetchUrl={request.fetchRomanceMovies}
			isLargeRow
		/>

		<Row
			title="Documentaries"
			fetchUrl={request.fetchDocumentariesMovies}
			isLargeRow
		/>
	</div>
}

export default HomeScreen;