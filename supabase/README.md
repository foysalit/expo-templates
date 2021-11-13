### Supabase Expo Starter Template
If you're trying to quickly build out an expo app with [supabase](https://supabase.com) and basic features available out of the box, this is the folder where you will find everything you need.

### Get started
Once you clone/download this particular directory on your local machine, you need to simply run `yarn` to install all the dependencies and then run `yarn ios` to run the app in ios or `yarn android` to run it on android.

### Where do I find `X` ?
- Linting rules - These are super subjective and I want to get out of your way as much as possible. You can change the linting rules in `.eslintrc.js` file to adjust to your likings.
- Supabase config - These are done via env variable. Following the [.env.example](./.env.example) file as example, create a `.env` file and fill in the credentials you got from supabase and you're good to go.
- Translation - If you're trying to add your own wording in various hard coded text or add new language to the app, you will find all the translated text in [this file](./src/translation.json) and the config for i18n [lives here](./src/i18n.tsx).