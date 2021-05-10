# Busbud Coding Challenge

## Table of Content

- [Getting Started](#getting-gtarted)
  - [Manual Setup](#manual-setup)
  - [Docker Setup](#docker-setup)
- [API Documentation](#api-documentation)
  - [API Description](#api-description)
  - [Example](#example)

## Getting Started

### Manual Setup

#### Prerequisites

You are going to need:

- `Git`
- `nvm` (or your preferred node version manager)
- `Node.js`

#### Setting up your environment

1. Begin by forking this repo and cloning your fork. GitHub has apps for [Mac](http://mac.github.com/) and
   [Windows](http://windows.github.com/) that make this easier.

2. Install [nvm](https://github.com/nvm-sh/nvm#install--update-script) or your preferred node version manager.

3. Install [Node.js](http://www.nodejs.org).

### Setting up the project

1. Clone the repository:

```bash
$ git clone https://github.com/nnfunny/practice-test-trip-social.git
```

2. Change directionry:

```bash
$ cd question-4
```

3. Install dependencies:

```bash
$ nvm use
$ npm install
```

### Running the tests

The test suite can be run with:

```bash
$ npm run test
```

#### Starting the application

To start a local server run:

```bash
$ npm run start
```

It should produce an output similar to:

```bash
App listening at http://localhost:8080
```

### Docker Setup

1. Install [Docker](https://docs.docker.com/get-docker/)
2. Clone the repository:

```bash
$ git clone https://github.com/nnfunny/practice-test-trip-social.git
```

3. Change directionry:

```bash
$ cd question-4
```

4. Build the docker image and run the container

```bash
$ npm run docker
# or
$ docker-compose -f docker-compose.yml up -d --build
```

It should produce an output similar to:

```bash
App listening at http://localhost:8080
```

The above output can view via `docker logs`

## API Documentation

### API Description
``` 
GET /suggestions?q=[city]&latitude=[latitude]&longitude=[longitude]
```
__Request__ `GET`

| Query     | Type   | Description          |
|-----------|:------:|----------------------|
| q         | string | Location name        |
| latitude  | number | Location's latitude  |
| longitude | number | Location's longitude |

__Response__
| Field       | Type   | Description                   |
|-------------|:------:|-------------------------------|
| suggestions | array  | A list of suggested locations |


### Example

Send the `GET` request:
```
GET /suggestions?q=Londo&latitude=43.70011&longitude=-79.4163
```
Response Sample:
```json
{
  "suggestions": [
    {
      "name": "London, 08, Canada",
      "latitude": "42.98339",
      "longitude": "-81.23304",
      "score": 0.9
    },
    {
      "name": "London, OH, USA",
      "latitude": "39.88645",
      "longitude": "-83.44825",
      "score": 0.6
    },
    {
      "name": "Londontowne, MD, USA",
      "latitude": "38.93345",
      "longitude": "-76.54941",
      "score": 0.5
    },
    {
      "name": "New London, CT, USA",
      "latitude": "41.35565",
      "longitude": "-72.09952",
      "score": 0.4
    },
    {
      "name": "Londonderry, NH, USA",
      "latitude": "42.86509",
      "longitude": "-71.37395",
      "score": 0.4
    },
    {
      "name": "New London, WI, USA",
      "latitude": "44.39276",
      "longitude": "-88.73983",
      "score": 0.4
    },
    {
      "name": "London, KY, USA",
      "latitude": "37.12898",
      "longitude": "-84.08326",
      "score": 0.3
    }
  ]
}
```