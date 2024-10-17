import { useState } from "react";
import "./locations.css";
import { DropdownSelect } from "../components/dropdownselect";
import { flightTypes } from "../constants/constants";
import { trips } from "../constants/constants";
import PassengerSelector from "../components/passengerselector";
import { PassengerDropdown } from "../components/passengerdropdown";
export const Locations = () => {
  const [selectType, setSelectedType] = useState(flightTypes[0]);
  const [selectTrip, setSelectedTrip] = useState(trips[0]);
  const [isOpenType, setIsOpenType] = useState(false);
  const [isOpenTrip, setIsOpenTrip] = useState(false);
  const [isOpenPassenger, setIsOpenPassenger] = useState(false);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infantsSeat, setInfantsSeat] = useState<number>(0);
  const [infantsLap, setInfantsLap] = useState<number>(0);

  const handleToggleTrip = (isOpen: boolean) => {
    setIsOpenTrip(isOpen);
    if (isOpen) {
      setIsOpenType(false); // Close the type dropdown
      setIsOpenPassenger(false);
    }
  };

  const handleToggleType = (isOpen: boolean) => {
    setIsOpenType(isOpen);
    if (isOpen) {
      setIsOpenTrip(false); // Close the trip dropdown
      setIsOpenPassenger(false);
    }
  };

  const handleTogglePassenger = (isOpen: boolean) => {
    setIsOpenPassenger(isOpen);
    if (isOpen) {
      setIsOpenTrip(false); // Close the trip dropdown
      setIsOpenType(false);
    }
  };
  return (
    <div className="box">
      <div className="dropdownmenu">
        <DropdownSelect
          options={trips}
          setSelectedOption={setSelectedTrip}
          selectedValue={selectTrip}
          trip={true}
          isOpen={isOpenTrip}
          setIsOpen={handleToggleTrip}
        />
        <PassengerDropdown
          isOpen={isOpenPassenger}
          setIsOpen={handleTogglePassenger}
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          infantsSeat={infantsSeat}
          setInfantsSeat={setInfantsSeat}
          infantsLap={infantsLap}
          setInfantsLap={setInfantsLap}
        />
        <DropdownSelect
          options={flightTypes}
          setSelectedOption={setSelectedType}
          selectedValue={selectType}
          trip={false}
          isOpen={isOpenType}
          setIsOpen={handleToggleType}
        />
      </div>
      <div>
        <div>box1</div>
        <div>box2</div>
        <div>picker1</div>
        <div>picker2</div>
      </div>
    </div>
  );
};
