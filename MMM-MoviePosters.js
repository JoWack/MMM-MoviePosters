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

    getScripts: function () {
        return ["tmdb.js"];
    },

    getHeader: function () {
        return "Popular Movies";
    },

    // Define start sequence.
    start: function () {
        Log.info("Starting Movie Poster module: " + this.name);
        this.movieInfo = tmdb.getMovieInfo();
        
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
      
      const curMovieDetails = tmdb.getMovieDetails(this.movieInfo, this.movieIndex);
      var imageElement = document.createElement("img");

      imageElement.src = tmdb.getImageForMovie(curMovieDetails.poster_path);
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
