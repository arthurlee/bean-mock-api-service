# bean-mock-api-service
Mock restful API service.


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

# How to mock API data

## GET API
GET http://127.0.0.1:1492/api/heartbeat   => files\_api_heartbeat_get.json

## POST API
POST http://127.0.0.1:1492/api/user/create   => files\_api_user_create_post.json

## Additional pseudo mechanism
GET http://127.0.0.1:1492/api/user?pseudo=1   => files\_api_user_get_1.json
POST http://127.0.0.1:1492/api/course?pseudo=2   => files\_api_course_post_2.json
