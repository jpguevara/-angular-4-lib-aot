
# Angular 4 Library Project With Aot And Sass

## Prerequisites

1. [Node](https://nodejs.org/en/) **Make sure you have Node version >= 7.0 and NPM >= 4**
2. [Yarn](https://yarnpkg.com/lang/en/docs/install/)
3. [Angular CLI](https://github.com/angular/angular-cli)

## Installation and first run

```bash
# Clone the repo.
git clone https://github.com/jpguevara/angular-4-lib-aot.git

# Run setup command and follow the steps.
yarn run setup 

# Run build command
yarn run build
```

## Build and Test

1. npm run build
1. npm run test
1. npm run start

## Build system

Because this is a library project, the build has to be tweeked a little to allow the required funcionalities.
This functions include:
- AOT compilation, compile sass into css. 
- Embed the templates and styles into its own component.
- Include the components into the final build, this prevent the treeshake for lazy loaded routes.

**Steps:**
1. cleans the build directory 
2.  copy and inlines all the resouces to .aot/, 
    copy all the templates next to the components 
    this step transform all scss into css
    embeds all the html/css code into the components.
3. runs the **ngc** compiler with aot to transpile into js.
    this will also include the required metadata and **.d.ts**  all the necesary files to be released.
4. move the .aot/ to dist/ and copies the package.json to dist/
