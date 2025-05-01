module.exports = (sequelize, DataTypes) => {

  const ChatBox = sequelize.define("ChatBox",{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    messageBody: {
      type: DataTypes.STRING,
      allowNull: false
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
return ChatBox
};
