# HaHa Heros

_Georgia Tech's Bits of Good Spring 2024 Developer assessment by Bryce_

## Quickstart

To run, clone the repository and create a `.env` file in `/frontend` with a `REACT_APP_API_URL` parameter to tell the React app where the REST API is on the server. This is what it should look like:

```
REACT_APP_API_URL = "http://localhost:8080"
```

The server is hardcoded to use port 8080, but you can change this in `/backend/api.js`.

## Issues

If you have the lastpass browser extension installed, you may run into an error with `ResizeObserver`, which I tried to fix but doesn't pertain to release builds of the project. I have tested it without lastpass, and everything seems to work.

## Features

- Ability to Create, Read, Update, and Delete volunteers from the database using the client interface (the bonus API endpoints and interation were implemented).
- Ability to sort volunteers by `hero_project`, ascending or descending (click the arrow next to the "Hero Project Label")
- Ability to filter volunteers by `hero_project` (click filter icon next to "Hero Project")
- Ability to view notes of each volunteer, counting the number of times it was visited

## Technology

This project uses React for the frontend and Express for the backend. More specifically, it uses the Material UI component Library for all of the components (as well as `notistack` for easy snackbars), and React Router for different pages. Axios is used to communicate with the server.

## Remarks

I am not a UI designer, so that's why the Notes and Error page look so ugly. But the rest of the app looks decent. I also know that Material UI X has a component called Data Grid that almost makes this entire project trivial, but I chose not to use that as it wouldn't be a good demonstration of my skills.
Some aspects of the code are not very idiomatic, but I did what I could in the time that I had and I mostly follow React convention and best practices. Also, in hindsight my life would have been made a lot easier with Redux, but whatever, depedency injection with state worked out just fine!
