Opportunities.allow({
	insert: function (userId, doc) {
		return Opportunities.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Opportunities.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Opportunities.userCanRemove(userId, doc);
	}
});

Opportunities.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Opportunities.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Opportunities.before.remove(function(userId, doc) {
	
});

Opportunities.after.insert(function(userId, doc) {
	
});

Opportunities.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Opportunities.after.remove(function(userId, doc) {
	
});
