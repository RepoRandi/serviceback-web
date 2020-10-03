import React, { useContext } from 'react';
import RadioGroup from 'components/radio-group/radio-group';
import RadioCard from 'components/radio-card/radio-card';

import { ProfileContext } from 'contexts/profile/profile.context';

interface Props {
  increment?: boolean;
  onSelect: (time: string) => void;
  duration: number;
}

function addMinutes(time, minsToAdd) {
  function D(J) {
    return (J < 10 ? '0' : '') + J;
  }
  var timeComponents = time.split(':');
  var mins = timeComponents[0] * 60 + +timeComponents[1] + +minsToAdd;

  return D(((mins % (24 * 60)) / 60) | 0) + ':' + D(mins % 60);
}

const Schedules = ({ duration, onSelect }: Props) => {
  const {
    state: { schedules },
    dispatch,
  } = useContext(ProfileContext);

  return (
    <>
      <RadioGroup
        items={schedules}
        component={(item: any) => {
          const timeslot = item.value;
          return (
            <RadioCard
              id={item.id}
              style={{ alignItems: 'center' }}
              key={item.id}
              title={''}
              content={`${item.value} - ${addMinutes(item.value, duration)}`}
              name="schedule"
              checked={item.type === 'primary'}
              withActionButtons={false}
              onChange={() => {
                onSelect(item.value);
                dispatch({
                  type: 'SET_PRIMARY_SCHEDULE',
                  payload: item.id.toString(),
                });
              }}
            />
          );
        }}
      />
    </>
  );
};

export default Schedules;
