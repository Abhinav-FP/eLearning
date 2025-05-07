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
  async emailVerify(data){
    return Api.post("/user/verify-email", data);
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

  async PaymentUser() {
    return Api.get("/student/payment", );
  }

  async homeTeacher() {
    return Api.get("/home/teacher", );
  }

  async HomeTeacherVideo(){
    return Api.get("/home/teacher/video")
  }
  
 

  async TeacherBank(data){
    return Api.post("/teacher/bank" ,data)
  }
  async StudentTeacher(data) {
    return Api.get("/student/teacherGet", data);
  }

  async TeachergetbyId(data) {
    return Api.get(`/student/teacher/${data}`);
  }

  async studentteacherAvaliability(id){
    return Api.get(`/student/teacher/availability/${id}`);
  }

  async StudentDashboard() {
    return Api.get("/student/dashboard");
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

  async getCountmessage(){
    return Api.get("/message/getAll");
  }
  async MessageGetAll(id){
    return Api.get(`/message/get/${id}`);
  }
  async SendMessage(data){
    return Api.post(`/message/send` , data);
  }

  async PaypalCreate(data){
    return Api.post(`/payment/create-order` , data);
  }

  async PaypalApprove(data){
    return Api.post(`/payment/capture-order` , data);
  }

  async PaypalCancel(data){
    return Api.post(`/payment/cancel-order` , data);
  }


  async Stripe_payment(data) {
    return Api.post("/payment/create-checkout-session", data);
  }

  
  async StripeSuccess(data) {
    return Api.get(`/payment/payment-success/${data}`);
  }

  async StripeCancel(data) {
    return Api.get(`/payment/payment-cancel/${data}`);
  }

  async LessonAdd(data){
    return Api.post(`/lesson/add`, data);
  }

  async deleteLesson(id){
    return Api.delete(`/lesson/delete/${id}`);
  }

  async LessonUpdate(id,data){
    return Api.put(`/lesson/update/${id}`, data);
  }

  async TeacherLessonGet(){
    return Api.get(`/teacher/lesson/get`);
  }

  async TeacherLessonGetForStudent(id){
    return Api.get(`/student/lesson/get/${id}`);
  }

  async TeacherAvailabilityGet(){
    return Api.get(`/teacher/availability/get`);
  }
  
  async AddAvailablility(data){
    return Api.post(`/teacher/availability/add`, data);
  }

  async deleteAvailability(id){
    return Api.delete(`/teacher/availability/delete/${id}`);
  }

  async EditAvailability(id,data){
    return Api.put(`/teacher/availability/update/${id}`, data);
  }

  async GetBooking(){
    return Api.get(`/booking/getAll`);
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