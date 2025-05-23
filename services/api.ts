export const TMDB_CONFIG = {
    API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
    BASE_URL: 'https://api.themoviedb.org/3',
    headers:{
        'accept': 'application/json',
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_TOKEN}`
    }
}

export const fetchPopularMovies = async ({query}:{query:string}) => {
    const endpoint = query
    ? '${TMDB_CONFIG.BASE_URL}/search/movie?query= ${encodeURIComponent(query)}'
    : "${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc";

    const response= await fetch (endpoint ,{
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if(!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
}
