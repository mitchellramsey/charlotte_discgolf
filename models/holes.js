module.exports = function(sequelize, DataTypes) {
    var Hole = sequelize.define("Hole" , {
        hole_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                len: [1,2]
            }
        },
        par: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                len: [1]
            }
        },
        distance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                len: [1,4]
            }
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [0, 5000]
            }
        }
    });

    Hole.associate = function(models) {
        Hole.belongsTo(models.Course, {
           foreignKey: {
               allowNull: false
           } 
        });
    };

    return Hole;
}