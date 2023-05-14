# GraphQL_GitHub_API_project
React/redux + graphql project with repositories search on github using api github graphql

<h1 align="center">Opencode</h1>

<p align="center">
  <img src="https://img.shields.io/github/license/XXXmez/opencode?style=flat-square" alt="License">
</p>

<p align="center">
  Opencode is a web application built with React, Redux, GraphQL, GitHub API, Apollo, and Material-UI. The project enables you to search for public repositories on GitHub and sort them by the number of forks/stars and the date of the last update.
</p>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#license">License</a>
</p>

## Installation

To run the project, you need to download this repository and navigate to the `opencode` folder. Then, in the command line, run the command `npm i` to install all the dependencies.

Next, create a file named `.env` in the root directory of the project. This file is used to store environment variables, such as API keys or other configuration values. In the `.env` file, create a variable named `REACT_APP_GITHUB_API_KEY` and assign your private GitHub API key to it.

REACT_APP_GITHUB_API_KEY=your_github_api_key

Note that the `.env` file should never be committed to the repository as it contains sensitive information that should not be shared publicly.

## Usage

To start the project, run the command `npm start` in the command line. This will launch the development server, and the application will be available at http://localhost:3000 in your browser.

Once the project is running, you can use the search bar to find public repositories on GitHub. The search results can be sorted by the number of forks/stars and the date of the last update.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
