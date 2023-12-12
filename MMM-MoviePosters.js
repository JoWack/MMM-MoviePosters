// const fetch = require('node-fetch');

Module.register("MMM-MoviePosters", {
    
    // Default module config.
    defaults: {
      //update every 1 minute
      updateInterval: 60000,
      //fade speed
      fadeSpeed: 4000,
      debug: true
    },

    movieIndex: 0,
    movieInfo: {},

    // getScripts: function () {
    //     return [this.file("tmdb.js")];
    // },

    getHeader: function () {
        return "Popular Movies";
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
    
        const res = await fetch(url, options);
    
        if (!res.ok) {
            Log.error("COULD NOT RECEIVE MOVIE INFO");
            throw new Error('failed to fetch movie info');
        }
    
        return await res.json();
            // .then(res => res.json())
            // .then(json => console.log(json))
            // .catch(err => console.error('error:' + err));
    },
    
    getMovieDetails: async function (movieInfoJson, index) {
        return movieInfoJson.results[index];
    },
    
    getImageForMovie: async function (posterPath) {
        // example path: /dB6Krk806zeqd0YNp2ngQ9zXteH.jpg
        // example id: 897087 
        return "https://image.tmdb.org/t/p/original" + posterPath;
    },

    // Define start sequence.
    start: function () {
        Log.info("Starting Movie Poster module: " + this.name);
        this.movieInfo = this.getMovieInfo();
        
        // Schedule update timer.
        setInterval(() => {
            this.updateDom(this.config.fadeSpeed);
        }, this.config.updateInterval);
    },
  
    // Override dom generator.
    getDom: function () {
      Log.info("Log in the getDom function");
      var wrapper = document.createElement("div");
      wrapper.innerHTML = "Inner HTML"
      
      const curMovieDetails = this.getMovieDetails(this.movieInfo, this.movieIndex);
      var imageElement = document.createElement("img");

      imageElement.src = this.getImageForMovie(curMovieDetails.poster_path);
      imageElement.style.maxWidth = '50%';
      imageElement.style.maxHeight = '50%';

      wrapper.appendChild(imageElement);
      
      this.movieIndex++;
      if (this.movieIndex > this.movieInfo.results.length) {
        this.movieIndex = 0;
      }
      return wrapper;
    },
  });
