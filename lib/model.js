module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define('news', {
        __id: {
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
    })
    return News;
}
