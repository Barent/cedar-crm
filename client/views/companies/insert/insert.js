var pageSession = new ReactiveDict();



Template.CompaniesInsert.rendered = function() {
	
};

Template.CompaniesInsert.events({
	
});

Template.CompaniesInsert.helpers({
	
});

Template.CompaniesInsertInsertForm.rendered = function() {
	

	pageSession.set("companiesInsertInsertFormInfoMessage", "");
	pageSession.set("companiesInsertInsertFormErrorMessage", "");

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

Template.CompaniesInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("companiesInsertInsertFormInfoMessage", "");
		pageSession.set("companiesInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var companiesInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(companiesInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("companiesInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("companies", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("companiesInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Companies.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("companies", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	},
	"click #contactLookup": function(e, t){	
		var formData = {
			name: $("[name='name']").val(),
			phone: $("[name='phone']").val(),
			email: $("[name='email']").val()
		}
		Session.set("formDataAccount", formData);
		Router.go("companies.contact_associate", {});
	}

	
});

Template.CompaniesInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("companiesInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("companiesInsertInsertFormErrorMessage");
	}
	
});
