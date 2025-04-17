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
  async ResetPassword(data) {
    return Api.post("/user/reset-password", data);
  }
  async ProfileUpdate(data) {
    return Api.post("/user/update-profile", data);
  }
  async ReviewUserGet(data) {
    return Api.get("/student/review", data);
  }

  async PaymentUser(data) {
    return Api.get("/student/payment", data);
  }

  async homeTeacher(data) {
    return Api.get("/home/teacher", data);
  }

  
  async StudentTeacher(data) {
    return Api.get("/student/teacherGet", data);
  }
  async StudentfavouriteTeacher(data) {
    return Api.get("/student/favourite/get_all", data);
  }

  async AddWishlist(data) {
    return Api.post("/favourite/add", data);
  }

  async RemoveWishlist(data) {
    return Api.post("/favourite/delete", data);
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