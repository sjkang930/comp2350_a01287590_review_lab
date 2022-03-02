const router = require('express').Router();
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');
// const dbModel = include('staticData');

router.get('/', (req, res) => {
    console.log("page hit");
    database.getConnection(function (err, dbConnection) {
        if (err) {
            res.render('error', { message: 'Error connecting to MySQL' });
            console.log("Error connecting to mysql");
            console.log(err);
        }
        else {
            dbModel.getAllRestaurants((err, result) => {
                if (err) {
                    res.render('error', { message: 'Error reading from MySQL' });
                    console.log("Error reading from mysql");
                    console.log(err);
                }
                else { //success
                    res.render('index', { allRestaurants: result });

                    //Output the results of the query to the Heroku Logs
                    console.log(result);
                }
            });
            dbConnection.release();
        }
    });
});


router.post('/addRestaurant', (req, res) => {
    console.log("form submit");
    database.getConnection(function (err, dbConnection) {
        if (err) {
            res.render('error', { message: 'Error connecting to MySQL' });
            console.log("Error connecting to mysql");
            console.log(err);
        }
        else {
            console.log(req.body);
            dbModel.addRestaurant(req.body, (err, result) => {
                if (err) {
                    res.render('error', { message: 'Error writing to MySQL' });
                    console.log("Error writing to mysql");
                    console.log(err);
                }
                else { //success
                    res.redirect("/");
                    //Output the results of the query to the Heroku Logs
                    console.log(result);
                }
            });
            dbConnection.release();
        }
    });
});

router.get('/deleteRestaurant', (req, res) => {
    console.log("delete restaurant");
    database.getConnection(function (err, dbConnection) {
        if (err) {
            res.render('error', { message: 'Error connecting to MySQL' });
            console.log("Error connecting to mysql");
            console.log(err);
        }
        else {
            console.log(req.query);
            let restaurant_id = req.query.id;
            if (restaurant_id) {
                dbModel.deleteRestaurant(restaurant_id, (err, result) => {
                    if (err) {
                        res.render('error', { message: 'Error writing to MySQL' });
                        console.log("Error writing to mysql");
                        console.log(err);
                    }
                    else { //success
                        res.redirect("/");
                        //Output the results of the query to the Heroku Logs
                        console.log(result);
                    }
                });
            }
            else {
                res.render('error', { message: 'Error on Delete' });
            }
            dbConnection.release();
        }
    });
});

router.get('/showReviews', (req, res) => {
    console.log("page hit");
    database.getConnection(function (err, dbConnection) {
        if (err) {
            res.render('error', { message: 'Error connecting to MySQL' });
            console.log("Error connecting to mysql");
            console.log(err);
        }
        else {
            dbModel.getAllReviews((err, result) => {
                if (err) {
                    res.render('error', { message: 'Error reading from MySQL' });
                    console.log("Error reading from mysql");
                    console.log(err);
                }
                else { //success
                    let restaurant_id = req.query.id
                    let restaurant_name = req.query.name;
                    res.render('show', { restaurant_id, restaurant_name, allReviews: result });
                    //Output the results of the query to the Heroku Logs
                    console.log(result);

                }
            });
            dbConnection.release();
        }
    });
});

router.post('/addReview', (req, res) => {
    console.log("form submit");
    database.getConnection(function (err, dbConnection) {
        if (err) {
            res.render('error', { message: 'Error connecting to MySQL' });
            console.log("Error connecting to mysql");
            console.log(err);
        }
        else {
            console.log(req.body);
            dbModel.addReview(req.body, (err, result) => {
                if (err) {
                    res.render('error', { message: 'Error writing to MySQL' });
                    console.log("Error writing to mysql");
                    console.log(err);
                }
                else { //success
                    let restaurant_id = req.query.id
                    let restaurant_name = req.query.name
                    res.redirect(`/showReviews?id=${restaurant_id}&name=${restaurant_name}`);
                    //Output the results of the query to the Heroku Logs
                    console.log(result);
                }
            });
            dbConnection.release();
        }
    });
});

router.get('/deleteReview', (req, res) => {
    console.log("delete review");
    database.getConnection(function (err, dbConnection) {
        if (err) {
            res.render('error', { message: 'Error connecting to MySQL' });
            console.log("Error connecting to mysql");
            console.log(err);
        }
        else {
            console.log(req.query);
            let restaurant_id  = req.query.id;
            let restaurant_name= req.query.name;
            let review_id = req.query.review_id;
            if (review_id) {
                dbModel.deleteReview(review_id, (err, result) => {
                    if (err) {
                        res.render('error', { message: 'Error writing to MySQL' });
                        console.log("Error writing to mysql");
                        console.log(err);
                    }
                    else { //success
                        res.redirect(`/showReviews?id=${restaurant_id}&name=${restaurant_name}`);
                        //Output the results of the query to the Heroku Logs
                        console.log(result);
                    }
                });
            }
            else {
                res.render('error', { message: 'Error on Delete' });
            }
            dbConnection.release();
        }
    });
});
       


module.exports = router;
