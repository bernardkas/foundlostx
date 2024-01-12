import React, { ChangeEvent } from 'react';

interface TimePickerProps {
  label: string;
  selectedDateTime: string | undefined;
  onDateTimeChange: (newTime: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  label,
  selectedDateTime,
  onDateTimeChange,
}) => {
  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    onDateTimeChange(newTime);
  };

  return (
    <div>
      <label>{label}</label>
      <div>
        <input
          className='border-[1px] p-1 w-72'
          type='time'
          value={selectedDateTime || ''}
          onChange={handleTimeChange}
        />
      </div>
    </div>
  );
};

export default TimePicker;
