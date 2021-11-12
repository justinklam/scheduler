import React from "react";
import DayListItem from './DayListItem';

export default function DayList(props) {
  console.log('props-----daylist', props);
  const days = props.days.map(day => {
    // console.log('dayList DAY-----', day)
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        setDay={() => props.onChange(day.name)}
        selected={day.name === props.value}
        />)
  });

  return (
    <ul>{days}</ul>
  );
}