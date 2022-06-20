const moment = require("moment");
const db = require("../database/models");
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
  list: (req, res) => {
    db.Movie.findAll().then((movies) => {
      res.render("moviesList.ejs", { movies });
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
    const { title, rating, awards, release_date, length, genre_id } = req.body;

    db.Movie.create({
      title: title.trim(),
      rating: +rating,
      awards: +awards,
      release_date,
      length: +length,
      genre_id: +genre_id,
    })
      .then((movie) => {
        console.log(movie);
        return res.redirect("/movies/detail/" + movie.id);
      })
      .catch((error) => console.log(error));
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
    const { title, rating, awards, release_date, length, genre_id } = req.body;

    db.Movie.update({
        title: title.trim(),
        rating: +rating,
        awards: +awards,
        release_date,
        length: +length,
        genre_id: +genre_id,
      },
      {
        where: { id: req.params.id },
      }
    )
      .then( () => {
        res.redirect('/movies')
      })

      .catch(error => console.log(error))

  },
  delete: function (req, res) {
    // TODO
  },
  destroy: function (req, res) {
    // TODO
  },
};

module.exports = moviesController;
