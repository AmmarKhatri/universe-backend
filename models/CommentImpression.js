module.exports = (sequelize, DataTypes) => {
    const CommentImpression = sequelize.define('CommentImpression', {
      commentId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        field: 'comment_id'
      },
      userId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        field: 'user_id'
      },
      impression: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      tableName: 'comment_impressions',
      timestamps: false
    });
  
    return CommentImpression;
  };
  