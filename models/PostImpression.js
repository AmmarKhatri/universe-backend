module.exports = (sequelize, DataTypes) => {
    const PostImpression = sequelize.define('PostImpression', {
      postId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        field: 'post_id'
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
      tableName: 'post_impression',
      timestamps: false
    });
  
    return PostImpression;
  };
  