module.exports = function(sequelize, DataTypes) {
    var Course = sequelize.define("Course", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,140]
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        holes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                len: [1,2]
            }
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                isFloat: true,
            }
        }
    });

    Course.associate = function(models) {
        Course.hasMany(models.Hole, {
            onDelete: "cascade"
        });

        Course.hasMany(models.UserRound, {
            onDelete: "cascade"
        });
    };

    return Course;
};