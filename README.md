### Expo Templates
Hello stranger of the interwebz! If you're like me and like to prototype on ideas that don't let you sleep at night until you have it out of your head and into an app but hate wasting hours on build tools, package installation and boilerplate code, CONGRATS! you've found the holy grail!

In this repository, I will be adding a bunch of templates for you to use to get started with your app on [Expo](https://expo.io) with various server side technologies.

https://user-images.githubusercontent.com/1919066/141658631-93184d55-df92-48e7-bd7c-3cbb4a80173e.mp4
> Video overview

### Available Templates
- [Supabase](./supabase)
- [Meteor](./meteor)


### Features
In every template, besides a variable setup with different backend technologies, you will have the following common features out of the box:
1. Authentication 🔐
2. Translation 🇬🇧🇮🇹
3. Navigation 🚏
4. Styling 🎨
5. Linting 💄
6. E2E Testing ✅

#### Authentication 🔐
The template will connect to the backend and setup Sign in and Sign up forms with common user flows such as switching between forms and automatically making main content pages of the app protected behind authentication pages using react-navigation's routing technique.

#### Translation 🇬🇧🇮🇹
The template will not have any hardcoded strings, instead it will use the [i18n-next](https://npmjs.org/i18n-next) along with [react-i18next](https://www.npmjs.com/package/react-i18next) library to translate all static content. Using [expo-localization](https://docs.expo.dev/versions/latest/sdk/localization/) it will always load the app in user's device language on first entry but allow the user to switch to other language and the preference will be maintained on app restart.
For now, only italian and english language is supported but it should be very simple to add other languages following the current setup.

#### Styling 🎨
Most of the content in the template are styled using [tailwind-rn](https://github.com/vadimdemedes/tailwind-rn). The code resulting from this choice may not look ideal which is why there are a few components provided as example which shows how to build your own component library within the app with most commonly used/needed elements and styles.`

#### Navigation 🚏
All navigation and routing is done via [react-navigation](https://reactnavigation.org/) library. The template **uses bottom tab navigator** as the main navigation strategy of the app. There are examples included for modal screen implementation that overlays the main tabs.

#### Linting 💄
Using typescript, eslint and prettier, all the templates have clean, consistent and bug-free code. The linter will run on every commit to ensure you're not committing any code with error or non linter-compliant code.

#### E2E Testing ✅
One of the most complex thing to setup around react native/expo apps is e2e tests due to tooling, outdated packages etc. The template will have out of the box setup for e2e testing with [detox](https://github.com/wix/Detox) with tests for existing features which will help you write your own tests on top of it.