# KanbanApp

## Installation

### Install dependencies

Stay in root directory and do the following:

Client packages:<br>
`npm run preinstall`

Server packages:<br>
`npm install`

OR run both at the same time:<br>
`npm run preinstall && npm install`

### Set .env file to server

`echo "JWT_SECRET=YOUR_SECRET" >> server/.env`

## Run project

Run client:<br>
`npm run dev:client`

Run server:<br>
`npm run dev:server`

## AI Declaration

I used GitHub Copilot for ideas of implementation, code generation, autocompletion and to clarify how certain things work.

I also used ChatGPT when I was not actively coding to give me ideas of how I could do certain things better or what are some ways to do certain things.

## Features and points

| Feature                                                                                                               | Points |
| :-------------------------------------------------------------------------------------------------------------------- | :----: |
| Basic features with well written documentation                                                                        |   25   |
| Utilization of a frontside framework, React                                                                           |   3    |
| Cards can be reordered with drag and drop                                                                             |   2    |
| User has the option just to double click any edible content (column header) and edit it                               |   4    |
| Cards and comments have visible timestamps when they have been created and updated (moving to another column updates) |   4    |
| Test software for accessibility; can be used only with keyboard                                                       |   1    |
| **TOTAL**                                                                                                             | **39** |

## Technology choices

I decided to build my app with React, Express and TailwindCSS. I chose React and Express just because they were familiar to me from the course and Tailwind because it is familiar to me from previous own projects.

### Client side

- React
- TailwindCSS
- dnd-kit

### Server side

- Express
- MongoDB
- JwtPayload
- bcrypt
