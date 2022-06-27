# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Specifications


## V1 requirements
### Primary task description
* User needs to annotate an image displayed by the application
* The application displays an image of a socket
* A socket contains pins which needs to be annotated by outlining the edges. 
* The user can outline the edge of a pin by clicking on top of the edge which will draw a point on top of the image
* A newly drawn point will always be associated by the currently selected pin
* After a sufficient number of points an ellipse will be drawn which connect the points
* If annatoted correctly the ellipse will outline the edge of the pin
* The user can change the currently selected pin to another pin
* The user can submit the annotation of the points
* The annotation task should be time efficient
    * Currently for V1 the average take for an annotation is 15 minutes


#### Aditional functionalities
* The user can click on a drawn point to select it
* The user can delete selected points by pressing 'Delete' on the keyboard
* The user can change the position of a point by clicking on top of the point and by holding it down and moving the mouse can change the position of the point to the position of the mouse  
* The user can skip an annotation task
* The user can zoom in to enlarge the image and the annotated points by scrolling up on the mousewheel
* The user can zoom out to decrease the size of the image and the annotated points by scrolling down on the mousewheel
* Allow the user to change the brightness value
* Changing the brightness value will only change the brightness of the image (not the annotated points)

### User Interface
* The application hightlights the currenntly selected feature
* The application hightlight the currently selected point
* If an image has already has a label its annotated points will be shown.
* The annotation tool has multiple features representing the different pins
* Each feature has its own unique color and name


`Note: the term 'pin'and 'feature' are used interchangeably `


# V2
Version 2 of the roctation tool will most notably improve on V1 by implementing Typescript, Redux and the addition of new featuretypes. Additionally changes will be made to decrease the average annotation time (previously 15 min).

## Implementing Redux
The application needs keep track a lot of information (i.e. states) such as the currently selected feature, point etc. Different components all need to access read and/or update this information. Version 1 implements this by propagating these values downwards. However because of the size and complexity of the application this becomes too disorganized and inefficient to pass these state parameters and properties between all the all the components (typically via a process known as prop drilling). This is where state management tools come into play, enabling developers to view, control and synchronize the ‘global state’ of an application across all of its components. 

Redux creates a single ‘data store’ for managing state that can be accessed throughout the entire application. Which allows each component to access the current state and make predictable changes.

The global state will keep track of:
- The type of socket
- An array of features containing among others its associated points
- The currently selected feature
- The currently selected point
- The brightness of the image

Furthermore actions are defined which will provide the required functionality to edit the global state.
Example of actions:
- Adding a new point
- Updating a point
- Deleting a point
- Switch the currently selected feature
- Switch the currently selected point
- Change the brightness

## Implementing Typescript
Typescript was implemented to add standardization to the application. An interface was implemented for both Socket and Feature. This made sure that each Socket and Feature would have the same structure and decreased the probability of runtime errors. Furthermore it allowed the application to be more scalable if new Sockets or Features needed to be added.

Furthermmore also in other parts of the application types were declared to decrease the number of runtime errors.

## Canvas
The V1 implementation of the canvas was redone to simplify the component, improve scalability and  improve readablility.

## Retrieving the type of the socket
Labelbox will tell the application which type of socket belongs to the project. Once the application knows the type of socket, it make sure that the annotationtask will change accordingly. For example when it knows that the socket is of type CCS1 it will show 7 features of the type ellipse.

## New featuretypes
Currently the roctation V1 the user only has the ability to annotate using an ellipe. In the future different types sockets may be required to annoted which don't have a pin in the shape of an ellipse. Because of this two new types features were added; the point and hexagon.

## 'Should have' features
### Drag function
* Allows the user to 'drag' the image across the screen using the right mouse button to change its position.
* Improves usability
### Implement 'Use predictions' feature of labelbox
* The 'Use predictions' feature allows labelbox to use its active prediction model to make a prediction for the current image. This feature could shorten the annotation task immensely if the prediction model is well trained.
* https://github.com/Labelbox/labelbox/tree/master/custom-interfaces#use-predictions

