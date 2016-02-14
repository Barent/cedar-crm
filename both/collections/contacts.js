this.Contacts = new Mongo.Collection("contacts");

this.Contacts.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager","user"]);
}

this.Contacts.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","manager"]));
}

this.Contacts.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
}
