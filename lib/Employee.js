// Constructor function for Employee
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
  // Gets name
  getName() {
    return this.name;
  }
  // Gets ID
  getId() {
    return this.id;
  }
  // Gets email
  getEmail() {
    return this.email;
  }
  // Gets role
  getRole() {
    return "Employee";
  }
}

module.exports = Employee;
