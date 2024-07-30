import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/contact/contact";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import AddProduct from "./pages/addProduct/addProduct";
import Dashboard from "./pages/dashboeard/dashboard";
import Profile from "./pages/profile/profile";
import EditProfile from "./pages/profile/edit/editProfile";
import Auth from "./pages/Auth/Auth";
import Chatting from "./pages/chatting/chatting";
import Community from "./pages/community/comunity";
import MakeMeal from "./pages/makeMeal/makeMeal";
import Navbar from "./components/navbar/navbar";
import Loading from "./components/loading/loading";
//!
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "./redux/slices/authSlice";
import { getTheme } from "./redux/slices/systemModeSlice";
let authorized = false;
console.log("🚀 ~ authorized:", authorized);
function App() {
  const availableUser = useSelector(getuser);
  console.log("🚀 ~ App ~ availableUser:", availableUser);
  if (availableUser?.success) {
    authorized = true;
  } else authorized = false;

  const theme = useSelector(getTheme);

  theme == "dark"
    ? document.body.classList.add("dark")
    : document.body.classList.remove("dark");

  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="w-100 d-flex justify-content-center align-items-center">
            <Loading />
          </div>
        }
      >
        <Routes>
          {["/", "home"].map((x, ind) => (
            <Route path={x} key={ind} element={<Home />} />
          ))}
          <Route
            path="/contact"
            element={authorized ? <ContactUs /> : <Auth />}
          />
          <Route
            path="/recipeDetails/:recepDetailsId"
            element={authorized ? <RecipeDetails /> : <Auth />}
          />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route
            path="/dashboard/*"
            element={authorized ? <Dashboard /> : <Auth />}
          />
          <Route path="/auth/*" element={<Auth />} />
          <Route
            path="/profile/*"
            element={authorized ? <Profile /> : <Auth />}
          />
          <Route
            path="/profile/edit/"
            element={authorized ? <EditProfile /> : <Auth />}
          />
          <Route
            path="/makeMeal"
            element={authorized ? <MakeMeal /> : <Auth />}
          />
          <Route
            path="/community"
            element={authorized ? <Community /> : <Auth />}
          />
          <Route path="/community/chat" element={<Chatting />} />

          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
