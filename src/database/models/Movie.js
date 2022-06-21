module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.INTEGER
        },
        length: {
            type: dataTypes.INTEGER
        },
        awards: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        release_date: {
            type: dataTypes.DATE
        },
        genre_id : {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            
        },
        image :{
             
                type: dataTypes.STRING,
                defaultValue: 'notFound.png'
        },
        description: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'movies',
        timestamps: false
    };
    const Movie = sequelize.define(alias, cols, config)

    return Movie
}