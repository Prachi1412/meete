exports.sendError = function(res){
	var Error = {
		status : 0,
		message : "Error in execution"
	}
	res.send(Error);
}

exports.success = function(result,res){
	var response = {
		status : 1,
		response : result[0]
	}
	 res.send(response);
}
exports.invalidCredential = function(res){
	var response = {
		status : 0,
		message : "inalid credential"
	}
	res.send(response);
}
exports.AlreadyExist = function(msg,res) {
	var response = {
		status : 0,
		message :msg
	}
	res.send(response);
}
exports.NoDataFound=function(msg,res){
	var response={
		status:0,
		message:msg
	}
	res.send(response);
}
exports.showresult = function(result,res){
	var response = {
		status : 1,
		message :result[0]
	}
	res.send(response);
}
exports.agelimit = function(result,res){
	var response = {
		status : 0,
		message :result[0]
	}
	res.send(response);
}