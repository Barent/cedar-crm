this.Companies = new Mongo.Collection("companies");

this.Companies.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager","user"]);
}

this.Companies.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","manager"]));
}

this.Companies.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
}
