# node-dispatcher-demo

Dispatcher pattern demo with Promises.

## Build

```
npm install && npm run dist
```

## Usage

```
npm start
```

```
curl -H "Content-Type: application/json" -X POST -d '{"event":"foo","data":"bar"}' http://localhost:3000/
```
