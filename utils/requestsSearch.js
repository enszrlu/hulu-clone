const API_KEY = process.env.API_KEY;

export default {
    searchMovie: {
        title: 'Movie',
        url: `/search/movie?api_key=${API_KEY}&language=en-US`
    },
    searchTV: {
        title: 'TV',
        url: `/search/tv?api_key=${API_KEY}&language=en-US`
    }
};
