const db = require('../database/models');
const sequelize = db.sequelize;


const genresController = {
    'list': (req, res) => {
        db.Genre.findAll()
            .then(genres => {
                res.render('genresList.ejs', {genres})
            })
    },
    'detail': (req, res) => {
      let movies =  db.Movie.findAll({
            where: {
                genre_id : req.params.id
            }
        })

     let genre = db.Genre.findByPk(req.params.id)

     Promise.all([movies,genre])

     .then(([movies,genre]) => {
        res.render('genresDetail.ejs', {genre,
        movies});
    })
    .catch(error => console.log(error))
            
    }

}

module.exports = genresController;