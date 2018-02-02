# Section 1 - Expo Setup

IMPORTANT_NOTE: After Development Workstation Restart run the following command in Terminal:

echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_watches     && \
  echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_queued_events  && \
  echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_instances && \
  watchman shutdown-server 
  

## Lecture 3 - Creating React Native Apps

* Expo is a new tool to develop and test react native apps
* in the past react native cli was globally installed with npm and then used xcode (ios) or android studio (anbdroid) to run and test native apps.
* we used this flow in the basic course. 
* new tools a re expo xde, Create React Native App and Sketch (from the Expo XDE team)

## Lecture 4 - Why Expo?

* we can find it in expo.io
* the ReactNativeCLI original dev flow was
** ReacnativeCLI->[creates]->ReactNativeApp->[installed on]->  Simulator on Local Machine(RN App)
** Our JS Code->[fed into]->JS Packager->[fedinto]->Simulator on Local Machine(RNApp)
* Expo XDE->JS PACKAGER+Our App CODE -> EXPO APP in Device (Install From App Store). Expo App throws log output o to expo xde
* We need to Dowload the Expo Mobile App in Device (Oops)
* Expo offers Extra Device APIs + Easy to Push Notifications + Easy on Device testing  + Extra Components
* for linux we download the app store it to a folder, run chmod a+x xde*.AppImage 
* we run the expoxde with ./xde*.AppImage
we create an empty project called swipe setup folder and let the tool do the setup
* for running on iphone we scan qr code and we connect
* for testing on android emulator we follow expo doc, we install genymotiom (it needs virtualbox)

# Section 2 - Animations with React native

## Lecture 6 - Animation Systems

* We want to Build a Swipe card to the right or left (Tinder Style)
* ReactNative supports two basic AnimationSystems (LayoutAnimation and Animated)
** LayoutAnimation: simple setup, not much control (eg top botton sweep), animates everything
** Animated: complicated setup, complex animations, gestures

## Lecture 7 - THe animated module

* We need 3 values to describe the entire animation a) where is the item now (x,y position on screen) b) where is the eleemnt moving to? c) which element are we moving
* Values 		|	Value ValueXY   		| What is the current position of the element being animated
* Types			|	Spring Decay Timing		| How is the animation changing?
* Components	|	View Text Image			| Apply animations current posistion to a component

## Lecture 8 - Animation from Square One

* we open swipe project
* we check App.js and build to see it works
* we create src folder at project root for our code and add ball.js file
* in that file we render a View and we style it as a ball

## Lecture 9 - Moving the ball

* we comment flex position atributes in style of App.js and ball moves to top left corner
* we implement the animation on a lifecycle method

## Lecture 10 - How Animations Work

* we set items intial position by using Animation,ValuXY(0,0)
* Animation.ValueXY gives us the items current position
* Animation.Spring sets the animation Type. it starts from this.position (initial value) and end at toValue 200,500. toValue is an API object to specify destination in animations. we dont define time so the default is 1sec.
* our animation is set up before the component renders (componentWillMount)
* our setup is agnostic of the element that it will be applied to
* we specify that by the ReactNative primitive subcomponent which wraps the compoonents we will animate.
* animation is passed to the animation.view wrapper as a css style
* In React we have a state (Component or Redux) , the flow is Get Init State -> Render Component -> Update State -> Rerender Component
* Animation has nothing to do with state. doesnt understand it. as it is a stlyling thing css
* Component Hierarchy: Ball ->[AnimatedXY as a prop]->Animated.View
* Component Lifecycle: Ball+ Animated.View rendered -> A.View checks its props finds animated value->AnimatedXY starts changing->A.View sees updated value from AniimatedXY-> Viewupdates its styling

## Lecture 12 - Swipe Deck Props

* We will design the component from the outside to the inside.
* first we will define the props
** renderCard/function/returns JSX to show inside of a card
** renderNoMoreCards/function/returns JSX to show when no more cards
** data/array of objects/list of records to use for cards
** onSwiperight-onSwipeLeft/function/callbacks called when user swipes left/right on an item
* we will setup the component boilerplate -> place component in App.js with dummy data -> work on handling users dragging the deck
* we touch Deck.js file and add React Class Component Deck.
* we impot it in App.js and add a static array of objects with data to populate our deck of cards
* we pass a renderCard function and a data array . deck will anly call the function with the data.
* in Deck component we render the data array iterating in the array with map using the passed as a prop renderCard function
* We will use a library for styling . called react native elements
* we install it with yarn add react-native-elements
we use Card and Button from the list to style a card in renderCard function

# Section 3 - Handling Gestures

## Lecture 17 - The Pan Responder System

* handling animation and touch events. we will use the PanResponder ReactNative Primitive. It is a Gesture System handling finger drags on screen
* The Card animation following the gesture will be handled by Animator.
* Gesture Sytem is an Input System. We need to know:
** a) What are we touching
** b) What component handles touch (which has code to understand the gesture)
** c) how the gesture is changing (pattern to understand the gesture)
* we import PanREsponder module by react-native
* we create an instance of it. we can have multiple instances
* the instance is created in constructor. a common trrend is to put the instance in the component state. this is misleading as panResponder will not make use of this.setState as it is an independent object.
* we choose to attach panResponder to the Componet Instance (this) object as a private var.

## Lecture 18 - The Pan Responder Event Handlers

* we pass a number of callbacks assigned to the PanResponder Events. onStartShouldSetPanResponder is executed everytime user taps on the screen. by returning true we say that we want this evend handler to handle gesture anytime user taps. otherwise we return false. onPanResponderMove callback is called anytime user drags his finger on screen.it gets called many times. onPanResponderRelease is called when user removes his finger from screen. it is good point to put reset code.
* the first argument we pass in these callbacks is event object like normal react handlers. the second argument is gesture object. 
* we console.log gesture in onPanResponderMove callback to see what happens.
* to use PanRewsponder we have to put it somewhere . tie it to a React Component.
e.g <View {...this.state.panResponder.panHandlers}>
* panHandlers. contains the callbacks we use so we pass them to the React Component
* to view expo xde remote js debugger on chorem dev tools we open it on http://192.168.1.14:19001
* to activate onPanResponderMove events we need to set onStartShouldSetPanResponder: () => true
* we click and move to log gesture object. we see the xy params change rapidly as we swipe
* gesture contains stateID: 0.4457703677944398, moveX: 20.32646369934082, moveY: 50.29035568237305, x0: 245.54443359375, y0: 145.05859375, …
* gesture values are zeroed out when callback returns
* we add debugger; statement to inspecty gesture object
* dx dy is the distance travelled from initial touch of finger

