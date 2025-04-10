import { Component } from "react";
import { Api } from "./Api";

class Listing extends Component {
  async Register(data) {
    return Api.post("/user/register", data);
  }
 

  render() {
    return (
      <div>
        <></>
      </div>
    );
  }
}

export default Listing;