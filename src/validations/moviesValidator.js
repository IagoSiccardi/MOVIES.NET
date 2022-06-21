const {check} = require('express-validator')
const { min } = require('moment')
const db = require('../database/models')

module.exports = [
    check('title')
        .notEmpty().withMessage('Debes colocar un titulo.').bail()
        .isLength({max:255}).withMessage('El maximo de caracteres es de 255'),

    check('rating')
        .notEmpty().withMessage('Debes colocar una calificación.').bail()
        .isNumeric().withMessage('Solo puedes colocar numeros.').bail()
        .custom((value) => {
            if (value <= 10) {
                return true
            }
                return false
        }).withMessage('El valor maximo es 10.'),
        

    check('awards')
    .isNumeric().withMessage('Solo puedes colocar numeros.'),

    check('release_date')
        .notEmpty().withMessage('Debes colocar la fecha de estreno.'),

    check('length')
        .notEmpty().withMessage('Debes colocar la duración.').bail()
        .isNumeric().withMessage('Solo puedes colocar numeros.'),

    check('description')
        .notEmpty().withMessage('Debes colocar una descripción.').bail()
        .isLength({max:500}).withMessage('El maximo de caracteres es de 500.'),

    check('genre_id')
        .notEmpty().withMessage('Debes seleccionar un genero.')
]