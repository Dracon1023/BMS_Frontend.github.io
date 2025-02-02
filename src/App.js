import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfileView from "./components/user/ViewUserProfile";
import UserProfileUpdateForm from "./components/user/UpdateProfileForm";
import NavBar from "./components/navbar/Navbar";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import HomePage from "./Homepage";
import SignupPage from "./SignupPage";
import SeatBooking from "./components/booking/SeatBooking";
import { gapi } from "gapi-script";
import PasswordResetPage from "./PasswordResetPage";
import FoodOrderingPage from "./components/meal/FoodOrdering";
import MoviePage from "./components/movie/MoviePage"
import CartItems from "./components/cart/CartItems";
import PaymentPage from "./PaymentPage";
import ConfirmationPage from "./components/confirmation/ConfirmationPage";

const App = () => {
  console.log("Host URL" + process.env.PUBLIC_URL);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "252165708469-qqf4vqi2u0ddf8qao2299o4oke0jt151.apps.googleusercontent.com",
        scope: "",
      });
    }

    const fetchUserData = async () => {
      try {
        // Need to change
        const response = "";
        setUserData(response.data[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    gapi.load("client:auth2", start);
  }, []);

  const handleUpdateProfile = async (updatedData) => {
    try {
      // Need to change
      const response = "";
      console.log(response.data);

      // Update the local user data
      setUserData(updatedData);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/seats" element={<SeatBooking />} />
        <Route path="/movielist" element={<MoviePage />} />
        <Route path="/meals" element={<FoodOrderingPage />} />
        <Route path="/cart" element={<CartItems />} />
        <Route path="/resetpassword" element={<PasswordResetPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/me" element={<UserProfileView userData={userData} />} />
        <Route
          path="/me/update"
          element={
            <UserProfileUpdateForm
              initialData={userData}
              onSave={handleUpdateProfile}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
