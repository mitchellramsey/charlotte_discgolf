module.exports = function(sequelize, DataTypes) {
    var UserInfo = sequelize.define("UserInfo", {
        user_name : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 140]
            }
        },
        email : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                len: [8,140]
            }
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8,140]
            }
        }
    });

    UserInfo.associate = function(models) {
        UserInfo.hasMany(models.UserRound, {
            onDelete: "cascade"
        });
    };

    return UserInfo;
};