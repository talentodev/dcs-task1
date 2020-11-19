# Deep Consulting Solutions Interview Test 1

## Requirements

- NodeJs 12+
- Npm

## Install and Use

Start by cloning this repository

```sh
# HTTPS
$ git clone https://github.com/talentodev/dcs-task1.git
```

if you don't have NodeJS 12+, Volta can handle that for you

[Just Install Volta](https://docs.volta.sh/guide/getting-started)

then

```sh
# cd into project root
$ npm i

$ npm start
```

the API runs on port 5000.\
You may change it setting an environment variable 'PORT' or altering the file `src/application/rest.js`.

Logs are written into `logs` folder.

## Documentation

While running the API, you can access the docs on the route `/apidoc`

After the first run of the API you can access the docs at `apidoc/index.html`

## Test

```sh
$ npm run test
```
