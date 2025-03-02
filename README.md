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

**Make sure MongoDB is running in the background in port 27017**

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
| Test software for accessibility; can be used with keyboard                                                            |   1    |
| OWN SUGGESTION: Logout page where user can signout                                                                    |   1    |
| **TOTAL**                                                                                                             | **40** |

## Technology choices

### Client side

- React
  - This tool was taught in this course and is much better than to use native JavaScript / TypeScript.
- TailwindCSS
  - This was familiar to me from previous projects, but since this was so large project, I should have probably used MaterialUI
- dnd-kit
  - First option was to build with react-beautiful-dnd but since it was deprecated I chose dnd-kit. I tried to Google other options, but did not find then that pragmatic-drag-and-drop is successsor of react-beautiful-dnd. Otherwise I would have maybe chosen that.

### Server side

- Express
  - Taught in our class and the most obvious choice because of popularity.
- MongoDB
  - Also taught in class and really popular database with good support.
- JwtPayload
  - Taught in class and easy to use.
- bcrypt
  - Taught in class and can encrypt and decrypt passwords.
