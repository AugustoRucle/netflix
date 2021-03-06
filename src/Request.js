const API_KEY = "31e67d9f3299abb28e2f984d64275a3b";

const request = {
	fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
	fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=213`,
	fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	fetchDocumentariesMovies: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
	fetchMovie: `/movie/{movie_id}?api_key=${API_KEY}`,
	fetchSimilarMovies: `/movie/{movie_id}/similar?api_key=${API_KEY}`,
	fetchCreditsMovie: `/movie/{movie_id}/credits?api_key=${API_KEY}`,
};

export default request;