## Lecture 20 - Dragging a Card

* we import Animated in Deck.js. we review the Animated code in Ball.js. We will use it to set initial position of Card and to attach it to a React Element but we will NOT use a type of transition like spring as we will move it customly following the gesture dx dx.
* for first test we will drag whole deck of cards
* we insert position in component.state following the rn docs. this breaks the rule to not directly mutate the component state. we should consider using this.position = position instead.
* in the onPanResponderMove we set the position using position.setValue({x: gesture.dx, y: gesture.dy }); this is the custom animation type

* we bind the animated to the View like in ball.js changing View to Animated.View and pasing the this.state.position.getLayout() is style prop

# Section 4 - Applying Animation Styling 

## Lecture 21 - Animating Single Cards

* we will move animation tot eh List Item insside the renderCards() helper.
* the map function provides the index as second argument. we use this to render only the first card and add a ANimated.View wrapper together witthe position and panHHandler
* we need to assign a key to the top component of a list which now is Animated.View. we use item.id
* the rest of cards are rendered outside the if statement without the wrapper and dont move.

## Lecture 22 - How to Rotate Elements.

* we want a linear relation between dx and rotation degrees
* we start by adding one more attribute to style prop object. transform.
in order to facilitate addition of multiple style attributes we add a helper function and we call it in style={helper()}
* in there we expand the get.Layout() object with ... adding transform=[{rotate: '45deg'}]. this is static rotation. we want it dynamic correlated to dx.
* we make use of React Native param interpolation using the follwoing snippet

const rotate = position.x.interpolate({
			inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
			outputRange: ['-120deg', '0deg', '120deg']
		});

* in tat way we pass as input position.x adding its Range and seting the output range returning the dpendent param rotate. This is a powerful way of corelating parameters for styling and other uses. (e.g dimensions - movement)
* we pass the rotate objecty  to trasform
* to make use of the Screen width and not static range values we use React native Dimensions. module. we import it and set a static const 
const SCREEN_WIDTH = Dimensions.get('window').width;
* we take the initiative of removing  y dimension from position.setValue({x: gesture.dx}); so we are focused on x dimension making the transition smoother

## Lecture 26 - Springing Back to Default

* we make use of onPanResponderRelease to invoke our helper function when user removes finger from screen 
* we add in the helper Animated.spring function to go bat to initial postion.
* we define a threshold  based on screen width and we add conditional logic to count like or dislikes (swipe more than threshold) or spring back to original position

## Lecture 28 - Programmatic Animation

* we want to implement. user drags far enough -> forcibly make card exit left or right -> get next card ready for swiping
* to force swipe in the conditional logic we call a helper method that uses the Animated.timing method to linearly continue animation to a destination point in a certain time. the syntax is like spring but we pass a second attribute to the config object called duration:
* we want to call a function on forceSwipeCompletion.  animation has a duration and we wan to do it after it completes. to do this we pass a callback in the start() chained function. in the callback we call a helper function
* in the helper function we pass direction. depending on direction we call one of the callbackes passed int eh React Component as props . onSwipeLeft or onSwipeRight

# Section 5 - Component Reusability

## Lecture 31 - Writing Reusable Components

* we dont have a way to pass a callback function for onSwipeLeft() or onSwipeRight() because we didint know on which card wwe operate at anygiven time.
* we add the concept of an index in the component. the logical place for this is component state. in onSwipeCallback we set the item to be passed in the callbacks from the data array based on the index stored in state
8 when we reach the part of code that calls the callback in the simulator our app breaks as we are not passing any callback in the props

## Lecture - The DefaultProps System

* missing props in a component call is a common problem. we can solve it with typechecking in the code but this is a workaround
* we will use the defaultprops system

```
	static defaultProps = {
		onSwipeRight: () => {},
		onSwipeLeft: () => {}
	}
```

* we define the static object right in the class component defaulting the functions if they are not passed in

## Lecture 33 - Resetting Card Position

* we need to make the next card ready for swiping. we need to attach panHandler and position to the next item
* we do this by increment the index in state after calling the callbacks 
* before we change index we programmaticaly reset the position so when we change to next card to not auto go in awkward position

## Lecture 34 - Advancing the Deck

* we do this in the renderCards method. as we advance in the deck we dont wanth to render swiped cards (trurn null) also we want to attach handlers to the next card
* we compare tthe index of map faunction withe this.state.index to implement this

## Lecture 35 - Handling Empty Lists

* at project inception pahse we said there will be a renderNoMoreCards Prop to be called when there are no more cards
* we do the chen in renderCards() where we can use the data.lngth to detect we reached the last ewlement in the list

## Lecture 36 - Getting the Cards to Stack

* this is done with styling (CSS). we set absolute postion and width to viewport (SCREEN_WIDTH), cards are rendered 0 to max so stacked in reverse order. to ficx that we chain reverse() in map function. ANDROID has an isswue with zIndex. we solvit by reversing the z index.
* styling properties are stacked in an array `style={[{zIndex: 99}, styles.cardStyle]}`

## Lecture 37 - Troubleshoot Flashing Images

* when we promote a View to Animated.View it rerenders causing the image to flash. a solution is to use only Animated.View

## Lecture 38 - Cascading Card List

* we use stylining and we take advantage of absolute postiion properties. we add top: 10 * i to the non swapable cards and the swapable card or we use top: 10 * (i - state.index) to move cards up while swapping
* we implement move cards up and we add an animation to smooth it up
* we will use simpler LayoutAnimation.
* we import LayoutAnimation and UIManager from react-native
* we add our animation code in a lifecycle method when we have a rerender (componentWillUpdate), there we do a fix for android

