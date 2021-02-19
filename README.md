# Wiser ShortURL
> Simple API for short URL's as part of Challenge Encurtador - Backend
> made with Adonis 5, PostgreSQL, Docker & Swagger.
### Objective
The main objective of this repo is to show my skills in creating a simple API  documented and tested.
### Live demo
Click [here](https://acmetrix.com) to go to live demo
## Setup
Clone this repo:
```sh
git clone https://github.com/saulowilson/urlshortener-wiser-adonis.git
```
Then install dependencies using your favorite manager:
```sh
npm install --save
```
or
 ```sh
yarn
```

## Run the project
**Attention:** This repo has a `.env` file included with default necessary variables required by Adonis for a quick start.  If you plan to use this project for your own use, **make sure that include `.env` in your `.gitignore`**.

This project has a pre-configured PostgreSQL and pgAdmin installation in docker. Run **`docker-compose up`** to build up all environment. Change `.env` for custom configuration.

Or run **`yarn dev`** to run locally. PostgreSQL must be installed and running.

## Tests
To run the tests, run `yarn dev` then `yarn test`.

## Swagger Docs
Docs are available in route `/docs`