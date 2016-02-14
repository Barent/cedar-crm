Meteor.publish("companies", function() {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Companies.publishJoinedCursors(Companies.find({}, {}));
	}
	return Companies.publishJoinedCursors(Companies.find({createdBy:this.userId}, {}));
});

Meteor.publish("companies_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Companies.publishJoinedCursors(Companies.find({_id:null}, {}));
	}
	return Companies.publishJoinedCursors(Companies.find({_id:null,createdBy:this.userId}, {}));
});

Meteor.publish("company", function(companyId) {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Companies.publishJoinedCursors(Companies.find({_id:companyId}, {}));
	}
	return Companies.publishJoinedCursors(Companies.find({_id:companyId,createdBy:this.userId}, {}));
});

