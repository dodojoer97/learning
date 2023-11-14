// Code goes here!
abstract class Department {
  protected employees: string[];
  private name: string;
  protected id: string;
  constructor(id: string, name: string, employees: string[]) {
    this.id = id;
    this.name = name;
    this.employees = employees;
  }

  static createEmployee(name: string) {
    return {
      name
    };
  }

  abstract describe(this: Department): void;
  public addEmployee(employee: string) {
    if (!this.employees) return;
    this.employees.push(employee);
  }

  public printEmployeeInformation() {
    console.log("employees length: ", this?.employees?.length);
    console.log("employees: ", this.employees);
  }
}

class ITDepartment extends Department {
  public admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT", []);
    this.admins = admins;
  }

  describe(): void {
    console.log("it: ", this);
  }
}

// const IT = new ITDepartment("123", ["dodo"]);

// IT.describe();
// console.log("it: ", IT);

class AccountingDepartment extends Department {
  private reports: string[];
  private lastReport: string;
  private static instance: AccountingDepartment;

  private constructor(id: string, employees: string[], reports: string[]) {
    super(id, "Accounting", employees);
    this.reports = reports;
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (this.instance) return this.instance;
    this.instance = new AccountingDepartment("asdasd", [], []);
    return this.instance;
  }
  get mostRecentReport() {
    if (this.lastReport) return this.lastReport;
    throw new Error("NO report found");
  }

  set mostRecentReport(value: string) {
    if (!value) throw new Error("no value provided");
    this.addReportText(value);
  }

  public describe(): void {
    console.log("id:", this.id);
  }

  addReportText(text: string): void {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports(): void {
    console.log("Reports?: ", this.reports);
  }

  public addEmployee(employee: string): void {}
}

const employee1 = Department.createEmployee("idos");

const accounting = AccountingDepartment.getInstance();

accounting.mostRecentReport = "asdasdasdasd";
console.log("last report: ", accounting.mostRecentReport);
