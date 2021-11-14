### Meteor Expo Starter Template
If you're trying to quickly build out an expo app with [meteor](https://meteor.com) and basic features available out of the box, this is the folder where you will find everything you need.

### Get started
Once you clone/download this particular directory on your local machine, you will get 2 folders inside: `meteor-app` containing the Meteor application which works as the backend for the expo app and the `expo-app` directory which is self explanatory.
In the `meteor-app` directory, run the `meteor` command to start up the app and then grab the url from the terminal which is usually `https://localhost:3000`.
In the `expo-app` directory you will need to simply run `yarn` to install all the dependencies and then run `yarn ios` to run the app in ios or `yarn android` to run it on android.

### Where do I find `X` ?
- Linting rules - These are super subjective and I want to get out of your way as much as possible. You can change the linting rules in `.eslintrc.js` file to adjust to your likings.
- Meteor config - These are done via env variable. Following the [.env.example](expo-app/.env.example) file as example, create a `.env` file and fill in the url you got from meteor terminal to form a url that looks like `ws://localhost:3000/websocket` and you're good to go.
- Translation - If you're trying to add your own wording in various hard coded text or add new language to the app, you will find all the translated text in [this file](expo-app/src/translation.json) and the config for i18n [lives here](expo-app/src/i18n.tsx).