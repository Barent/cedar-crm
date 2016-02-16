var pageSession = new ReactiveDict();

Template.CompaniesDetails.rendered = function() {
	
};

Template.CompaniesDetails.events({
	"click .field-contact-id": function(){
		var companyLocal = Companies.findOne({_id:this.params.companyId}, {});
		var contactIdStringForSplit = companyLocal.contactId;
		var contactIdForRedirect = contactIdStringForSplit.split(", ");
		//alert(contactIdForRedirect[1]);
		Router.go("contacts.details", {contactId: contactIdForRedirect[1]})
	}
});

Template.CompaniesDetails.helpers({
	
});

Template.CompaniesDetailsDetailsForm.rendered = function() {
	

	pageSession.set("companiesDetailsDetailsFormInfoMessage", "");
	pageSession.set("companiesDetailsDetailsFormErrorMessage", "");

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

Template.CompaniesDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("companiesDetailsDetailsFormInfoMessage", "");
		pageSession.set("companiesDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var companiesDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(companiesDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("companiesDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("companiesDetailsDetailsFormErrorMessage", message);
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

		Router.go("companies", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("companies", {});
	}

	
});

Template.CompaniesDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("companiesDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("companiesDetailsDetailsFormErrorMessage");
	}
	
});
