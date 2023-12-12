// const fetch = require('node-fetch');

Module.register("MMM-MoviePosters", {
    
    // Default module config.
    defaults: {
      text: "Hello World!",
      //update every 1 minute
      updateInterval: 60000,
      //fade speed
      fadeSpeed: 4000,
    },

    getHeader: function () {
        return "Popular Movies";
    },

    // Define start sequence.
    start: function () {
        Log.info("Starting module: " + this.name);
        const movieInfo = this.getMovieInfo()
        this.movieIndex = 0
        
        // Schedule update timer.
        setInterval(() => {
            this.updateDom(this.config.fadeSpeed);
        }, this.config.updateInterval);
    },

    getMovieInfo: async function () {
        const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDA5ZDk2NjQ3NjNmMDFhZTFkMDlkYzgzM2U2YjIzNiIsInN1YiI6IjY1NzhhNmFmNGJmYTU0NWNmZTYzNmEyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HkqMRl0QLO4mjDyYNAxVqR7zwr59OY4Nt4o2BxYRWio'
            }
        };

        const res = await fetch(url, options)
        return await res.json()
            // .then(res => res.json())
            // .then(json => console.log(json))
            // .catch(err => console.error('error:' + err));
    },

    getImageForMovie: async function (posterPath) {
        // example path: /dB6Krk806zeqd0YNp2ngQ9zXteH.jpg
        // example id: 897087 
        const imgUrl = "https://image.tmdb.org/t/p/original" + posterPath
    },
  
    // Override dom generator.
    getDom: async function () {
      var wrapper = document.createElement("img");
      wrapper.src = await this.getImageForMovie(this.movieInfo().results[this.movieIndex].poster_path);
      this.movieIndex++
      if (movieIndex > this.movieInfo.results.length) {
        this.movieIndex = 0
      }
      return wrapper;
    },
  });
