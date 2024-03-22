module.exports = (sequelize, DataTypes) => {
    const CommentCounter = sequelize.define('CommentCounter', {
      postId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        field: 'post_id'
      },
      commentId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        field: 'comment_id'
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      dislikes: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      tableName: 'comment_counter',
      timestamps: false
    });
  
    return CommentCounter;
  };
  