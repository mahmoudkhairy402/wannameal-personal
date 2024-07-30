import AboutUs from "../../components/aboutUs/aboutus";
import CommonMeals from "../../components/commonMeals/commonMeals";
import LandingPage from "../../components/landingPage/LandingPage";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>WannaMeal</title>
        <meta name="description" content="WannaMeal" />
      </Helmet>
      <LandingPage />
      <AboutUs />
      <CommonMeals />
    </>
  );
}
