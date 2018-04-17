// var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
    var UserInfo = sequelize.define("UserInfo", {
        username: DataTypes.STRING,
        googleId: DataTypes.STRING,
        facebookId: DataTypes.STRING
    });

    UserInfo.associate = function(models) {
        UserInfo.hasMany(models.UserRound, {
            onDelete: "cascade"
        });
    };

    return UserInfo;
};