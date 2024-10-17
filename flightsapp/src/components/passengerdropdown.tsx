import React, { Dispatch, SetStateAction, useState } from "react";
import PassengerSelector from "./passengerselector";
import { ReactComponent as Person } from "../assets/images/person.svg";
import { ReactComponent as Triangle } from "../assets/images/triangle.svg";
import "./passengerdropdown.css";
interface PassengerDropdown {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  adults: number;
  setAdults: Dispatch<SetStateAction<number>>;
  children: number;
  setChildren: Dispatch<SetStateAction<number>>;
  infantsSeat: number;
  setInfantsSeat: Dispatch<SetStateAction<number>>;
  infantsLap: number;
  setInfantsLap: Dispatch<SetStateAction<number>>;
}

export const PassengerDropdown = (props: PassengerDropdown) => {
  const toggleDropdown = () => {
    props.setIsOpen(!props.isOpen);
  };
  const {
    adults,
    setAdults,
    children,
    setChildren,
    infantsSeat,
    setInfantsSeat,
    infantsLap,
    setInfantsLap,
  } = props;
  const totalPassengers = adults + children + infantsLap + infantsSeat;
  return (
    <div className="dropdown">
      <button
        className={`dropdownToggle ${props.isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        <Person />
        <div className="text">{totalPassengers}</div>
        <div className={`triangle ${props.isOpen ? "rotated" : ""}`}>
          <Triangle />
        </div>
      </button>
      {props.isOpen && (
        <div className="dropdownContent">
          <PassengerSelector
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
            infantsSeat={infantsSeat}
            setInfantsSeat={setInfantsSeat}
            infantsLap={infantsLap}
            setInfantsLap={setInfantsLap}
          />
        </div>
      )}
    </div>
  );
};
