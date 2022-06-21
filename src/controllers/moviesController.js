const moment = require("moment");
const db = require("../database/models");
const sequelize = db.sequelize;
const {validationResult} = require('express-validator')

const moviesController = {


  list: (req, res) => {
    db.Movie.findAll().then((movies) => {


      return res.render("moviesList.ejs", { movies });
    });
  },
  detail: (req, res) => {

    

    db.Movie.findByPk(req.params.id).then((movie) => {

      const release_date= moment(db.Movie.release_date).format("YYYY-MM-DD")

      res.render("moviesDetail.ejs", { movie,
        release_date
      });
    });
  },
  new: (req, res) => {
    db.Movie.findAll({
      order: [["release_date", "DESC"]],
      limit: 5,
    }).then((movies) => {
      res.render("newestMovies", { movies });
    });
  },
  recomended: (req, res) => {
    db.Movie.findAll({
      where: {
        rating: { [db.Sequelize.Op.gte]: 8 },
      },
      order: [["rating", "DESC"]],
    }).then((movies) => {
      res.render("recommendedMovies.ejs", { movies });
    });
  }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
  add: function (req, res) {
    db.Genre.findAll({
      order: [["name", "asc"]],
    })
      .then((genres) => {
        return res.render("moviesAdd", {
          genres,
        });
      })

      .catch((error) => {
        console.log(error);
      });
  },
  create: function (req, res) {

    const errors = validationResult(req)
    const { title, rating, awards, release_date, length, genre_id, description, image } = req.body;

    if(errors.isEmpty()){
      
      db.Movie.create({
        title: title.trim(),
        description : description.trim(),
        rating: +rating,
        awards: +awards,
        release_date,
        length: +length,
        genre_id: +genre_id,
        image: req.file ? req.file.filename : null

      })
        .then((movie) => {
          console.log(movie);
          return res.redirect("/movies/detail/" + movie.id);
        })
        .catch((error) => console.log(error));
    }else {

      db.Genre.findAll({
        order: [["name", "asc"]],
      })
        .then((genres) => {
          return res.render("moviesAdd", {
            old : req.body,
            errores : errors.mapped(),
            genres
            
          });
        })
  
        .catch((error) => {
          console.log(error);
        });
    }


  },
  edit: function (req, res) {
    let movie = db.Movie.findByPk(req.params.id);
    let genres = db.Genre.findAll({
      order: ["name"],
    });

    Promise.all([movie, genres])

      .then(([movie, genres]) => {
        return res.render("moviesEdit", {
          Movie: movie,
          genres,
          release_date: moment(movie.release_date).format("YYYY-MM-DD"),
        });
      })
      .catch((error) => console.log(error));
  },
  update: function (req, res) {
    const { title, rating, awards, release_date, length, genre_id, description, image } = req.body;
    const errors = validationResult(req)

    if (errors.isEmpty()) {

      db.Movie.update({
          title: title.trim(),
          rating: +rating,
          awards: +awards,
          release_date,
          length: +length,
          genre_id: +genre_id,
          description: description.trim(),
          image: req.file ? req.file.filename : 'notFound.png'
        },
        {
          where: { id: req.params.id },
        }
      )
        .then( () => {
          res.redirect('/movies')
        })
  
        .catch(error => console.log(error))
      
    }else {

      let movie = db.Movie.findByPk(req.params.id);
      let genres = db.Genre.findAll({
        order: ["name"],
      });
  
      Promise.all([movie, genres])
  
        .then(([movie, genres]) => {
          return res.render("moviesEdit", {
            Movie: movie,
            genres,
            release_date: moment(movie.release_date).format("YYYY-MM-DD"),
            errores: errors.mapped()
          });
        })
        .catch((error) => console.log(error));
    }


  },
  delete: function (req, res) {
    db.Movie.findByPk(req.params.id)
      .then(movie => {
        res.render('movieDelete',{
          movie
        })
      })
      .catch(error => console.log(error))
  },
  destroy: function (req, res) {
    db.Movie.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.redirect('/movies')
      })
      .catch(error => console.log(error))
  },
};

module.exports = moviesController;
