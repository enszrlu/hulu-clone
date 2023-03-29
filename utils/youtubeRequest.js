const API_KEY_YOUTUBE = process.env.API_KEY_YOUTUBE;

export default {
    trailer: {
        title: 'Trailer',
        url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY_YOUTUBE}&maxResults=1&type=video&videoEmbeddable=true&`
    }
};
