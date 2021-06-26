# note-time

* Import disparate personal data from notebooks and web activity into a timeline basis. 
* Connect and contextualize personal data utilizing the one human UUID: timestamp.
* Answer the question: "what have I been up to?"

## Data to import

* location
* notes
* spotify history
* rdio history
* google calendar
* conversations
* sent gmail
* financials
* audio recordings
* dream journals
* google fit
* heart data
* substance use
* github activity
* amazon purchases


### captain's log

#### Design thoughts

* if `h1`,`h2`, `h3`, etc. are hierarchical tags, `#hashtag` is the parent of its containing block.
* an `h1`, `h2`, etc. define a block. can/should a list item be able to have a `#hashtag`?
* how much am I rewriting org-mode? see if there are any org-mode js parsers for note-time.
* I want my website to be generated from a white-listed web of structured ideas.
  * It is a graph, not a tree. URLs are an API used to bookmark points of interest in the graph like the hashtag `#musicality` which renders in some dynamic arrangement, every block that is a child of `#musicality`.
  * it also renders a tag-cloud each of child and parent tags. 

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Scripts

In the project directory, you can run:

###### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

###### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

###### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

###### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

###### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

###### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

###### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

###### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

###### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

###### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
