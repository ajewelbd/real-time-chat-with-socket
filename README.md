# real-time-chat-with-socket

a real-time chat application with file-sharing capabilities using NodeJs and Socket.IO. The application can handle concurrent connections and allow users to send/receive messages and files.

## Technology Used:

### Server:

1. Node.Js
2. Express.Js
3. Socket.IO
4. MongoDB.
5. JWT
6. Jest

### Frontend:

1. Vite
2. Recat.Js
3. Tailwindcss
4. Socket.Io client

## Features

- Real-time chat with users.
- File sharing.
- Persistent storage of chat history and file metadata in mongodb.
- JWT based authentication for secure registration & login.

## Setup and Installations

### Run in local machine

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git (optional)
- Docker (optional)

### Steps

1. Clone the repository.

```sh
git clone https://github.com/ajewelbd/real-time-chat-with-socket.git
cd real-time-chat-with-socket
```

2. Install dependencies:

```sh
npm install && cd server && npm install && cd .. && cd client && npm install && cd ..
```

3. Set up environment variables:

- Go to `server` folder.
- Create a `.env` file.
- Or open terminal and run the command to copy the `.env` file from example. Command as like as:

```sh
cp ./.env.example ./.env
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
MONGO_DB_URI=mongodb://localhost:27017/realtime-chat

JWT_SECRET=7f8287bc9405a70d00ac30511aae4269e77c5164dd517379554a8361b740e90d
```

4. Start the MongoDB server.
5. Run the application from root folder by executing the following command.

```sh
npm run start
```

### Running the Application

- The server will start on `http://localhost:3000`
- To interact with the API, you can use Postman or any HTTP client. (A link to the Postman collection is provided in the Postman Documentation section).
- Client running on `http://localhost:5173/`

## Run via docker

- Ensure `.env` file properly configured.
- To build and run the application with Docker Compose, navigate to the project's directory in the terminal and run:

```sh
docker-compose up --build
```

- To stop and remove the containers, run:

```sh
docker-compose down
```

## Test(Unit) the application

- For unit testing, `jest` library is used.
- To run the test execute following command in terminal:

```sh
npm run test
```

## Thought Process

1. Her I use `API Versioning`. To provide backward/forward comapatibility simentenously. Or support multi version of the API to serve differrent purposes.
2. I choose Socket.IO for real-time communication because it provides easy handling of WebSocket connections and is widely used in chat applications.
3. MongoDB was chosen for its flexibility with document-based storage. User info, chat messages, file meta data are stored in diffrent collections. This makes the process easier to query.
4. JWT-based authentication ensures that user sessions are secure. Token is generated while user registered or logged in. Prtoceted routes are remain secured for the token.
5. For file sharing I use `multer`, a nodejs library. Which is support both in memory and disk storage. It uses nodejs `Buffer`. Multer stores the file data in a `Buffer`. Since the file is uploaded in parts Multer internally streams the files as it rececives the data in chunks. These chunks are accumulated and converted into a complete `Buffer`.
6. I wrote unit tests for individual services like authentication and user registration. I use `jest`, a javascript library. It is easy to implement.

## Assumptions

1. Assumed that the files being shared are of a reasonable size to be processed via streams. No restrictions applied right now.
2. Only text messages and metadata are stored, not the actual files. Files are stored on the filesystem.
3. Assumed that no real-time notification are sent.
4. Assumed that no email verfication will be applied.

## Postman Documentation

A Postman collection has been created to simplify testing the API. [Postman Documentation Link](https://documenter.getpostman.com/view/7952819/2sAXxV6A9z)
This includes routes for registration, login, joining rooms, sending messages, and file sharing.

## Some Test Cases

## 1. Authetication Tests

### 1.1 Register

| Number |                  Case                   |             Input              |                 Expected Output                 |
| -----: | :-------------------------------------: | :----------------------------: | :---------------------------------------------: |
|      1 |      Successfully register a user       | A valid name, email & password |     Returns a success message and JWT token     |
|      2 | Register fails due to an existing email |  An already resigtered email   | Returns an error message "User already exist!." |

### 1.2 Login

| Number |                   Case                   |              Input               |                Expected Output                 |
| -----: | :--------------------------------------: | :------------------------------: | :--------------------------------------------: |
|      1 |       Successfully logs in a user        |      Valid email & password      |    Returns a success message and JWT token     |
|      2 | Register fails due to incorrect password | Valid email & incorrect password | Returns an error message "Invalid credentials" |

## 2. User Info & Token Tests

| Number |                        Case                        |          Input           |                     Expected Output                     |
| -----: | :------------------------------------------------: | :----------------------: | :-----------------------------------------------------: |
|      1 |             Authenticated user details             | Request with valid token |           Returns Authenticated user details            |
|      2 |             Failed to get user details             |  Request without token   |         Returns an error message "Unauthorized"         |
|      3 | Get the user list as friends of authenticated user | Request with valid token | Returns the list of users except the authenticated user |

### 3. Chat Tests

| Number |                           Case                           |                      Input                       |              Expected Output               |
| -----: | :------------------------------------------------------: | :----------------------------------------------: | :----------------------------------------: |
|      1 | Get the message history of authenticated user & a friend |           Request with user(friend) id           |     Returns message history as `Array`     |
|      2 |            Failed to get the message history             |  Request without or with wrong user(friend) id   | Returns an error message "User not found!" |
|      3 |       Send message from two accounts to each other       | Message & message type with sender & receiver id |       Receiver will see the message        |

### 4. File Sharing Tests

| Number |                   Case                   |   Input    |      Expected Output       |
| -----: | :--------------------------------------: | :--------: | :------------------------: |
|      1 | Successfully send a file to the receiver | Valid file | Receiver will see the file |

### 5. Error Handling Tests

| Number |                   Case                    |                 Input                 |                Expected Output                |
| -----: | :---------------------------------------: | :-----------------------------------: | :-------------------------------------------: |
|      1 |         Handle invalid JWT Token          |      Expire or mailformed token       | Returns an error message "Token is not valid" |
|      1 | Handle missing fields while user register | A valid email & password without name |   Returns an error message "Invalid input"    |

### 6. Unit Tests

- Mock user resgistration.
- Token genration after registration/login.
