import React, { Dispatch, SetStateAction, useState } from "react";
import "./passengerselector.css"; // Import the CSS file

const MAX_PASSENGERS = 9;
const MAX_INFANTS_PER_ADULT = 2;

interface PassengerSelectorProps {
  adults: number;
  setAdults: Dispatch<SetStateAction<number>>;
  children: number;
  setChildren: Dispatch<SetStateAction<number>>;
  infantsSeat: number;
  setInfantsSeat: Dispatch<SetStateAction<number>>;
  infantsLap: number;
  setInfantsLap: Dispatch<SetStateAction<number>>;
}

export const PassengerSelector = (props: PassengerSelectorProps) => {
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

  // Temporary states to hold current selections
  const [tempAdults, setTempAdults] = useState(adults);
  const [tempChildren, setTempChildren] = useState(children);
  const [tempInfantsSeat, setTempInfantsSeat] = useState(infantsSeat);
  const [tempInfantsLap, setTempInfantsLap] = useState(infantsLap);

  const totalPassengers =
    tempAdults + tempChildren + tempInfantsSeat + tempInfantsLap;

  const canIncrement = (): boolean => {
    return totalPassengers < MAX_PASSENGERS;
  };

  const canAddInfant = (): boolean => {
    return (
      tempInfantsLap + tempInfantsSeat < tempAdults * MAX_INFANTS_PER_ADULT
    );
  };

  const handleIncrement = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number,
    validateInfants: boolean = false
  ) => {
    if (!canIncrement()) return;
    if (validateInfants && !canAddInfant()) return;
    setter(value + 1);
  };

  const handleDecrement = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number
  ) => {
    if (value > 0) {
      setter(value - 1);
    }
  };

  const handleDone = () => {
    // Update the actual states with temporary values
    setAdults(tempAdults);
    setChildren(tempChildren);
    setInfantsSeat(tempInfantsSeat);
    setInfantsLap(tempInfantsLap);
  };

  const handleCancel = () => {
    // Reset to original values
    setTempAdults(adults);
    setTempChildren(children);
    setTempInfantsSeat(infantsSeat);
    setTempInfantsLap(infantsLap);
  };

  return (
    <div className="container">
      <div className="row">
        <div>Adults</div>
        <div className="counter">
          <button
            className="button"
            onClick={() => handleDecrement(setTempAdults, tempAdults)}
            disabled={tempAdults === 0}
          >
            -
          </button>
          <span>{tempAdults}</span>
          <button
            className="button"
            onClick={() => handleIncrement(setTempAdults, tempAdults)}
          >
            +
          </button>
        </div>
      </div>

      {/* Children */}
      <div className="row">
        <div>
          Children
          <br />
          <small>Aged 2-11</small>
        </div>
        <div className="counter">
          <button
            className="button"
            onClick={() => handleDecrement(setTempChildren, tempChildren)}
            disabled={tempChildren === 0}
          >
            -
          </button>
          <span>{tempChildren}</span>
          <button
            className="button"
            onClick={() => handleIncrement(setTempChildren, tempChildren)}
          >
            +
          </button>
        </div>
      </div>

      {/* Infants in Seat */}
      <div className="row">
        <div>
          Infants
          <br />
          <small>In seat</small>
        </div>
        <div className="counter">
          <button
            className="button"
            disabled={tempInfantsSeat === 0}
            onClick={() => handleDecrement(setTempInfantsSeat, tempInfantsSeat)}
          >
            -
          </button>
          <span>{tempInfantsSeat}</span>
          <button
            className="button"
            onClick={() =>
              handleIncrement(setTempInfantsSeat, tempInfantsSeat, true)
            }
          >
            +
          </button>
        </div>
      </div>

      {/* Infants on Lap */}
      <div className="row">
        <div>
          Infants
          <br />
          <small>On lap</small>
        </div>
        <div className="counter">
          <button
            className="button"
            disabled={tempInfantsLap === 0}
            onClick={() => handleDecrement(setTempInfantsLap, tempInfantsLap)}
          >
            -
          </button>
          <span>{tempInfantsLap}</span>
          <button
            className="button"
            onClick={() =>
              handleIncrement(setTempInfantsLap, tempInfantsLap, true)
            }
          >
            +
          </button>
        </div>
      </div>

      <div className="footer">
        <div className="buttonText" onClick={handleCancel}>
          Cancel
        </div>
        <div className="buttonText" onClick={handleDone}>
          Done
        </div>
      </div>

      {/* Error Messages */}
      <div className="error">
        {totalPassengers >= MAX_PASSENGERS && (
          <p>Cannot exceed {MAX_PASSENGERS} passengers.</p>
        )}
        {tempInfantsLap + tempInfantsSeat >=
          tempAdults * MAX_INFANTS_PER_ADULT && (
          <p>
            Cannot have more than {MAX_INFANTS_PER_ADULT} infants per adult.
          </p>
        )}
      </div>
    </div>
  );
};

export default PassengerSelector;
