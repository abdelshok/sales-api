# Intergalactic Sales API on the Command Line Interface

A minimal example of using a Node backend to create a **command line interface** that acts as the API of the first **7/11** grocery based on the surface of Jupiter 🌔

* 📐 [Design Points](#user-content-design-points)
* 🚀 [Demo](#user-content-demo)
* 🎛 [Testing](#user-content-testing)
* 💻 [Local Development](#user-content-local-development)

## Design Points

This project does not have a web or mobile front-end, "only" a back-end. It is the product of **one** npm project. There is therefore only one `package.json` and therefore only one place to run npm commands --> in the root directory.

It is important to note that this project launches a command-line interface (or CLI) that the user will be interacting with, in order to purchase products from the store, create new products, set new prices, etc.

  1. **Node server**: [`./package.json`](package.json)

### How it's done?

Mainly through the use of Inquirer.js, which provides a collection of common interactive command-line user interfaces. Chalk was also used to add a little splash of color, so thank you to all the developers that created and maintained these packages.

**Important**: This is not a website but a command line interface. The "User Interface" is therefore on the terminal, not on your browser.

## Demo

In order to run the application, simply:

  1. Clone this file onto your computer by choosing a directory in your terminal and typing: `git clone https://github.com/abdelshok/sales-api.git`
  2. Type `cd sales-api` in the terminal in order to move into the newly cloned directory
  3. Once in the **sales-api** directory, run: `npm install` to install all of the dependencies 
  4. Finally, run: `node index.js` in the terminal in order to launch the CLI of this revolutionary alien software

After these four steps, you should be able to simply play around with this project and buy products from our store ⚡️

## Testing 

Testing for this application was implemented using the JS framework named Jest for a multitude of reasons, the most important being it's ease of use and quick start time. 

42 tests were set up for this project.

In order to run all tests, run `npm run test` in the terminal of the main project directory (where you also ran `npm install`).

This will run all tests and all should pass. 

**Important**

If you want to log all test descriptions in the terminal and have a detailed look at which tests are being passed, what their input is, and what their output is supposed to be then run:

```bash

npm test -- --verbose

```


## Local Development

This app ids only made of one npm package, there is therefore only one place to run the `npm` command.

1. **Node API server** at the root `./`

### Run the API server

There is no `npm start` script set up here, so running the command in the terminal here will only lead to an error. In order to continuously test out the CLI, make changes to the files, make sure to save, and run `node index.js` to launch the program and review the changes. 

In a terminal:

```bash
# Initial setup
npm install

```

#### Install new npm packages for Node

```bash
npm install package-name --save
```
