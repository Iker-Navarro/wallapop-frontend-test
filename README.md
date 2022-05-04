# Wallapop Frontend Test

This application is a simple item manager based in a list of products available in a [json file](https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json). located in a remote server

The application was developed following the requirements detailed in the given PDF.

More information and deployment instructions can be found below. 

Be sure to read the "NOTES" section available at the end of the page for some extra explanations.

## Used resources

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.4.

- Angular (13) and its provided utilities
  - SCSS (styling)
  - Karma & Jasmine (Testing)
- Angular Material (13)
- [ngx-slider](https://angular-slider.github.io/ngx-slider/)

## Installation / Deployment

This project, as mentioned above is a common Angular application, using NPM to manage the required packages, so having node.js installed is mandatory to install the app locally.

After cloning or dowloading the code, the first step should be to install the required dependencies.

```
  npm install
```

Having installed all the needed NPM packages we can now proceed to deploy or continue the development of this application.

### Development

We can launch the application in development mode using the following command.

```
  ng serve
```
This command will launch a local server located on [localhost:4200](http://localhost:4200/) which will automatically reload after any changes.

### Testing

This application has some unit tests already developed, to run the test suite or add new ones the following command should be used.

```
  ng test
```
Having done this you will have started a local http server with the purpose of running and displaying the test results, the window should automatically open.

### Build and deployment

To deploy the application into a real web server the following command should be used

```
  ng build
```

This will automatically use webpack to build the application into a new folder named "dist/wallapop-frontend-test".
Depending on the location of the server it might be necessary to use the following option to build the application with the correct base href.

```
  ng build --base-href [different-route]
```

## notes

Due to time constraints, not all the wanted features are present in this current version of the application.

All the functionalities required by the "client" are finished and working as intended, but some changes would be needed to leave the application in an even better state.

- The responsive aspect of the application is lacking
  - Tables are never good on mobile screens
  - A diferent component (card-like entries for each item) should have been developed for smaller sized screens
  - Header should also change for smaller screens, this could easily be achieved using css @Media
  
- Test coverage is not as extensive as it should be.

### Mistakes where made!

The resulting built application has been transpiled to ES5, but doesnt properly work on IE11.

Aparently the Angular framework, in its 13th version has [dropped support for Internet Explorer 11](https://blog.angular.io/angular-v13-is-now-available-cce66f7bc296#:~:text=enabled%20by%20Ivy.-,End%20of%20IE11%20support,-We%20heard%20your).

I hadnt realized this until trying to build the app for the mentioned browser, which isnt working as it seems that the polyfills used in the past for this purposes are gone. I have made some tests but none of them seem to have worked at all.

Currently the only solution available to support IE11 seems to be downgrading the project's angular version to a previous stable release.
