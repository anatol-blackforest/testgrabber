module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define('news', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        link: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        img: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.TEXT
        }
    }, {
        timestamps: false
    })
    return News;
}
