var pageSession = new ReactiveDict();

Template.ContactAssociateViewTable.rendered = function() {
	
};

Template.ContactAssociateViewTable.events({
	"click #saveContactToCompany": function(e, t){
		alert(tempCompanyData.name);
	}
});

Template.ContactAssociateViewTable.helpers({
	"tableItemsCA": function() {
		return ContactsViewItemsCA(this.contacts);
	}
});

var ContactsViewItemsCA = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ContactsViewSearchString");
	var sortBy = pageSession.get("ContactsViewSortBy");
	var sortAscending = pageSession.get("ContactsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "phone", "email", "note"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};