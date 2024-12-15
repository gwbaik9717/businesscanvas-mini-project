import React, { useEffect, useRef } from "react";
import { useSelectContext } from "./Select";
import { useCalendar, CalendarViewType } from "@h6s/calendar";
import styled from "styled-components";
import {
  color,
  fontSize,
  padding,
  radius,
  transition,
} from "../../styles/theme/theme";
import { IconWrapper } from "../Icons/IconWrapper";
import { DoubleLeftOutlinedIcon } from "../Icons/DoubleLeftOutlinedIcon";
import { DoubleRightOutlinedIcon } from "../Icons/DoubleRightOutlinedIcon";
import { LeftOutlinedIcon } from "../Icons/LeftOutlinedIcon";
import { RightOutlinedIcon } from "../Icons/RightOutlinedIcon";
import { Text } from "../Typography/Text";

interface SelectDatePickerProps {
  value?: string;
}

export const SelectDatePicker: React.FC<SelectDatePickerProps> = ({
  value,
}) => {
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
    const targetDate = value || selectedValues;
    if (targetDate && typeof targetDate === "string") {
      const selectedDate = new Date(targetDate);
      if (!isNaN(selectedDate.getTime())) {
        navigation.setDate(selectedDate);
      }
    }
  }, [value, selectedValues]);

  if (!isOpen) return null;

  return (
    <StyledDatePicker ref={dropdownRef}>
      <StyledHeader>
        <div className="navigation-group">
          <IconWrapper
            className="navigation"
            size={16}
            padding={2}
            onClick={() =>
              navigation.setDate(
                new Date(cursorDate.setFullYear(cursorDate.getFullYear() - 1))
              )
            }
          >
            <DoubleLeftOutlinedIcon width="100%" height="100%" />
          </IconWrapper>

          <IconWrapper
            className="navigation"
            size={16}
            padding={2}
            onClick={navigation.toPrev}
          >
            <LeftOutlinedIcon width="100%" height="100%" />
          </IconWrapper>
        </div>

        <Text fontWeight="fontWeightBold" fontSize="fontSizeLg">
          {`${cursorDate.toLocaleString("default", {
            month: "short",
          })} ${cursorDate.getFullYear()}`}
        </Text>

        <div className="navigation-group">
          <IconWrapper
            className="navigation"
            size={16}
            padding={2}
            onClick={navigation.toNext}
          >
            <RightOutlinedIcon width="100%" height="100%" />
          </IconWrapper>

          <IconWrapper
            className="navigation"
            size={16}
            padding={2}
            onClick={() =>
              navigation.setDate(
                new Date(cursorDate.setFullYear(cursorDate.getFullYear() + 1))
              )
            }
          >
            <DoubleRightOutlinedIcon width="100%" height="100%" />
          </IconWrapper>
        </div>
      </StyledHeader>
      <StyledBody>
        <StyledWeekDays>
          {headers.weekDays.map((day) => (
            <StyledWeekDay key={day.key}>
              {day.value.toLocaleDateString("en-US", { weekday: "short" })}
            </StyledWeekDay>
          ))}
        </StyledWeekDays>
        <StyledDays>
          {body.value.map((week) => (
            <StyledWeek key={week.key}>
              {week.value.map((day) => {
                const formattedDay = day.value.toLocaleDateString("en-CA");
                const isSelected = formattedDay === value;

                return (
                  <StyledDay
                    key={day.key}
                    isCurrentMonth={day.isCurrentMonth}
                    isCurrentDate={day.isCurrentDate}
                    isSelected={isSelected}
                    onClick={() => handleDateClick(day.value)}
                  >
                    <div className="wrapper">{day.date}</div>
                  </StyledDay>
                );
              })}
            </StyledWeek>
          ))}
        </StyledDays>
      </StyledBody>
    </StyledDatePicker>
  );
};

const StyledDatePicker = styled.div`
  background-color: ${color.bgContainer};
  border-radius: ${radius.borderRadiusSm};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
`;

const StyledHeader = styled.div`
  padding: 9px ${padding.paddingSm};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${color.border};

  .navigation-group {
    display: flex;
    align-items: center;
  }

  .navigation {
    cursor: pointer;
  }
`;

const StyledBody = styled.div`
  padding: ${padding.paddingSm} 18px;
  color: ${color.text};
  font-size: ${fontSize.fontSizeLg};
`;

const StyledWeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

const StyledDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const StyledWeek = styled.div`
  display: contents;
`;

const StyledWeekDay = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDay = styled.div<{
  isCurrentMonth: boolean;
  isCurrentDate: boolean;
  isSelected: boolean;
}>`
  height: 30px;
  padding: 3px 5px;
  text-align: center;
  cursor: pointer;
  color: ${(props) =>
    props.isSelected
      ? color.bgContainer
      : props.isCurrentMonth
      ? color.text
      : color.placeholder};

  .wrapper {
    width: 24px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) =>
      props.isSelected ? color.primary : "transparent"};
    border-radius: ${radius.borderRadiusSm};
    transition: ${transition.transition};
  }

  &:hover .wrapper {
    background-color: ${(props) => (props.isSelected ? "#0056b3" : "#f0f0f0")};
  }

  &:focus .wrapper {
    border: 1px solid ${color.primary};
  }
`;