```
UIManager.setLayoutAnimationEnabledExperimental && 
UIManager.setLayoutAnimationEnabledExperimental(true);
```

* then we set our animation (spring) with `LayoutAnimation.spring();` what we do is we use an animation style for our transition
* when we empty our deck and get new cards with renderNoMoreCards we need to reset our index
* we do this in compoentWillReceiveProps lifecycle method as when we get new data props change. we compare newProps with actual props and we reset the index in state.

# Section 6 - OneTime Password Authentication

## Lecture 42 - Review of Common Auth FLows

* **Email/password** : send email+ password. if they match email and password in backend user authenticated
* **OAuth** : A third party vouches for the users identity by providing an identity token to our backend
* **2FA** : Two Factore Authentication. In addition to oauth or emai/passwd a user is sent an identifying token via text, phone or email
* **One Time Password** :  The user provides only a phone number as an identifying token. We text him a code we text them a code that they enter in the app to prove ownership of that phone

## Lecture 43 - The Details of One TIme Passwords

* Simple Flow: User enters their phone number -> we text user a token -> user enters the token in our app -> we verify the token is correct -> if token is correct user is considered authenticated
* Potential problems: a lot of time passes between the time we send the code and when user enters it in app. where we store the token.
* We DONT WANT to send the toke in http response and let the client (device) do the authentication comparing the token with the sms token
* Actual Flow: user Requests OTP -> Ack request -> generate code, save it in backend (Firebase) -> text user the code (Twilio) -> user sends correct code ->compare codes in backend -> send user a jwt to identify them (firebase).

## Lecture 44 - Tech Stack with Google Cloud Functions

* firebase has no custom code to compare codes
* generate code is also backend. firebase how will produce codes.
* we could use express for backend. our tech stack is:
	* React Native: Show user the form to sign up and sign in via one time password
	* Twilio: Send Text messges to users
	* Firebase: store user data, including user accounts and correct one time password codes
	* Google Cloud Functions: Timy bits of code that run one time on demand. Has access to data in firebase
* Google Cloud Functions are stored in firebase and are equal to AWS Lambda

## Lecture 45 - Traditional Servers vs Google Clooud Functions

* generate code and comparing codes is insecure to do in client.
* **Traditional Server**:
	* Long Running Process
	* Runs on *decicated* machinery
	* Code organized using libraries , frameworks
	* Single server does many,many different things
	* Request routed internally
	* Multiple Requests -> One Router _> Multiple Controllers
* **Serverless Computing**
	* Extremely short lived process (20ms to 3000ms)
	* Run on ??? machinery
	* Code is organized in *functions*
	* Functions do exactly on thing
	* Requests directed externally to a specific function
	* Multiple Requests -> Router Handled by Google, AWS -> Multiple Functions

## Lecture 46 - Layout of Google Cloud Functions

* **Handling a user Flow:**
* Cloud Function #1
	* -> User Enters email and phone
	* 	 verify phone is not in use
	*    create a new user record in Firebase
	* <- respond to request, stating user was created
* Cloud Function2
	* -> user requests to login with phone number
	*    generate a code
	*	 save the code to user's record
	* <- text the code to the user
* Cloud Function #3
	* -> user enters code
	*    compare codes
	*	 mark code as stale
	* <- return a JWT to user

## Lecture 47 - Firebase Project Setup

* Setup Process: Create Firebase Project -> Setup Local Firebase Project -> Write function to create user -> Signup to Trilio -> Write function to generate and text a user
* we create firebase project
* we install firebase cli with `npm install -g firebase-tools`
* we login to our firebase/google acoount we have created our project with with `firebase login`
* we get redirected with oauth login and success.
* we create our project folder `mkdir one-time-password` . we give tha same project name like in firbase just in case
* we enter our root project folder
* we initialize our project with `firebase init`
* we select functions (with space) and then we are shown our projects to associate with. 
* we choose not to setup a default project. we choose javascript and to install libs with npm. it creates a functions folder with node project struct.
*  we go back to the firebase consol and choose functions

## Lecture 48 - Deploying a Firebase Project

* we open index.js in functions folder, uncomment the sample code and run `firebase deploy` in project root folder
* i get error *no project active*
* we solve it by going to firebase console copying project ID (shows in URL path)
* we rerun command `firebase deploy --project your_project_id
* IT DEPLOYS@!
* we see in firebase console in functions tab the demo function *helloworld* appear

## Lecture 49 - Testing Deployed Functions 

* we work in local fireproject and deploy it to remote firebase project
* when it was deployed it gave us the link for calling th function  *https://us-central1-one-time-password-3751e.cloudfunctions.net/helloWorld*
* we visit the link and see the function output
* we implement a second function printing goodbye. 
* the syntax of firebase functions is similar to express route handlers. with `export.functionname = functions.https.onREquest(express style callback)`

## Lecture 50 - Project File Structure

* in *index.js* we export 3 google cloud functions: createUser, createPassword, verifyPassword. each one has its own .js file thats is imported in index.js
* firebase runs in node node has no access to ES6 so we right in es5 with require etc.
* in the separate fiule we implement the callback passed in onRequest() instead of the annonympus arrow function used in the examples
* in the named .js file we export an anonymous function as callback

## Lecture 51 - The Request and Response Objects

* req and res are used as in express
* *req.body* contains data passed from the caller. we use res.send() as a console log. to inspect it. 
* in firebase functions ulike express we dont dspecify the http method. we can do it manually in the function
* in order to see the req. body we need to send data with post request in postman
* we see that we echo the json raw data we sent.
* functions in firebase can persist data to the firebase database as they are tightly coupled in the project.
* the project is structured with datastore<->service client<->functions
* with service client we can manipulate the project  oveeriding rules

## Lecture 52 - Generating a Service Account (Setting Service Client)

* we need to directly acces our datastore data from the function
* we clean up code in index.js
* we import firebase admin `const admin = require('firebase-admin');`
* we go to the console of our firebase app and click settings , then  Project Settings -> Service accouts. there we see a snippet of initialization code . we copyu the initializeApp function snippet and paste it in our index..js file. 
* we are missing a *serviceAccount*. we click on GENERATE PRIVATE KEY and we get a json file containing our private and public key. we create anew file in functions folder named *service_account.json* and paste all the contents of the json sent to us with the credentials. WE MUST NOT INCLUDE IT IN OUR GIHUB REPO so add it in .gitignore file
* we import serviceAccount from json file in the index.js

## Lecture 53 - Sanitizing user Inputs

* we will manage user accoutns using firebase authentication 
* we will use the Anonymous Sign-in provider to have full control over acounts so we enable this option
* inside our createUser function we will
	 * verify user provided a phone
	 * format the phone number removing dashes and parenthesis
	 * create a new user account using that phone neumber
	 * respond to the user saying the account was made
* we import firebase-admin
* in the function we check that phone exists in the body otherwise we return an error.
* if it exists we coerse it into String (in case it was passed as a number bu the api consumer). and use String.prototype function replace to stip all non number characters using regex.
* to create auser we will make use of admin and service account to access the firebase database to store data. we use admin to use service acount to use auth() to createa user in authoriazation module using the phone as uid. because createUser is async. we use proimises resolve to reprly with user data and catch to reply with error status and error message

```
	admin.auth().createUser({ uid: phone })
		.then(user=>res.send(user))
		.catch(err => res.status(422).send({ error: err }));
