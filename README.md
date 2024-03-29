# Interview Scheduler

## Setup

Install dependencies with `npm install`.

Install and run [Scheduler-api](https://github.com/lighthouse-labs/scheduler-api)

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Product Overview

---

### Daylist shows available spot/s remaining, background turns red on hover and turn white when selected.

![select day](https://github.com/amuliawijaya23/scheduler/blob/master/assets/day-select.gif?raw=true)

---

### Creating new appointment

![new booking](https://github.com/amuliawijaya23/scheduler/blob/master/assets/book_interview.gif?raw=true)

---

### Form validation with error message

![form validation](https://github.com/amuliawijaya23/scheduler/blob/master/assets/form-validator.gif?raw=true)

---

### Edit appointment

![edit appointment](https://github.com/amuliawijaya23/scheduler/blob/master/assets/update_and_delete_bookings.gif?raw=true)

---

### Delete appointment

![delete appointment](https://github.com/amuliawijaya23/scheduler/blob/master/assets/delete-interview.gif?raw=true)

---

### Websocket connections

Add and cancel appointment

![websocket](https://github.com/amuliawijaya23/scheduler/blob/master/assets/websocket_connection.gif?raw=true)

Edit appointment

![websocket](https://github.com/amuliawijaya23/scheduler/blob/master/assets/websocket-edit.gif?raw=true)

---

## Functional Requirements

- Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
- Jest tests are used through the development of the project.

## Behavioural Requirements

- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Technical Specification

- React
- Webpack, Babel
- Axios, WebSockets
- Axios
- Storybook, Webpack Dev Server, Jest, Testing Library
