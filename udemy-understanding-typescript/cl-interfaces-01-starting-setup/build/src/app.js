// Code goes here!
class Department {
    constructor(id, name, employees) {
        this.id = id;
        this.name = name;
        this.employees = employees;
    }
    static createEmployee(name) {
        return {
            name
        };
    }
    addEmployee(employee) {
        if (!this.employees)
            return;
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log("employees length: ", this?.employees?.length);
        console.log("employees: ", this.employees);
    }
}
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT", []);
        this.admins = admins;
    }
    describe() {
        console.log("it: ", this);
    }
}
// const IT = new ITDepartment("123", ["dodo"]);
// IT.describe();
// console.log("it: ", IT);
class AccountingDepartment extends Department {
    constructor(id, employees, reports) {
        super(id, "Accounting", employees);
        this.reports = reports;
        this.lastReport = reports[0];
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new AccountingDepartment("asdasd", [], []);
        return this.instance;
    }
    get mostRecentReport() {
        if (this.lastReport)
            return this.lastReport;
        throw new Error("NO report found");
    }
    set mostRecentReport(value) {
        if (!value)
            throw new Error("no value provided");
        this.addReportText(value);
    }
    describe() {
        console.log("id:", this.id);
    }
    addReportText(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log("Reports?: ", this.reports);
    }
    addEmployee(employee) { }
}
const employee1 = Department.createEmployee("idos");
const accounting = AccountingDepartment.getInstance();
accounting.mostRecentReport = "asdasdasdasd";
console.log("last report: ", accounting.mostRecentReport);
