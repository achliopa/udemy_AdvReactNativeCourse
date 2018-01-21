# Section 1 - Expo Setup

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