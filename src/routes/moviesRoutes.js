const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const moviesValidator = require('../validations/moviesValidator')
const upload = require('../middlewares/multer')

router.get('/', moviesController.list);
router.get('/new', moviesController.new);
router.get('/recommended', moviesController.recomended);
router.get('/detail/:id', moviesController.detail);


//Rutas exigidas para la creación del CRUD
router.get('/add', moviesController.add);
router.post('/create',upload.single('file'),moviesValidator, moviesController.create);
router.get('/edit/:id', moviesController.edit);
router.put('/update/:id',upload.single('file'),moviesValidator, moviesController.update);
router.get('/delete/:id', moviesController.delete);
router.delete('/remove/:id', moviesController.destroy);

module.exports = router;