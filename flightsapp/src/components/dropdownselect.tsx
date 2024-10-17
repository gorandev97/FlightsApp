import { useState } from "react";
import { ReactComponent as RightArrow } from "../assets/images/arrow-right.svg";
import { ReactComponent as BothArrows } from "../assets/images/exchange.svg";
import { ReactComponent as Triangle } from "../assets/images/triangle.svg";
import { ReactComponent as Checkmark } from "../assets/images/checkmark.svg";
import "./dropdownselect.css";

interface Options {
  options: string[];
  setSelectedOption: (option: string) => void;
  selectedValue: string;
  trip: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const DropdownSelect = (options: Options) => {
  const isOpen = options.isOpen;
  const setIsOpen = options.setIsOpen;
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    options.setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div
        className={`dropdown-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        {options.selectedValue === "One way" ? (
          <div className="icons">
            <RightArrow />
          </div>
        ) : options.selectedValue === "Round trip" ? (
          <div className="icons">
            <BothArrows />
          </div>
        ) : null}
        <div className="text">{options.selectedValue}</div>
        <div className={`triangle ${isOpen ? "rotated" : ""}`}>
          <Triangle />
        </div>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.options.map((option) => (
            <div
              className={`text dropdown-option ${
                option === options.selectedValue ? "selected" : ""
              }`}
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option === options.selectedValue && (
                <span className="checkmark">
                  <Checkmark />
                </span>
              )}
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
