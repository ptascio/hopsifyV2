module.exports = function(sequelize, DataTypes){
  var TrackInfo = sequelize.define("TrackInfo", {
    track_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    loudness: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    energy: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    danceability: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    tempo: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
  return TrackInfo;
};
