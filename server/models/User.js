module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users",{
        fname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensures the username is unique

        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensures the email is unique
            validate: {
                isEmail: true, // Validates email format
            },
        },
        telno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    Users.associate = (models) =>{
        Users.hasMany(models.Posts, {
            onDelete: 'CASCADE',
        });

        Users.hasMany(models.Comments, {
            onDelete: "CASCADE",
        });

        Users.hasMany(models.ChatBox, {
            onDelete: "CASCADE",
        });
    }
    return Users
}