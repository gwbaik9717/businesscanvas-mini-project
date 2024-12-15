import React, { useEffect, useRef } from "react";
import { useSelectContext } from "./Select";
import { useCalendar, CalendarViewType } from "@h6s/calendar";
import styled from "styled-components";

export const SelectDatePicker: React.FC = () => {
  const { selectMenuItem, selectedValues, close, isOpen } = useSelectContext();
  const { headers, body, navigation, cursorDate } = useCalendar({
    defaultViewType: CalendarViewType.Month,
  });

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleDateClick = (date: Date) => {
    // Format date to YYYY-MM-DD
    const formattedDate = date.toLocaleDateString("en-CA");
    selectMenuItem(formattedDate);
    close();
  };

  useEffect(() => {
    if (selectedValues && typeof selectedValues === "string") {
      const selectedDate = new Date(selectedValues);
      navigation.setDate(selectedDate);
    }
  }, [selectedValues]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <StyleDatePicker ref={dropdownRef}>
      <StyleHeader>
        <button
          onClick={() =>
            navigation.setDate(
              new Date(cursorDate.setFullYear(cursorDate.getFullYear() - 1))
            )
          }
        >
          {`<<`}
        </button>
        <button onClick={navigation.toPrev}>{`<`}</button>
        <span>{`${cursorDate.toLocaleString("default", {
          month: "long",
        })} ${cursorDate.getFullYear()}`}</span>
        <button onClick={navigation.toNext}>{`>`}</button>
        <button
          onClick={() =>
            navigation.setDate(
              new Date(cursorDate.setFullYear(cursorDate.getFullYear() + 1))
            )
          }
        >
          {`>>`}
        </button>
      </StyleHeader>
      <StyleWeekDays>
        {headers.weekDays.map((day) => (
          <div key={day.key}>
            {day.value.toLocaleDateString("en-US", { weekday: "short" })}
          </div>
        ))}
      </StyleWeekDays>
      <StyleDays>
        {body.value.map((week) => (
          <StyleWeek key={week.key}>
            {week.value.map((day) => (
              <StyleDay
                key={day.key}
                isCurrentMonth={day.isCurrentMonth}
                isCurrentDate={day.isCurrentDate}
                onClick={() => handleDateClick(day.value)}
              >
                {day.date}
              </StyleDay>
            ))}
          </StyleWeek>
        ))}
      </StyleDays>
    </StyleDatePicker>
  );
};

const StyleDatePicker = styled.div`
  padding: 12px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  width: 280px;
  z-index: 10;
`;

const StyleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-weight: bold;

  button {
    border: none;
    background: none;
    cursor: pointer;
    padding: 4px;
    font-size: 16px;
  }
`;

const StyleWeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 12px;
  color: gray;
  margin-bottom: 8px;
`;

const StyleDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const StyleWeek = styled.div`
  display: contents;
`;

const StyleDay = styled.div<{
  isCurrentMonth: boolean;
  isCurrentDate: boolean;
}>`
  text-align: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isCurrentDate
      ? "#e6f7ff"
      : props.isCurrentMonth
      ? "transparent"
      : "#f0f0f0"};
  color: ${(props) => (props.isCurrentMonth ? "#000" : "#ccc")};
  &:hover {
    background-color: ${(props) =>
      props.isCurrentDate ? "#0056b3" : "#f0f0f0"};
  }
`;