```
* we deploy and use postman to test. test cycle is large in firbase backend development. so use ESLint to catch bugs upfront.

## Lecture 55 - Testing New user Creation

* i test in postman sending:

```
{
	"phone": "0030-69-99999999"
}
```

* and get a response

```
{
    "uid": "00306999999999",
    "emailVerified": false,
    "disabled": false,
    "metadata": {
        "lastSignInTime": null,
        "creationTime": "Tue, 23 Jan 2018 22:19:58 GMT"
    },
    "tokensValidAfterTime": "Tue, 23 Jan 2018 22:19:58 GMT",
    "providerData": []
}
```

* the auth enforces uniqueness to phone as we use it as uid
* in firebase console i see users created in authorization tab

# Section 7 - Twilio Integration

## Lecture 56 - Texting from Twilio

* we go to twilio.com
* we signup and go to dashboard
* we need to register a (virtual phone number to be used for texting back by our users (if they text back to the sms we send))
* we click all products and services -> phone numbers -> get started -> get your first twilio phone number => chose this number (we right downn the number it gives us)
* we go to </> developers tools -> runtime -> API Explorer -> Programmable SMS -> Messages -> POST /Accounts/[AccountsId]/messages  (Create A message)
* in to we enter our phone and from the phone given byu twilio . in body our test message (choose a US number)

## Lecture 57 - Twilio Credentials

* our flow to implement is: find the user model->generate code->save code to user -send text message via twilio api -> respond to request
* we make a new file in functions folder called twilio.js with configurations for the service. we will use their node.js npm module so we install it in /functions folder with ` npm install --save twilio@3.0.0-rc.13`
* we import the lib in twilio.js and define 2 const *acount Sid* and *authToken* we need for our Api call.
* i go to twilio console dashboard to copy paste these 2 values, i insert them preferably in a gitignored separate file.
* we export a new Twilio instance passing the 2 tokens.

## Lecture 58 - Accessing Saved users

* we create a new js file to host our callback function that will be exported as google cloud function in index.js file. we call it request_one_time_password
* in our callback we chck that a phone xists in request.body , we sanitize it (exactly like *createUser*), and we use firebase-admin to `admin.auth().getUser(uid)` where id is the phone as we implemented in createUser. this is an async call so in resolve (.then) we will prepare the text.
* to hit external apis from google cloud functions we need a paid account (blaze plan).
* we will change the app flo storing the code in the user record after we send th e code to twilio. this is because we can avoid phone validation in this way which consts processing power. 
* twilio does not support promises . only callbacks
* twilio wants the +304338943 format for foreign numbers. so regex needs to change to allow +.
*eslint rule that asks then to return something creates problems. we disable it.
*  we import twilio in our callback request one time password callback
*firebase auth and database module are unrelated. auth module does not allow saving custom data . we need to cr4eate records in database. instead of auth() we use database() to access the database. like in node projects. we need a ref to the record and an update() chained func with the object contianing the data we want to store. 
as we said we store int he callback we write to return when the call to twilio api concludes.

```
twilio.messages.create({
				body: "Your Agileng OTPApp login code is " + code,
				to: phone,
				from: " +16178556875"
			}, (err) => {
```

* twilio is the instance we created in twilio.js witht he tokens passed.
we test in postman.

## Lecture 62 - Verifying One Time Passwords

* we create the callback and add it to the index.js exports
* we expect to see phone number and code in the req.body, if not we return error message.
* we parse the code as in with parseInt. we format the phone (dont forget international numbers with +)
* we fetch the user from auth() module based on phone. if it resoves then we go to the database module and with ref to user/:phone we fetch the data with .once (not .on() because on listens to changes in data and needs to de deactivcated with .off())

```
ref.once('value', snapshot => {
	const user = snapshot.val();
	})
```

* is equivalent to 

```
ref.on('value', snapshot => {
	ref.off();
	const user = snapshot.val();
	})
```

* withe data we get from snapshot we compare the code in db witht he code sent via post request and we check if code is stale. we invalidate the code and proceeed) 

## Lecture 63 - generating JWTs

* if we choose the fully custom path for authentication in firebase we need to gemerate the token ourselves
* we generate the jwt and send it back to the user
* we do this with `admin.auth().createCustomToken(phone);
* we return the token to the user on resolve of the promise thrown by the call `.then(token => res.send({token}))`

# Section 8 - Client Side One Time Passwords

## Lecture 66 - App Boilerplate

* we create a new firebase-auth react native project with expo
* we install with yarn *axios* for api calls to backend and *react-native-elements* for styling. 
* we create a folder components and in there a SignUpForm.js file for a class Component

## Lecture 67 - Defining Instance Properties

* to wire our form input we will use component state where we store the phone. 
* in react native form inputs numbers are parsed as strings.
* we use ES6 (2017) syntac to initialize state without the need for the constructor. also we syntax our event handler function as an arrow removing the need to use bind(this) when we attach it to the event.

fot input we use the onChangeText event to store in state the input at any text change. this means we need to attach the value to the state. 

## Lecture 68 - Invoking CLoud Functions

* we use axios which we import. we find the url to our funcions in google firebase console

* we chain th epromises to invoke two consequticve calls to firebase

## Lecture 69 - Refactoring with Async/Await

* nothing new. he uses async/await

## Lecture 71 - User Sign-In

* we make a new form to call verifyOneTimePassword . it is almost the same with SinUp nothing new. firebase exprects unique users
* when we do thiw request we get back a jwt token as we saw in postman
* we import firebase in project with yarm
* we initialize firebasse connection with code from firebase console in a lifecicle method of the App.js (componentWillMount). then we use firebase `firebase.auth().signInWithCustomToken(data.token);` with the object we get in response. from verify google cloud function. in async/await

# Section 9 - Bringing it All Together

## Lecture 75 - App Overview

* we create a new project named jobs in  expo xde
* it will be a job finding app.  we will start with a landing page. with instructions. then we will have a signup screen to login with facebook. after a screen to set our position in a mapview. based on the position we will hit a backend api to retrieve a list of jobs nearby which will be rendered in a swipe list. the user will keep the ones he likes by swiping right. the shortlist will be accessible by a button. in the shortlist will have a button for apply. another screen will give the option to reset the list (clear it).
* the welcome page: we only show the page once (when the user first enters the app, each page should fill up the whole screen, only one page should be visible at a time, text on each one page should be cofigurable
* facebook authentication page: we only show the page if the user is not logged in
* set position on map page: map needs to work both on io and android,need to be able to read current location from the map when the user taps on button, need an api to fetch list of jobs based on location,need to show bottom tab bar on the screen, but not the welcome or login screen
* swipe/rate jobs screen: fetch a list of jobs in the area that was designated from last screen, use swipDeck component from swipe project to show a list of jobs, if a user likes a job show it on the list of saved jobs (next screen)
* saved jobs list: need to only show jobs that the user has liked, need a link to a job application page from each 'liked' job, need to be able to do some nested navigation (open the settings screen)
* solving challenges: facebook authentication-> expo, show map on android and ios -> expo, push notifications -> expo, app loading screen -> expo, swipe deck -> already there from swipe app, fetch job data -> indeed job api, navigation -> react navigation

## Lecture 79 - Screens vs Components

* We have: WelcomeScreen, AuthScreen, MapScreen, DeckScreen, ReviewScreen, SettingsScreen, Screens are React Navigation Elements ans contain React Native Components. they can contain more than one components. Screeens are still React Components. Screens are one off. they are not meant to be reusable. 
* Navigation between Screens can be done with one of the many React Native Navigation options (NavigatorIOS, Navigator, Navigator Experimental - ReactNative Router Flux, React Router Native, React Navigation, React native Router)
* Most Popular Libraries are React Router Native which is the React.js React Router port to Native . check if api is stable before binding to this. also it uses url type paths like in web. React Navigation is the official Facebook lib so it is pretty backed.
* we will use React Navigation in the project

## Lecture 81 - React navigation in Practice

* The nav flow: WelcomeScreen -> AuthScreeen -> (MainFlow: MapScreeen, DeckScreen,(ReviewFlow: ReviewScreen<->SettingsScreen))
* There are 3 types of navigation: 
	* Stack: we want a header. good when we want to go *forward* or *back* between views (e.g ReviewScreen - SettingsScreen )
	* Tab: we want a bottom bar(optional). good when we want to show either view a or view b (e.g mapScreen, DeckScreen, ReviewScreen)
	* drawer: we want a side bar. good when we want either view a or b
* We will use tab navigation for the first screens as well welcome-auth-main but we will hide the footer

## Lecture 82 - Screen BoilerPlate

* install react navigation lib : yarn add react-navigation
* we create files for each screen and add boilerplate code in folder screens. the boilerplate code is a typical React Class Component with react-native elements in render. we copy paste same boilerplate code in all.

## Lecture 83 - Implementing the first Navigator

* we start the app in expo using simulator
* we import the TabNavigator from react-navigation in the App.js (main app js file)
* we import our first two screens (welcome and auth) in App.js
* in App render function we instantiate a TabNavigator under the name MainNavigator. we pass as argument a routes objects which are defined as key value pairs. the key is the name by which we call them in our code and the value is the type (screen and the Screen Component to be called.)
* we call MainNavigator as a React  Component in our jsx 
* we remove align and justify from default styling  and then the tab navigator appears on screen with the two screens. In android the tab is on top in ios in bottom

## Lecture 84 - Nesting Navigators

* down the path we will learn to add custom tab names that are different from the keys 
* nesting navigators is a straightforward process as we follow the navigation flow we defined in our design earlier in a navigation object. instead of adding a screen object as a key-value pair, we add a navigator (Tab or Stack) passing again the navigation object with key value pairs of screen components. for our app the finished navigator object looks like

```
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        })
      }
    });
``` 

* this navigation seems to work in tutors ios emulator but in android emulator nested navigation tab does NOT WORK. to fix this we add option objects together with the routes objets in the two tabnavigators adding lazyloading.

```
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, {
          tabBarPosition: 'bottom',
          lazyLoad: true
        })
      }
    }, 
    {
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      lazyLoad: true,
      animationEnabled: false
    });
```

## Lecture 86 - Class vs Instance Properties

* whenever a router wants to show a screen component it asks it if it has any route configuration to return
* we specify route specific configuration using the class properties.
when we defined state in the Component class instead of using the state initialization in the constructor
* this definition style (like a OO class variable) is an instance property. anytime we instantiate the class this property will exist and have the defined value
* class property definition is similar. same syntax but we add the word static infront. if we refer to it at a class instance . it will return undefined. but if we refer to it by the class it will return its value.

* instance property

```
class ReviewScreen {
	color = 'red';
}

const screen = new ReviewScreen();
screen.color; // red
```

* class property

```
class ReviewScreen {
	static color = 'red';
}

const screen = new ReviewScreen();
screen.color; // undefined
ReviewScreen.color; // red
```

* the navigator asks for the screens class properties `static navigationOptions = {}`
it uses them for customizing the route

## Lecture 87 - Customizing with Header Options

* using the class level properties at ReviewScreen we will customize the Header apearance setting a title attribute in the navigationOptions class property object. the title apears in the header, also it changes the tab title of the screen
* this is a proff that this object is used by the stacknavigator(header) and the tabnavigator (footer)
* we want to place a button on the header. we do so by addng a second attribute *headerRight*. passing jsx value

## Lecture 88 - Programming Navigation

* to add a button in  the header we will use a button from react native elements library. we  install it with yarn. we import Buttton in our file
* we add a dummy eventhandler on onPress event  of the button passing an arrow function
* to be able to do something in the event handler callback we need to pass a parameter . we neet the navigate method of the navigation object passed. to use it we refactor our class property navigationOptions into a class method. a callback that will return the object and use the navigation object passed to use its navigate method in the event handler. to navigate somewhere we pass in the the function the key of the screen we want to go to ("settings")

```
	static navigationOptions = ({ navigation }) => {
 		return {
     		title: 'Review Jobs',
     		headerRight: (
         		<Button title='Settings' onPress={() => navigation.navigate('settings')} />
        	)
     	};
 	}
```

## Lecture 89 - Styling the Navbar

* we do styling with react native syntax of css. we do it directly in the props, to add extra margin in the header in android we import Platform from react-native and we add a style object after the class property object attributes. there we query the Platform and we add the margin with a ternary `marginTop: Platform.OS === 'android' ? 24 : 0`

## Lecture 90 - The Welcome Screen

* welcome screen will pass a list of slide data to a component called Slides for rendering
* slides react class component is a boilerplate. in welcomescreen we replace jsx with Slides passing a const raay of text objects.
* we will use react native scrollview to scroll horizontally. this is done by a prop
* we use arenderhelper method to render all data array elements using a map function.
* at each slide jsx we use a view and text react native primitives. both are styled by an external styling object. the view is using flex to cover vertical axis and context is centered using flex. we see that text is blending in screen so we give the view a width of screen_vierw which we calculate using react native dimensions object and get('window').width method. we add pagingEnabled prop in ScrollView to do pagination on vertical axis. 
* we pass background color as a second data array object attribute and we cascade styles in props as an array in the style prop. we style the text.

## Lecture 93 - navigating from the Welcome Screen

* we want to hide the tabnavbar in welcome screen
* we want to add logic in our render helper to show the button for auth in our last slide
* if i click the button i call a callback in welcome screen to decide what to do.
* this is done to make slides reussable component.
* the logic is added in a nested render helper. we use it to render a primitive button with aprop of raised. in this button we pass an event handler callback from the Slides component props. this callback is defined in WelcomeScreen. there we do navigation to the authScreen by using the navigation prop. navigation prop is passed to all React natyive components rendered by the react navigation library. in the ReviewScreen we could not do it because we were inside a class propery. class properies do not have access to props which belong to the instances. we use the navigate method passing the key to the screen *auth*

# Section 10 - Facebook Authentication

## Lecture 95 - Facebook Auth Flow

* user starts app => (have they loggeed in before)? send them to map screen : send them to welcome
* call expo.loginWithReadPermissionsAssync -> facebook popup displayed to user -> user enters details -> our app gets a token if auth was successful -thats it!
* we nedd to register our app to use the facebook api
* we go to expo.io then to the docs then SDK API REFERENCE then Facebook, we see the instructions on how to use facebook api
* we go to developers.facebook.com we click get started we use our fb account and give the app a name and get in the dashboard and get an appid
* then we registter our app with facebook
* we copy the bundle id from expo docs and go to fb dashboard _> settings -> add platform -> ios and cp the id to the bundleid input
* we add a second platform -> android . we cp the keyhash from expo docs to fb dashboard
* we click save changes. we copu the app id as well use it later 985051181671730
* we go to AuthScreen.js the  token we want to get back from auth will be used bu all pieces of our app. this is a redux usecase after all

## Lecture 97 - Redux Setup

* we use redux to keep the token and inform components if we have it or not
* our flow becomes : land on AuthScreen -> Call ActionCreator to initiate FB login -> Are we sure we aren't authenticated? -> yes we are not -> attempt to log in user with FB -> get token -> save token for future use -> send use to MapScreen : If we are authenticated send them to MapScreen
* we install redux with yarn: yarn add reduc react-redux redux-thunk
* we add redux to our project following the usual process. provider and passing the store in App.js
* we create the stoe in a different folder /store passing thunk as middleware and reducer in a different folder /reducer passing a dummy reducer. auth
* we connect the storte to our app through provider

## Lecture 98 - Using Async Storage

* our implmentation flow for FB Login Action Creator will be. See if token exists => NO? => open FB Login => wait for token => wait for token => save token to AsyncStorage => Dispatch FB_LOGIN_SUCCESS  yes? Dispatch FB_LOGIN_SUCCESS
* we create a new action type in a new folder /actions
* AsyncStorage is a memory to persist info in nattive react apps. w eimport this module from react native to use it in action creator facebookLogin that will do the login
* async storage works with key value pairs like the local storage in the web browser. we use two functions

```
AsyncStorage.setItem('fb_token', token);
AsyncStorage.getItem('fb_token');
```

* it is an async call, it returns a promise. also fb login is async and returns a promise. we are dealing with nested promises. we will use ES7 async/await syntax
* we use let for the values returned by await
* async action creators use redux thunk or redux promise
* redux thunk with async/await is crazy mix. we see the refactoring process

```
export const facebooklogin = () => {
	let token = await AsyncStorage.getItem('fb_token');
	if (token) {
		// Dispatch an action saying FB login is done
	} else {
		// Start up FB login process
	}
};
```

```
export const facebooklogin = () => {
	return async function(dispatch) {
		let token = await AsyncStorage.getItem('fb_token');
		if (token) {
			// Dispatch an action saying FB login is done
		} else {
			// Start up FB login process
		}
	}
};
```

```
export const facebooklogin = () => {
	return async (dispatch) => {
		let token = await AsyncStorage.getItem('fb_token');
		if (token) {
			// Dispatch an action saying FB login is done
		} else {
			// Start up FB login process
		}
	}
};
```

```
export const facebooklogin = () => async (dispatch) => {
		let token = await AsyncStorage.getItem('fb_token');
		if (token) {
			// Dispatch an action saying FB login is done
		} else {
			// Start up FB login process
		}

};
```

## Lecture 100 - Loggin with Facebook

* we import Facebook from expo library
* we implement facebook login in a separate helper method
* we pass it the dispatch method as we want to dispatch actions
* we call Facebook.logInWithReadPermissionsAsync(appId, options) method passing the AppId as a string and an options object wit the permissions array. with async/await
* this function returns result containing the type and token. if type is 'cancel' we dispactch login fail action type. if it is other we use AsyncStorage to se tthe token to persist memory and dispatch successful login
* we wire the action creator to our AuthScreen using connect helper wrapper
* our action creator is a named export. we use index.js in our actions folder to export all from auth_actions file.
* we add a lifecycle method componentDidMount() to call the actioncreator from props.
* we add hardcoded code in AuthScreen to remove the fb_toke for testing purposes. we use AsyncStorage.removeItem() method passing the token name
* WE NOTICE STRANGE BEHAVIOUR. we see that when we open the app we are shown the login fb screen even we are clearly in the Welcomesreen and not in the AuthScreen
* When React Navigation renders a Navigator it renders every single screen we pass in It!!!!!!!!!!!!!! THis is done for performance. It eagerly loads screens to improve app speed. WE DONT WANT THAT.
* To solve this we will pass configuration options to the initial TabNavigator. we need to pass lazu: true in the config object
* we revert to beta.22 as currently lazy-loading does not work. we need to use react-navigation-0utils if we use current version. fixed
* we want to hide the tabBar for the root navigation so we add 

```
      navigationOptions: {
        tabBarVisible: false
      },
```

in the configuration option

## Lecture 104 - Auth Reducer

* we will use a reducer to watch for facebook login outcome and store the token . we will bind the state to the props and in the component we will forcibly navigate id props change (token)
* we add an auth_reducer file and import it to index.js. success will return a token from the action.payload.
* we use mapStateToProps in Auth Screen to use the token from state in our component. we create a helper function where we check the token and if it exists we redirect using the navigate methd to maps. we put this helper in a lifecyclemethod componentWillReceiveProps which is triggered every time the component receives new props.

## Lecture 107 - Advancing the Welcome Screen

* we want the app to skip the welcome screen when the user is logged in. but as AsyncStorage functions are async in nature we dont know how log it will take to return the token from storage.we will use the AppLoading module from expo so that the user will see an app loading screen till the token is resolved. this module will render from welcomescreen. to trigger the redirection on finish we can use redux and action creators or react component state. 
* we will use the simple solutions for learning purposes
* we install lodash with yarn to help us with comparisons
* our flow in welcome screen is the follwoing. we initialize state with null token.
* we add a lifecyclemethod componentWillMount where getthe token from AsyncStorage. as this is async we use async await. if we get  a token re navigate to maps (and set token in state ) if we dont we set token to false.
* in render method we check if token is null if it is we show welcomescreen (wait till asyncstorage resolves) if token is not null (false) we go to slides. as app stacks in AppLoading if when it get the token from storage we as a setstate token even if we get a token from storage

# Section 11 - MapViews on ReactNative

## Lecture 109 - Showing a Map

* Challenge: map needs to wqork both on android and ios, need to be able to read current location tfrom the map when user presses the button, need an api to fetch alist of jobs based on location, need to show bottom tab bar on this screen but ton the welcome or login screens
* we got to go to expo.io docs in mapview section
* we import MapView from expo in our MapScreen we add it in our render replacing all Text tags. we style the View and mapView with flex: 1 style and we see the map render on screen
* mapview gets as a prop a region object. any time the user drags and stops an onRegionChangeComplete event is fired. we use a handler to get the new region object and pass it again to mapview. region object contains lat, long and deltas in each direction representing zoom
* we add component state to store region. we initialize it and pass it to mapView as a prop. as there is a possible issue of region not showing correctly until loaded we add a flag to our state mapLoaded.it starts as false. in render we check the flag and i false return a ActivityIndicator. we reset the flag on a lifecycle method componentDidMount(odd huh?)
* indeed api key 4201738803816157

## Lecture 113 - THe indeed jobs API

* we use the onRegionChangeComplete event to register our handler witch get the region and set it to state. this event doesnt always fire in android
* we go to indeed.com and create an account. we check the xml feed to issue a demo query. we see that we can specify format to json so we do it to get a json object returned. we are interested on query (keyword) location and radius
* the search flow will be: user presses search here button -> call action creator with current region -> action creator gets list of jobs -> navigate user to swip deck
* we create anew actions file in /actions folder (job_actions)
* we yarn install axios to make api calls
* we start building our action creator which returns a function with dispatch (thunk). we make use of ES7 async/await and ES^ arrow functions to make the backbone of our call. we pass in our action the region object but we see that indeed accepts only postcodes in its API. so we need to transform the lng,lat data to address.
* we search for an npm module called latlng-to-zip. this works onl in US. we will need google geocoding to make work globally . we yarn add this package and import it
* we call the reverseGeocoding function of the lib passing the region and returning zip. we call it with await and wrap it in a try/catch statement. 
* we will now focus on qurying the indeed api. to form this long query we use qs npm module. it takes a javascript module and turns it into a query string. we install and import it
* we create the query params object and a const string witht the base url. we use axios to make the api call get to teh url and we extract the data from the result putting it as payload to the action we are dispatching (type: FETCH_JOBS)

## Lecture 117 - Issuing Action Creators from MapView

* we import actions in MapView. we bind them with connect helper from react-redux. we add a view insude the mapview view and add a button. we give absolute position to overlay. we add an event hadler to the button and call  the action creator passing the region. we test on emulator with success
* we implement the jobs_reducer. there we add FETCH_JOBS action type which returns the list of jobs i the state replacing everything, we add our reducer to the combine reducers
* we want to navigate our user to the review screen after we get the data. sp tjebest place to add the navigate code is after the dispactch action in the action creator
* we are in redux side when all the navigation elements were called in the react side
* we will pass a callback in the action creator called by the react component which will be called when all are ok . this callback as defined in the component has access to props and navigation object

## Lecture 120 - The Deck Screen

* challenge: fetch list of jobs in the area that was designated from previous screen (ok), use SwipeDeck component to show a list of jobs, if a user likes a job show it on the list of saved jobs (next screen)
* we use connect helper and mapstatetoprops to bind the jobs to the deck screen props
we copy paste Deck.js file from swipe project to Swipe.js in components
* we import the Swipe component in deck screen and render it passing as data the jobs prop
* we need to add the callbacks for Swipe (renderCard, noMoreCards)
* for render Card we want to make a helper rendering a card with a map showing the job postiion and a box with job title, company name, days posted and a description. we will use jobtitle, company, formattedrelativetime, snippet filtering out the tags, and latitude and longitude to show a new mapview, we need an id to satisfy the Swipe component. we want to use jobkey as id.
* we impelement the renderCard function adding styling with flex. we add MapView passing the region with lat,lng from indeed reply. we disable scrolling in props to let only swipe gesture. also we add cache when running on android to trasform map into an icon for less memory footprint
* to solve the unique key issue in our renderCard in Swipe we pass a prop with the id atrtribute for our application. we use key interpolation to set it as key. and set a default value in the default props

## Lecture 128 - Liking a Job

* flow: user swipes right -> swipe component calls onSwipeRight callback with job as param -> pass the liked job to an action creator -> liked job gets stored via likes_reducer
* onswiperight prop callback calls an arrow function calling an action creator likeJob
* likejob just returns an action of type lie_job. we handle this action typ ein likes_reducer. 
* we are aware that the payload of this action will contain often duplivcates. we dont want to just push them in a array. we want to be able to filter the duplicated (by jobkey?1?)
* we will use lodash in our reducer for uniqueness checks.

```
return _.uniqBy([
	action.payload, ...state
], 'jobkey');
```

* the code above checks for uniqueness based on jobkey between the state aray (likes and the action payload (job) and if it is uniq it returns the new array with one more element the job)

## Lecture 130 - THe Review Screen

* in review screen we will render a list of liked jobs in cards with a button to apply . we will use mapstatetoprops to bind the state likedJobs into the component props
* need to only show jobs that the user has liked, need to link to a job application page from each liked job, need to be able to do some nested navigation (open the settings screen)
* we render a list of card using the map method on the likedJobs prop.
* to add a button that will navigate to the url of the jobe we will use a React Native Primitive element the Linking. this module links to other apps on the mobile
* we will put a MapView in the card. we import it in review screen
* we add a button in  the settingsscreen to clear the liked jobs through an action creator
* when the card in deck are all gone we add a button to direct user to the map screen. we use redirection with navigation prop passed in decks screen. as rendnernomorecards is a callback that runs in swipe we need to bind the parent function to this object
* we want to add icons on nav buttons. in MapScreen we add navigationOptions object to be used by navigator when screen is called
* we add tabBarIcon in each screen passing an arrow function that treturns an Icon from React Elements
* to style the nav bar and increase its height we do it in App.js nested tab navigatio config options
* we use headerStyle in navigationOptions to increase the header size in Android by querying Platform.OS

# Section 12 - Offline Data Persistence

## Lecture 141 - Push Notifications and Data Persistence

* User fetches jobs => User likes some jobs => user closes the app => redux state is dumped => user reopens app => we want to show the list of jobs the user had liked
* we want to persist  app state (redux)
* redux flow: component renders => component calls action creator => action creator dispatches action => action flows through middleware => action hits reducers  => reducers recalculate state => state flows into components => components rerender
* we want to modify flow like : reducers recalculate state -> state saved in AsyncStorage and state flows into components => components rerender
* we will use a module called *redux persist* . yarn add redux-persist
* we go to our index.js file in store folder. we import persistStore and autoRehydrate from redux-persist and AsyncStorage from react-native
* we add autoRehydrate() as second param in createStore func call.
* we add `persistStore(store, { storage: AsyncStorage, whiteList: ['likedJobs'] });` setting the persistStore (which state will be stored and where)
* in likes_reducer we add REHYDRATE action type from redux-persist/contants and add it to our reducer . this type returns action..payload.likedJobs  (from persistStore) or empty array. it works (we use v4)
* with redux-persist whenever redux stated changes it is saved in persisting memory
* when aour app starts again: redux starts up => redux sends warmup action to all => autorehydrate middleware sees warmup action -> autorehydrate fetches data fro m asyncstorage -> autorehydrate sends action to reducers (REHYDRATE=)-> our reducer catches data from persisted state
* if i want to dump data while usng persist (for testing) we chain purge() after persistStore()
* BIG GOTCHA! : if i change the type of data in my state and redux state is persisted in users devices the next time they will open their updated version where we use the new type of data n away non compatible wit the old type the app will crash badly. to solve it we need to make use of advanced APi and redux-persist-migrate library to make our types backward compatible

# Section 13 - Push Notifications

## Lecture 146 - Push Notifications Overview

* we will use expo api for notifications
* if user gives us permission we will store a expo push token in our backend and use it to send notifications to this particular device
* when we want to send notification we send it to expo notification server who then sends it to device
* we add code to our app to get the notification and present it to user

## LEcture 147 - Registering for Push Notifications