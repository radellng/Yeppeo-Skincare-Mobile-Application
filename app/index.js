import React from "react";
import { createRootNavigator, SignedIn } from "./router";
// import { isSignedIn } from "./auth";

export default class App extends React.Component {
  render() {
    return <SignedIn />;
  }
  // constructor(pro  ps) {
  //   super(props);

  //   this.state = {
  //     signedIn: false,
  //     checkedSignIn: false,
  //   };
  // }

  // componentDidMount() {
  //   isSignedIn()
  //     .then((res) => this.setState({ signedIn: res, checkedSignIn: true }))
  //     .catch((err) => alert("An error occurred"));
  // }

  // render() {
  //   const { checkedSignIn, signedIn } = this.state;

  //   // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
  //   if (!checkedSignIn) {
  //     return null;
  //   }

  //   const Layout = createRootNavigator(signedIn);
  //   return <Layout />;
  // }
}
