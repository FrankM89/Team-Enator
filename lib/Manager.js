// Import Employee
const Employee = require("./Employee");

// Constructor function for Manager
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
  // Gets role
  getRole() {
    return "Manager";
  }
  // Gets office number
  getOfficeNumber() {
    return this.officeNumber;
  }
}

module.exports = Manager;
