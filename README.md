# Getting Started with Create React App

This repository contains the frontend solution of the homework assignment. The backend lives [here](https://github.com/Mircea-Gosman/goTo-homework-assignment-helper-server).

## Commands
The project uses npm!

### Setup

```
npm install
```

### Test

```
npm run test
```

### Development
The project opens in a browser at [http://localhost:3000](http:localhost:3000).

```
npm run start
```

## Description

### UI Design
Upon receiving the homework assignment description, I set out to do design the application in Figma. I based it on the GoTo [brand guidelines](https://brandpad.io/goto-brand-guidelines/). In order to fit development within the allocated time, I downsampled the complete feature set to exclude task status filtering and task title searching. My Figma free tier is out of share links, so here are screenshots of my designs:

#### User sign-in route `/`


#### Full-feature task management dashboard `/dashbaord`

#### Reduced feature task management dashboard `/dashboard` (implemented

### Codebase considerations

#### Data Manipulation
To support the proposed two routes, I built an [express server](https://github.com/Mircea-Gosman/goTo-homework-assignment-helper-server) and used a [normalized Redux store](https://github.com/brietsparks/normalized-reducer) to gracefully handle CRUD operations on the frontend.

#### Tools
This project was built using `create-react-app` with `Typescript` and `Tailwind css`. Every component has been built from scratch to match the brand guidelines. The only exception is the calendar datepicker, which was sourced from [here](https://github.com/OMikkel/tailwind-datepicker-react).

#### UX Considerations

##### Responsiveness
The website is response as tested on my Windows 11 + Chrome 29" Desktop and on my Iphone 13 Pro. My other-projects experience has it that mileage may differ on devices with different viewport despite best efforts. 

#### Throttling
Task title and description updates to the server use throttling. These input fields delay server communication by 1 second from each keystrike, but do not delay local state update in order to upkeep a smooth user experience.

#### Transitions
Some transitions, such as the dashboard Logo hiding on scroll, error-banner fade on error trigger, and task status fade have been added to improve the quality of the interface.

#### Bonus Features
I have implemented two bonus features from the homework assignment description requirements because they flew in naturaly in the proposed design without much additional work:

* Red text 'Overdue' status display on the frontend
* Title and End Date filtering on the frontend

#### Tests
For this project, I have only had time to complete user end-to-end testing as showcased in the video demo. Unfortunately, the allocated time for this project did not allow for robust testing. 

#### Future Improvements
Some near-future improvement recommendations include:
* Implement full-feature design (status filtering, title searching)
* Paginated task-query on list scroll
* Smooth task-open transition
* Scroll to newly created task (not tested)
* PassKey authentication
* Persist Redux State on page refresh (currently, refreshing loses user state and redirects to sign-in)