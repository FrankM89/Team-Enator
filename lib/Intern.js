// Import Employee
const Employee = require("./Employee");

// Constructor function for Intern
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }
  // Gets role
  getRole() {
    return "Intern";
  }
  // Gets school
  getSchool() {
    return this.school;
  }
}

module.exports = Intern;
