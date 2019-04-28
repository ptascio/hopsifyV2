module.exports = function(sequelize, DataTypes){
  var TrackSearch = sequelize.define("TrackSearch", {
    track_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return TrackSearch;
};
