<h1 align="center"><code>wec03-server</code></h1>

<div align="center">
	<sub>Developed by <a href="https://github.com/CoulonAntoine/">ancoulon</a></sub>
</div>

---

## Description

`wec03-server` is a Node.js net server created to recieve submissions to the [week-end challenge 03](https://github.com/tutoriginal/we-challenge/tree/master/wec03).

## Setup

### Dependencies:
- `node`
- `npm`
- a `mongodb` server

### Installation
Clone and enter the server repository
```shell
$ git clone https://github.com/tutoriginal/wec03-server
$ cd wec03-server
```
Install dependencies with `npm`
```shell
$ npm install
```
Create a `.env` file and add the folowing lines
> api.42.fr application uid
```js
API_UID=uid
```
> api.42.fr application secret
```js
API_SECRET=secret
```
> MongoDB connection uri
```js
MONGO_URI=uid
```
> server port
```js
PORT=port
```
> define LOG to anything to log valid requests on **stdout**
```js
LOG=true
```
> set SAVE to anything to save valid requests to the database
```js
SAVE=true
```
> set TIMO to the time until the request times out (in milliseconds). do no set to remote timeout
```js
TIMO=3000
```
Run the server
```shell
$ node src/server.js
```

## Credits

Developed by [@CoulonAntoine](https://github.com/CoulonAntoine) for [@tutoriginal](https://github.com/tutoriginal).

## License

This project is provided under the [MIT License](/LICENSE).