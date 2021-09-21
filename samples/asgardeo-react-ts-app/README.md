# React Typescript Sample Application using Asgardeo OIDC JS SDK

## Getting Started

### Register an Application

Follow the instructions in the [Try Out the Sample Apps](../../README.md#try-out-the-sample-apps) section to register an application.

Make sure to add `https://localhost:3000` as a Redirect URL and also add it under allowed origins.

### Configuring the Sample

1. Update configuration file `src/config.json` with your registered app details.

Note: You will only have to paste in the `client ID` generated for the application you registered.

Read more about the SDK configurations [here](../../README.md#initialize) .

```json
{
    "clientID": "<ADD_CLIENT_ID_HERE>",
    "serverOrigin": "<ADD_SERVER_ORIGIN_HERE>",
    "signInRedirectURL": "https://localhost:3000"
}
```

### Run the Application

```bash
npm start
```

The app should open at `https://localhost:3000`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](../../LICENSE)), You may not use this file except in compliance with the License.
