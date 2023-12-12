// const fetch = require('node-fetch');

Module.register("MMM-MoviePosters", {
    
    // Default module config.
    defaults: {
      //update every 1 minute
      updateInterval: 60000,
      //fade speed
      fadeSpeed: 4000,
    },

    getScripts: function () {
        return ["tmdb.js"];
    },

    getHeader: function () {
        return "Popular Movies";
    },

    // Define start sequence.
    start: function () {
        Log.info("Starting module: " + this.name);
        const movieInfo = tmdb.getMovieInfo()
        this.movieIndex = 0
        
        // Schedule update timer.
        setInterval(() => {
            this.updateDom(this.config.fadeSpeed);
        }, this.config.updateInterval);
    },
  
    // Override dom generator.
    getDom: function () {
      var wrapper = document.createElement("img");
      const curMovieDetails = tmdb.getMovieDetails(this.movieInfo, this.movieIndex)
      wrapper.src = tmdb.getImageForMovie(curMovieDetails.poster_path);
      this.movieIndex++
      if (movieIndex > this.movieInfo.results.length) {
        this.movieIndex = 0
      }
      return wrapper;
    },
  });
