// Import Employee
const Employee = require("./Employee");

// Constructor function for Engineer
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }
  // Gets role
  getRole() {
    return "Engineer";
  }
  // Gets GitHub
  getGithub() {
    return this.github;
  }
  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
