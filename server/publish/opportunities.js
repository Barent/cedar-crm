Meteor.publish("opportunities", function() {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Opportunities.publishJoinedCursors(Opportunities.find({}, {}));
	}
	return Opportunities.publishJoinedCursors(Opportunities.find({createdBy:this.userId}, {}));
});

Meteor.publish("opportunities_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Opportunities.publishJoinedCursors(Opportunities.find({_id:null}, {}));
	}
	return Opportunities.publishJoinedCursors(Opportunities.find({_id:null,createdBy:this.userId}, {}));
});

Meteor.publish("opportunity", function(contactId) {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Opportunities.publishJoinedCursors(Opportunities.find({_id:contactId}, {}));
	}
	return Opportunities.publishJoinedCursors(Opportunities.find({_id:contactId,createdBy:this.userId}, {}));
});

Meteor.publish("opportunities_find_one", function() {
	if(Users.isInRoles(this.userId, ["admin","manager"])) {
		return Opportunities.publishJoinedCursors(Opportunities.find({}, {}));
	}
	return Opportunities.publishJoinedCursors(Opportunities.find({createdBy:this.userId}, {}));
});

