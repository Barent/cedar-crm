this.Opportunities = new Mongo.Collection("opportunities");

this.Opportunities.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager","user"]);
}

this.Opportunities.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","manager"]));
}

this.Opportunities.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
}
