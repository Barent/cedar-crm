var pageSession = new ReactiveDict();

Template.Companies.rendered = function() {
	
};

Template.Companies.events({
	
});

Template.Companies.helpers({
	
});

var CompaniesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CompaniesViewSearchString");
	var sortBy = pageSession.get("CompaniesViewSortBy");
	var sortAscending = pageSession.get("CompaniesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "phone", "email", "note", "contactId", "active"];
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

var CompaniesViewExport = function(cursor, fileType) {
	var data = CompaniesViewItems(cursor);
	var exportFields = ["name", "phone", "email", "note", "active"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.CompaniesView.rendered = function() {
	pageSession.set("CompaniesViewStyle", "table");
	
};

Template.CompaniesView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("CompaniesViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("CompaniesViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("CompaniesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("companies.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		CompaniesViewExport(this.companies, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CompaniesViewExport(this.companies, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CompaniesViewExport(this.companies, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CompaniesViewExport(this.companies, "json");
	}

	
});

Template.CompaniesView.helpers({

	"insertButtonClass": function() {
		return Companies.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.companies || this.companies.count() == 0;
	},
	"isNotEmpty": function() {
		return this.companies && this.companies.count() > 0;
	},
	"isNotFound": function() {
		return this.companies && pageSession.get("CompaniesViewSearchString") && CompaniesViewItems(this.companies).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CompaniesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CompaniesViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("CompaniesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CompaniesViewStyle") == "gallery";
	}

	
});


Template.CompaniesViewTable.rendered = function() {
	
};

Template.CompaniesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("CompaniesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CompaniesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CompaniesViewSortAscending") || false;
			pageSession.set("CompaniesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CompaniesViewSortAscending", true);
		}
	}
});

Template.CompaniesViewTable.helpers({
	"tableItems": function() {
		return CompaniesViewItems(this.companies);
	}
});


Template.CompaniesViewTableItems.rendered = function() {
	
};

Template.CompaniesViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("companies.details", {companyId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Companies.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Companies.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("companies.edit", {companyId: this._id});
		return false;
	}
});

Template.CompaniesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Companies.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Companies.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
