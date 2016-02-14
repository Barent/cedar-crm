var pageSession = new ReactiveDict();

Template.OpportunitiesInsert.rendered = function() {
	
};

Template.OpportunitiesInsert.events({
	
});

Template.OpportunitiesInsert.helpers({
	
});

Template.OpportunitiesInsertInsertForm.rendered = function() {
	

	pageSession.set("opportunitiesInsertInsertFormInfoMessage", "");
	pageSession.set("opportunitiesInsertInsertFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.OpportunitiesInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("opportunitiesInsertInsertFormInfoMessage", "");
		pageSession.set("opportunitiesInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var opportunitiesInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(opportunitiesInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("opportunitiesInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("opportunities", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("opportunitiesInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Opportunities.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("opportunities", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.OpportunitiesInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("opportunitiesInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("opportunitiesInsertInsertFormErrorMessage");
	}
	
});
