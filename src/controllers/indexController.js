const moment = require("moment");
const db = require("../database/models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    index: (req, res) => {
        res.render('index');
    },
    search: (req,res) => {

        let {keyword} = req.query

        if(keyword.length === 0) {
           return res.redirect('/movies')
        }else {

            db.Movie.findAll({
                where: {
                    title: {[Op.like]: '%' + keyword + '%' }
                }
            })
            .then(movies => {
                res.render('results',{
                    movies,
                    keyword
                })
                
            })
    
            .catch(error => console.log(error))
        }

    }

}