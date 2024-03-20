module.exports = (sequelize, DataTypes) => {
    const PostCounter = sequelize.define('PostCounter', {
      postId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        field: 'post_id'
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      dislikes: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      comments: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      tableName: 'post_counter',
      timestamps: false
    });
  
    return PostCounter;
  };
  