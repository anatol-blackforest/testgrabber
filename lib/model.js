module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('news', {
        link: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        img: {
            type: DataTypes.STRING
        },
        text: {
            type: DataTypes.STRING
        },
        __id: {
            type: DataTypes.UUID,
            defautValue: DataTypes.UUIDV4
        }
    })
    return Group;
  }
