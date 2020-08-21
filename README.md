# bean-mock-api-service
Mock API service


# Getting Start

## install
```bash
npm install
```

## start service
```bash
node index.js [mock_files_path [listen_port]]
```

- mock_files_path: default is files in the current directory
- listen_port: default is 1492

## test API

### send request
```bash
curl "http://127.0.0.1:1492/api/heartbeat"
```

### response
```json
{
    "code": "0",
    "message": "ok"
}
```

## stop service
Press CTRL+C to stop the nodejs process.

# How to mock API

## GET API


## POST API

