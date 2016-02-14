Companies.allow({
	insert: function (userId, doc) {
		return Companies.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Companies.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Companies.userCanRemove(userId, doc);
	}
});

Companies.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Companies.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Companies.before.remove(function(userId, doc) {
	
});

Companies.after.insert(function(userId, doc) {
	
});

Companies.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Companies.after.remove(function(userId, doc) {
	
});
