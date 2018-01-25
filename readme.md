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

## 

*