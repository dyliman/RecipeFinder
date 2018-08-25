const mysql = require('mysql');

const server = mysql.createConnection({
  host: 'database',
  user: 'root',
  password: 'root',
  database: 'steam_review',
});

const getReviewInfo = (callback, gameId) => {
  server.query(`SELECT Games.gameName, Reviews.user_id, Reviews.review, Reviews.reviewDatePosted, Reviews.recommended, Reviews.helpful FROM Reviews, Games WHERE Games.id=${gameId} AND Reviews.game_id=${gameId}`, (err, result) => {
    if (err) callback(err);
    callback(null, result);
  });
};

const getUserInfo = (callback, userId) => {
  server.query(`SELECT Users.username, Users.numberOfGames, Users.numberOfReviews, Users.userImage FROM Users, Reviews WHERE Reviews.user_id=${userId} AND Users.id=${userId}`, (err, result) => {
    if (err) callback(err);
    callback(null, result);
  });
};

const insertInfo = (callback, insert) => {
  server.query(`INSERT into Games (gameName) VALUES ('${insert.game.gameName}')`, (err, result) => {
    if (err) callback(err);
    callback(null, result);
  });
  server.query(`INSERT into Reviews (game_id, user_id, review, reviewDatePosted, recommended, helpful) VALUES (${insert.reviews.game_id}, ${insert.reviews.user_id}, '${insert.reviews.review}', '${insert.reviews.reviewDatePosted}', ${insert.reviews.recommended}, '${insert.reviews.helpful}')`, (err, result) => {
    if (err) callback(err);
    callback(null, result);
  });
  server.query(`INSERT into Users (username, numberOfGames, numberOfReviews, userImage) VALUES ('${insert.users.username}', ${insert.users.numberOfGames}, ${insert.users.numberOfReviews}, '${insert.users.userImage}')`, (err, result) => {
    if (err) callback(err);
    callback(null, result);
  });
  server.query(`INSERT into Comments (review_id, user_id, comment, commentDatePosted) VALUES (${insert.comments.review_id},${insert.comments.user_id},'${insert.comments.comment}','${insert.comments.commentDatePosted}')`, (err, result) => {
    if (err) callback(err);
    callback(null, result);
  });
};

module.exports = {
  insertInfo,
  getReviewInfo,
  getUserInfo,
};
