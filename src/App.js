import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //check if user sign in
      if (userAuth) {
        //if exists, userAuth is null when signing out
        const userRef = await createUserProfileDocument(userAuth);

        //get data from the created user or from the already stored user with snapshot and save to the sate object
        userRef.onSnapshot(snapshot => {
          this.setState(
            {
              currentUser: {
                //snapshot is a method in fireStore that gives us some property´s to get that reference "store" data we use .data() o that snapshot
                id: snapshot.id,
                ...snapshot.data()
              }
            }
            //,
            // () => {
            //   console.log(this.state);
            // }
          );
        });
      } else {
        this.setState({ currentUser: userAuth }); //same as currentUser = null, if logs out
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
