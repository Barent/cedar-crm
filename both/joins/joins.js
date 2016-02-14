// Companies
Companies.join(Contacts, "contactId", "contacts", ["name"]);

// Opportunities
Opportunities.join(Contacts, "contactId", "contacts", ["name"]);
Opportunities.join(Companies, "companyId", "companies", ["name"]);

