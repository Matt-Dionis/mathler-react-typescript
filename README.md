# Overiew
This project is a Mathler app built in React with TypeScript. Users can play one "daily" game, and after completing it they can generate a new "random" game. All Mathler rules are followed. Users can choose to input answers by clicking the on-screen keypad or using their keyboard.

# Running locally
## To run locally:
* `git clone git@github.com:Matt-Dionis/mathler-react-typescript.git`
* `npm install --legacy-peer-deps`
* `npm start`

## To lint and/or test:
* `npm run lint`
* `npm test`

# CI/CD
GitHub Actions have been configured to run ESLint and Jest tests every time changes are pushed up. These tests need to pass before pull requests can be merged. A Netlify deploy action has also been added to the pull request flow but these deployments still need some work so **please do not expect the deployed site to work for the time being.**

A pull request template has also been added for ease of future PR reviews.

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
1. Fix auto-deploy process
2. Move logic for fetching games and checking game status (complete, success) to a Node.js server
3. Update code to support Mathler AND Wordle game options
4. Add more test coverage
5. Introduce animations to the game UI
6. Investigate adding more input options for accessibility such as voice input