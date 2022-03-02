const database = include('/databaseConnection');


function getAllRestaurants(callback) {
	let sqlQuery = "SELECT restaurant_id, name, description FROM restaurant";
	database.query(sqlQuery, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}

function deleteRestaurant(restaurant_id, callback) {
	let sqlDeleteRestaurant = "DELETE FROM restaurant WHERE restaurant_id = :userID";
	let params = {
		userID: restaurant_id
	};
	console.log(sqlDeleteRestaurant);
	database.query(sqlDeleteRestaurant, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}

function addRestaurant(postData, callback) { 
	let sqlInsertSalt = "INSERT INTO restaurant (name, description) VALUES (:name, :description);"
	let params = {
		name: postData.name,
		description: postData.description
	};
	console.log(sqlInsertSalt);
	database.query(sqlInsertSalt, params, (err, results, fields) => {
		if (err) {
			console.log(err);
			callback(err, null);
		} else {
			console.log(results);
			callback(null, results);
		}
	});
}


function getAllReviews(callback) {
	let sqlQuery = "SELECT review_id, restaurant_id, reviewer_name, details, rating FROM review";
	database.query(sqlQuery, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}


function deleteReview(review_id, callback) {
	let sqlDeleteReview = "DELETE FROM review WHERE review_id = :review_id";
	let params = {
		review_id: review_id
	};
	console.log(sqlDeleteReview);
	database.query(sqlDeleteReview, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}

function addReview(postData, callback) { 
	let sqlInsertSalt = "INSERT INTO review (restaurant_id, reviewer_name, details, rating) VALUES (:restaurant_id, :reviewer_name, :details, :rating);"
	let params = {
		restaurant_id: postData.restaurant_id,
		reviewer_name: postData.name,
		details: postData.details,
		rating: postData.rating,
	};
	console.log(sqlInsertSalt);
	database.query(sqlInsertSalt, params, (err, results, fields) => {
		if (err) {
			console.log(err);
			callback(err, null);
		} else {
			console.log(results);
			callback(null, results);
		}
	});
}


module.exports = { getAllRestaurants, deleteRestaurant, addRestaurant, getAllReviews, deleteReview, addReview }
