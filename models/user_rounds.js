module.exports = function(sequelize, DataTypes) {
    var UserRound = sequelize.define("UserRound" , {
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                len: [1,10]
            }
        },
        tosses: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                len: [1,10]
            }
        }
    });

    UserRound.associate = function(models) {
        UserRound.belongsTo(models.UserInfo, {
            foreignKey: {
                allowNull: false
            }
        });

        UserRound.belongsTo(models.Course, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return UserRound;
};