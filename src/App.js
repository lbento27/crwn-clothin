import React from "react";
import "./App.css";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //check if user sign in
      if (userAuth) {
        //if exists, userAuth is null when signing out
        const userRef = await createUserProfileDocument(userAuth);

        //get data from the created user or from the already stored user with snapshot and save to the sate object
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            //snapshot is a method in fireStore that gives us some property´s to get that reference "store" data we use .data() o that snapshot
            id: snapshot.id,
            ...snapshot.data()
          });
          //console.log(this.state);
        });
      } else {
        setCurrentUser(userAuth); //same as currentUser = null, if logs out
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
