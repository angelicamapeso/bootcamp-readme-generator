const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js')

// array of questions for user
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of this project?',
    validate: noNewlineChar,
  },
  {
    type: 'input',
    name: 'description',
    message: 'Describe this project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'How do you install this project?',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'How do you use this project?',
  },
  {
    type: 'list',
    name: 'license',
    message: 'What license does this project fall under?',
    choices: [
      'Apache License 2.0',
      'GNU GPLv3',
      'MIT License',
      'ISC License',
      ],
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'How may others contribute to this project?',
  },
  {
    type: 'input',
    name: 'test',
    message: 'What are some tests for this project?',
  },
  {
    type: 'input',
    name: 'userName',
    message: 'What is your GitHub username?',
    validate: noNewlineChar,
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email?',
    validate: noNewlineChar,
  },
];

//validation function
function noNewlineChar(input) {
  return new Promise((resolve, reject) => {
    if (input.includes('\\n')) {
      resolve('Cannot include new line characters!');
    } else {
      resolve(true);
    }
  });
}

// function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName,data,err => {
    if (err) throw err;
    console.log('Success!');
  });
}

// function to initialize program
async function init() {
  const answers = await inquirer.prompt(questions);
  const markdown = generateMarkdown(answers);
  writeToFile('genSampleReadme.md', markdown);
}

// function call to initialize program
init();
