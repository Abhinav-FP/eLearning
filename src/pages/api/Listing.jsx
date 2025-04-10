import { Component } from "react";
import { Api } from "./Api";

class Listing extends Component {
  async Register(data) {
    return Api.post("/user/register", data);
  }
 
  async Login(data) {
    return Api.post("/user/login", data);
  }

  async profileVerify(){
    return Api.get("/user/profile")
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