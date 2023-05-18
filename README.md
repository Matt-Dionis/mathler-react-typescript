# Overiew
This project is a Mathler app built in React with TypeScript. Users can play one "daily" game, and after completing it they can generate a new "random" game. All Mathler rules are followed. Users can choose to input answers by clicking the on-screen keypad or using their keyboard.

https://github.com/Matt-Dionis/mathler-react-typescript/assets/17889952/11bde965-5f47-4e45-834a-d1605fc8d37c

# Running locally
## To run locally:
* `git clone git@github.com:Matt-Dionis/mathler-react-typescript.git`
* `npm install --legacy-peer-deps`
* `npm start`

## To lint and/or test:
* `npm run lint`
* `npm test`

# CI/CD
GitHub Actions have been configured to run ESLint and Jest tests every time changes are pushed up. These tests need to pass before pull requests can be merged. A Netlify deploy action has also been added to the pull request flow and **the latest deployed application can be found at https://unique-cheesecake-7382c5.netlify.app/.**

<img width="875" alt="Screenshot 2023-05-18 at 4 34 38 PM" src="https://github.com/Matt-Dionis/mathler-react-typescript/assets/17889952/6b42f50e-6fb3-4660-879c-4c1083f0ab20">

A pull request template has also been added for ease of future PR reviews.

<img width="859" alt="Screenshot 2023-05-18 at 4 35 22 PM" src="https://github.com/Matt-Dionis/mathler-react-typescript/assets/17889952/ed06611b-6cf9-47bd-b8a7-4bd8685232c1">

# Code design decisions
This React application was built with TypeScript to enforce build-time type safety checks. CSS modules were introduced to make CSS more manageable. ESLint was introduced to catch code style issues before changes are pushed up.

## Game data
Game data is currently hard-coded on the frontend. This choice was made in order to remain focused on frontend concerns. A fast-follow improvement would be to move this code to a Node.js server.

## Client-side state management
The React Context is used to manage client-side state. This context is accessed through `GameProvider`. The `useGame` hook holds all logic to manage state defaults and changes.

## Modularity
This application is broken down into small, focused, modular components such as `Grid`, `Box`, and `Keypad`. The architecture is flexible enough that offering the option for users to switch between Mathler and Wordle using the same components will not be much of a lift

## Testing
* Unit testing is focused on the custom `useGame` hook which holds the vast majority of the game logic. The tests cover adding digits and operators, attempting incorrect answers, deleting digits or operators, submitting correct answers, etc.
* Integration tests focus on how the components lay out and interact. The presence, and absence, of certain elements and classes is verified.

_Note that the tests in place are just a starting point and coverage can be improved further._

## Misc
The value of the solution attempt equation needs to be checked when each attempt is submitted. `eval` use was avoided for security reasons in favor of `Function(...)()`. This logic, ideally, will be moved to the server and security precautions enhanced. 

# Next steps
1. Move logic for fetching games and checking game status (complete, success) to a Node.js server
2. Update code to support Mathler AND Wordle game options
3. Add more test coverage
4. Introduce animations to the game UI
5. Investigate adding more input options for accessibility such as voice input