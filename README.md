# real-time-chat-with-socket

a real-time chat application with file-sharing capabilities using NodeJs and Socket.IO. The application can handle concurrent connections and allow users to send/receive messages and files.

## Run in local machine

- Ensure you have PostgreSql installed.
- Open terminal and run the command to copy the env file from example.

```sh
cd server
cp.env.example ./server/.env
```

- Open `.env` file.
- Set environment variable like this:

```js
APP_NAME=realtime-chat
# Server
HOST=localhost
PORT=3000
API_VERSION=v1

# Database config
DB_PORT=27017
MONGO_DB_URI=mongodb://localhost:27017/realtime-chat

JWT_SECRET=7f8287bc9405a70d00ac30511aae4269e77c5164dd517379554a8361b740e90d
```

- To install the dependency execute the following command.

```sh
npm install && cd server && npm install && cd .. && cd client && npm install && cd ..
```

- To run the application execute the following command.

```sh
npm run start
```

- After that you will see the following message:

```sh
Server running on http://localhost:3000
```

And client running on `http://localhost:5173/`

## Run via docker

- To build and run the application with Docker Compose, navigate to your project's directory in the terminal and run:

```sh
docker-compose up --build
```

- To stop and remove the containers, run:

```sh
docker-compose down
```
