# Astro App Template

A minimal template repo for creating ZCLI Apps in Zendesk using Astro. Astro lets you bring your own front-end framework or no framework at all.

There are custom dev and build scripts in the `scripts` folder that you can use but they may need adjusted for your specific app/environment.
You can run them with `bun dev:auto` and `bun build:auto`

## Using Zendesk Garden

There is a branch called `garden` that has React and Zendesk Garden set up if you'd like to use those. This main branch is kept minimal and framework agnostic.

## Development Workflow

The Dev workflow leverages Astro's Dev mode.

1. Run `bun dev` or your runtime equivalent to start the dev server
2. By default Astro runs on `http://localhost:4321/`
3. Update the `app/manifest.json` file with your dev server URL
   - You will need to update file paths for all of your app locations
   - For example `/assets/index.html` will be replaced with `http://localhost:4321/index.html`
4. Run `zcli apps:server` to start the zcli server
5. Do your development stuff
6. When you are completed, change your URLs in `app/manifest.json` back to file paths

## Deploying to Production

To make sure your bundled assets will be loaded properly in production, you will need to provide Astro with your installation ID

1. Use `zcli login -i` to authenticate with your desired Zendesk instance
2. Run `zcli apps:create` to deploy your app to Zendesk.
3. You should receive an `app_id` in the terminal from ZCLI.
   - It can also be found in the file at `app/zcli.apps.config.json`
4. Update the `astro.config.mjs` file to use your installation ID
   - You will want to update the `assetsPrefix` value from `/0/assets/`
   - If your ID is `112233` for example, you will change it to `/112233/assets`
5. Make sure your `app/manifest.json` is updated and not using localhost.
6. Rebuild your app with `bun run build` or your runtime equivalent
7. Run `zcli apps:update` to update your deployed app.
8. In the future you can skip steps 1-4 as long as you are deploying to the same instance.
