# Intergalactic Sales API on the Command Line Interface

A minimal example of using a Node backend to create a **command line interface** that acts as the API of the first **7/11** grocery based on the surface of Jupiter 🌔

* 📐 [Design Points](#user-content-design-points)
* 🚀 [Demo](#user-content-demo)
* 🎛 [Testing](#user-content-testing)
* 💻 [Local Development](#user-content-local-development)

## Design Points

This project does not have a web or mobile front-end, only a back-end. It is the product of **one** npm project. There is therefore only one `package.json` and therefore only one place to run npm commands --> in the root directory.

It is important to note that this project launches a command-line interface (or CLI) that the user will be interacting with, in order to purchase products from the store, create new products, set new prices, etc.

  1. **Node server**: [`./package.json`](package.json)
      * Add more comments here

## Demo

In order to run the application, simply:

  1. Clone this file onto your computer by choosing a directory in your terminal and typing: `git clone https://github.com/abdelshok/sales-api.git`
  2. Type `cd sales-api` in the terminal in order to move into the newly cloned file
  3. Once in the **sales-api** directory, run: `npm install` to install all of the dependencies 
  4. Finally, run: `node index.js` in the terminal in order to launch the CLI of this revolutionary alien software

After these four steps, you should be able to simply play around with this project and buy products from our store ⚡️

## Testing 

Testing hasn't been implemented yet for this project, but should be done so through npm test most likely.

## Local Development

This app ids only made of one npm package, there is therefore only one place to run the `npm` command.

1. **Node API server** at the root `./`

### Run the API server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for Node

```bash
npm install package-name --save
```
