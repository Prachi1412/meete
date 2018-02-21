var mysql = require('mysql');
var md5 = require('md5');
var connection = require('../modules/connection');
var response = require('../modules/response');
var commonfunction = require('../modules/commonfunction');
exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    console.log(req.body);
    var sql = "SELECT * FROM `td_user` WHERE `email`=? and `password`=?";
    var password = md5(password);
    console.log(password);
    var values = [email, password];
    connection.query(sql, values, function(err,result) {
         console.log(result);
        if (err) {
            response.sendError(res);
            return;
        } else {

            if (result.length > 0) {
                result[0].password = "";
                response.showresult(result,res);
                return;
            } else {
                response.invalidCredential(res);
                return;
            }
        }
    });
}
exports.signup = function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var password = md5(password);
    var age = req.body.age;

    var sql = "SELECT * FROM `td_user` WHERE `email`=?";
    var values = [email, password];

    connection.query(sql, values, function(err, result) {
        if (err) {
            response.sendError(res);
            return;
        } else if (result.length > 0) {
            var msg = "Email is AlreadyExist";
            response.AlreadyExist(msg, res);
            return;

        } else {
            if (age > 18) {
                var user_id = md5(commonfunction.generaterandomstring());
                var sql = "INSERT INTO `td_user`(`user_id`, `name`, `email`, `password`,`age`) VALUES (?,?,?,?,?)";
                var values = [user_id, name, email, password, age];
                connection.query(sql, values, function(err, result) {
                    if (err) {
                        response.sendError(res);
                        return;
                    } else {
                        var sql = "SELECT * FROM `td_user` WHERE `user_id`=?";
                        var values = [user_id];

                        connection.query(sql, values, function(err, result) {
                            if (err) {
                                response.sendError(res);
                                return;
                            } else {
                                response.showresult(result, res);
                                console.log(result[0]);
                            }
                        });
                    }
                });
            } else {
                var msg = "not eligble";
                response.NoDataFound(msg, res);
                return;
            }
        }
        });
}
exports.update = function(req, res) {

        var user_id = req.body.user_id;
        var name = req.body.name;
        var gender = req.body.gender;
        var age = req.body.age;
        var description = req.body.description;

        var sql = "SELECT * FROM td_user WHERE `user_id`=?";
        connection.query(sql, [user_id], function(err, result) {
            if (err) {
                response.sendError(res);
                return;
            } else {
                if (result.length > 0) {
                    console.log(age);
                    if (age > 18) {

                        var update_sql = "";
                        var values = [];

                        if (req.files.length == 0) {
                            update_sql = "UPDATE `td_user` SET `name`=?,`gender`=?, `age`=?, `description`=? , `is_verified`=? WHERE `user_id`=?";
                            values = [name, gender, age, description, 1, user_id];
                            connection.query(update_sql, values, function(err, userDetails) {
                                        if (err) {
                                            console.log(err);

                                            response.sendError(res);
                                            return;
                                        } else {
                                            var sql = "SELECT * FROM `td_user` WHERE `user_id`=?";
                                            var value = [user_id];
                                            connection.query(sql, value, function(err, result) {
                                                if (err) {
                                                    response.sendError(res);
                                                    return;
                                                } else {
                                                    response.success(result, res);
                                                    return;
                                                }
                                            });
                                        }
                                    });
                        } else {
                            console.log(req.files.length);
                            for (var i = 0; i < req.files.length; i++) {
                                if (req.files[i].fieldname == "profile_image") {
                                    console.log(req.files[i]);
                                    update_sql = "UPDATE `td_user` SET `profile_image`=?, `name`=?, `gender`=?, `age`=?, `description`=? ,`is_verified`=? WHERE `user_id`=?";
                                    values = [req.files[i].filename, name, gender, age, description, 1, user_id];
                                    connection.query(update_sql, values, function(err, userDetails) {
                                        if (err) {
                                            console.log(err);

                                            response.sendError(res);
                                            return;
                                        } else {
                                            var sql = "SELECT * FROM `td_user` WHERE `user_id`=?";
                                            var value = [user_id];
                                            connection.query(sql, value, function(err, result) {
                                                if (err) {
                                                    response.sendError(res);
                                                    return;
                                                } else {
                                                    response.success(result, res);
                                                    return;
                                                }
                                            });
                                        }
                                    });
                                } else if (req.files[i].fieldname == "cover_image") {
                                    console.log(req.files[i]);
                                    update_sql = "UPDATE `td_user` SET `cover_image`=?, `name`=?, `gender`=?, `age`=?, `description`=? ,`is_verified`=? WHERE `user_id`=?";
                                    values = [req.files[i].filename, name, gender, age, description, 1, user_id];
                                    connection.query(update_sql, values, function(err, userDetails) {
                                        if (err) {
                                            console.log(err);

                                            response.sendError(res);
                                            return;
                                        } else {
                                            var sql = "SELECT * FROM `td_user` WHERE `user_id`=?";
                                            var value = [user_id];
                                            connection.query(sql, value, function(err, result) {
                                                if (err) {
                                                    response.sendError(res);
                                                    return;
                                                } else {
                                                    response.success(result, res);
                                                    return;
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        }

                    } else {
                        response.agelimit(res);
                        return;
                    }
                } else {
                    var msg = "No Data Found";
                    response.NoDataFound(msg, res);
                    return;
                }
            }
        });
}
exports.delete = function(req, res) {
    var user_id = req.body.user_id;
    var sql = "delete from `td_user` WHERE `user_id`= ?";
    var values = [user_id];
    connection.query(sql, values, function(err, result) {
        if (err) {
            response.sendError(res);
            return;
        } else {
            response.success(result, res);
            return;
        }
    });
}
