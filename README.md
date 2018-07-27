# msiawb
# Installation

1.  Angular CLI
    * [Download Angular CLI](https://cli.angular.io/)
2.  NodeJs
    * [Download Nodejs](https://nodejs.org/en/download/)
3.  Package Manager - NPM / Yarn
4.  Clone the repository and run `npm install` if you use **npm** as package manager or `yarn install` if you use **yarn** as package manager.
5.  Angular + Firebase Tutorial - [Angular + Firebase + Typescript — Step by step tutorial](https://medium.com/factory-mind/angular-firebase-typescript-step-by-step-tutorial-2ef887fc7d71)

6. Configure your firebase configuration `src/environments/firebaseConfig.ts`
 ```
    export const FireBaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        databaseURL: "YOUR_DATABASE_URL",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_SENDER_ID"
    }; 
```

7. Run the Server. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Firebase


npm install -g firebase-tools
firebase login
firebase init

For older versions of angular the app builds to the dist folder. Therefore you would type “dist” for the public directory. However, in Angular 6 you must also include you applications name “dist/you_applications_name.” 

ng build --prod
firebase deploy
