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