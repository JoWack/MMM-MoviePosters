const fetch = require("node-fetch")

async function getMovieInfo () {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDA5ZDk2NjQ3NjNmMDFhZTFkMDlkYzgzM2U2YjIzNiIsInN1YiI6IjY1NzhhNmFmNGJmYTU0NWNmZTYzNmEyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HkqMRl0QLO4mjDyYNAxVqR7zwr59OY4Nt4o2BxYRWio'
        }
    };

    const res = await fetch(url, options)

    if (!res.ok) {
        throw new Error('failed to fetch movie info')
    }

    return await res.json()
        // .then(res => res.json())
        // .then(json => console.log(json))
        // .catch(err => console.error('error:' + err));
}

async function getMovieDetails (movieInfoJson, index) {
    return movieInfoJson.results[index]
}

async function getImageForMovie(posterPath) {
    // example path: /dB6Krk806zeqd0YNp2ngQ9zXteH.jpg
    // example id: 897087 
    return "https://image.tmdb.org/t/p/original" + posterPath
}