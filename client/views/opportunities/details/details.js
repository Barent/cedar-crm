var pageSession = new ReactiveDict();

Template.OpportunitiesDetails.rendered = function() {
	
};

Template.OpportunitiesDetails.events({
	
});

Template.OpportunitiesDetails.helpers({
	
});

Template.OpportunitiesDetailsDetailsForm.rendered = function() {
	

	pageSession.set("opportunitiesDetailsDetailsFormInfoMessage", "");
	pageSession.set("opportunitiesDetailsDetailsFormErrorMessage", "");

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

Template.OpportunitiesDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("opportunitiesDetailsDetailsFormInfoMessage", "");
		pageSession.set("opportunitiesDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var opportunitiesDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(opportunitiesDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("opportunitiesDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("opportunitiesDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("opportunities", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("opportunities", {});
	}

	
});

Template.OpportunitiesDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("opportunitiesDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("opportunitiesDetailsDetailsFormErrorMessage");
	}
	
});
