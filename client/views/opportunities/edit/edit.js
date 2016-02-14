var pageSession = new ReactiveDict();

Template.OpportunitiesEdit.rendered = function() {
	
};

Template.OpportunitiesEdit.events({
	
});

Template.OpportunitiesEdit.helpers({
	
});

Template.OpportunitiesEditEditForm.rendered = function() {
	

	pageSession.set("opportunitiesEditEditFormInfoMessage", "");
	pageSession.set("opportunitiesEditEditFormErrorMessage", "");

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

Template.OpportunitiesEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("opportunitiesEditEditFormInfoMessage", "");
		pageSession.set("opportunitiesEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var opportunitiesEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(opportunitiesEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("opportunitiesEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("opportunities", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("opportunitiesEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Opportunities.update({ _id: t.data.opportunities._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.OpportunitiesEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("opportunitiesEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("opportunitiesEditEditFormErrorMessage");
	}
	
});
