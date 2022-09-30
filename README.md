# PMEX events

A Vue.js version of [pm-events.github.io](https://github.com/pm-events/pm-events.github.io).

Since 2022-09-28, the project moved to Vite for tooling from the Webpack-based Vue CLI.

## Generate new rumors
In `bin/events.log`, paste the dates provided in the Discord channel. The format should be:
```
EVENT TITLE
START DATE
END DATE

EVENT TITLE
START DATE
END DATE

...
```

Then run:

`npm run generate`

The new rumors will be then in `bin/new_rumors.json`.

In case the result is weird, verify the event log has no weird data (sometimes Discord adds the messages time
to the copied content).

Remember to add the magic *grid*, *EX* or *gridEX* in square brackets e.g. `[gridEX]` where needed.

## Add new events / announcements
Create your own fork and add the relevant information in the proper JSON file within the `public`
folder, then create a pull request.

The resources do already all the filtering, so no additional cleanup is required in the JSONs.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run start
```

### Compiles and minifies for production
```
npm run build
```

### Preview the production build
```
npm run start:prod
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuring Vite](https://vitejs.dev/config/).
