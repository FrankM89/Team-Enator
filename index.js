// Import lib files
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const DIST_DIR = path.resolve(__dirname, "dist");
const distPath = path.join(DIST_DIR, "team.html");

const render = require("./src/page-template.js");

const teamMembers = [];
const idArray = [];

// I
console.log("\nWelcome! Let's build a team!\n");

// Function to create manager role/name/ID/email/office number
function appMenu() {
  function createManager() {
    console.log("Build your team");
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is the manager's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter their name before continuing.";
          },
        },
        {
          type: "input",
          name: "managerId",
          message: "What is the manager's ID number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter their ID number.";
          },
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What is the manager's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter their email address.";
          },
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "What is the manager's office number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter their office number.";
          },
        },
      ])
      .then((answers) => {
        // Creates manager if criteria is met
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }
  // Create team members that aren't a manager
  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which one would you like to add?",
          choices: ["Engineer", "Intern", "Nothing"],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is the engineer's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter their name before continuing.";
          },
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is your engineer's ID number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return "This ID is already taken buddy.";
              } else {
                return true;
              }
            }
            return "Please enter their ID number before continuing.";
          },
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What is the engineer's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter their email address.";
          },
        },
        {
          type: "input",
          name: "engineerGitHub",
          message: "What is your engineer's GitHub username?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter their GitHub username.";
          },
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGitHub
        );
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is your intern's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter their name before continuing.";
          },
        },
        {
          type: "input",
          name: "internId",
          message: "What is your intern ID number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return "This ID is already taken, try again!";
              } else {
                return true;
              }
            }
            return "Please enter their ID number.";
          },
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is your intern's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter their email address.";
          },
        },
        {
          type: "input",
          name: "internSchool",
          message: "What is your intern's Schooling?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter their School.";
          },
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(intern);
        idArray.push(answers.internId);
        createTeam();
      });
  }

  function buildTeam() {
    // Create the output directory if the dist path doesn't exist
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR);
    }
    fs.writeFileSync(distPath, render(teamMembers), "utf-8");
  }
  // Create manager
  createManager();
}

// AppMenu callback function
appMenu();
