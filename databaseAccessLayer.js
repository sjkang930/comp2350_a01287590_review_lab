const database = include('/databaseConnection');


function getAllRestaurant(callback) {
	let sqlQuery = "SELECT * FROM restaurant";
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

function getAllreviews(callback) {
	let sqlQuery = "SELECT * FROM review";
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
const passwordPepper = "SeCretPeppa4MySal+";
function addUser(postData, callback) {
	let sqlInsertSalt = "INSERT INTO restaurant (name, description)VALUES (:name, :description);"
	let params = {
		name: postData.name,
		description: postData.description
	};
	console.log(sqlInsertSalt);
	database.query(sqlInsertSalt, params, (err, results, fields) => {
		if (err) {
			console.log(err);
			callback(err, null);
		}
		else {
			let insertedID = results.insertId;
			let updatePasswordHash = "UPDATE restaurant SET password_hash = sha2(concat(:password,:pepper,password_salt),512) WHERE restaurant_id = :name;"
			let params2 = {
				password: postData.password,
				pepper: passwordPepper,
				userId: insertedID
			}
			console.log(updatePasswordHash);
			database.query(updatePasswordHash, params2, (err, results, fields) => {
				if (err) {
					console.log(err);
					callback(err, null);
				}
				else {
					console.log(results);
					callback(null, results);
				}
			});
		}
	});
}

function deleteUser(restaurantUserId, callback) {
	let sqlDeleteUser = "DELETE FROM restaurant WHERE restaurant_id = :userID";
	let params = {
		userID: restaurantUserId
	};
	console.log(sqlDeleteUser);
	database.query(sqlDeleteUser, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}

module.exports = { getAllRestaurant, getAllreviews, deleteUser, addUser }
