class Company {
  constructor() {
    this.departments = [];
  }
  addEmployee(username, Salary, Position, Department) {
    if (username == "" || username == undefined || username == null) {
      throw new Error("Invalid Input");
    }
    if (Salary == "" || Salary == undefined || Salary == null || Salary < 0) {
      throw new Error("Invalid Input");
    }
    if (Position == "" || Position == undefined || Position == null) {
      throw new Error("Invalid Input");
    }
    if (Department == "" || Department == undefined || Department == null) {
      throw new Error("Invalid Input");
    }
    if (!this.departments[Department]) {
      this.departments[Department] = [];
    }
    this.departments[Department].push({
      username,
      Salary,
      Position,
    });
    return `New employee is hired. Name: ${username}. Position: ${Position}`;
  }
  bestDepartment() {
    let depart = "";
    let bestSalary = 0;
    let department = Object.entries(this.departments);
    for (const line of department) {
      let salary = 0;
      for (const current of line[1]) {
        salary += current.Salary;
      }
      salary = salary / line[1].length;
      if (salary > bestSalary) {
        depart = line[0];
        bestSalary = salary;
      }
    }
    let result = `Best Department is: ${depart}\nAverage salary: ${bestSalary.toFixed(2)}\n`;
    let sorted = Object.values(this.departments[depart]).sort((a, b) => {
      if (b.Salary - a.Salary != 0) {
        return b.Salary - a.Salary;
      } else {
        return a.username.localeCompare(b.username);
      }
    });
    for (const worker of sorted) {
      let current = `${worker.username} ${worker.Salary} ${worker.Position}\n`
      result += current
    }
    return result.trim()
  }
}
let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());
/*
Best Department is: Construction
Average salary: 1500.00
Stan 2000 architect
Stanimir 2000 engineer
Pesho 1500 electrical engineer
Slavi 500 dyer
*/
