import { Header } from "../components/header";
import { Locations } from "../features/locations";
import "./home.css";
export const Home = () => {
  return (
    <div>
      <Header />
      <div className="textTitle">Flights</div>
      <Locations />
    </div>
  );
};
