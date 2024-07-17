import React, { useState } from 'react';
import InputField from '../Components/InputField';

const JobPostingData = ({ handleChange }) => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleRadioChange = (event) => {
    setSelectedDateRange(event.target.value);
    handleChange(event.target.value);
  };

  const now = new Date();
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const SevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const ThirtDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  // convert Date-to-string
  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
  const SevenDaysAgoDate = SevenDaysAgo.toISOString().slice(0, 10);
  const ThirtDaysAgoDate = ThirtDaysAgo.toISOString().slice(0, 10);

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Date of posting</h4>

      <div>
        <label htmlFor="all">
          <input
            type="radio"
            name="dateRange"
            id="all"
            value=""
            checked={selectedDateRange === ''}
            onChange={handleRadioChange}
          />
          <span className="checkmark"></span> All
        </label>

        <InputField
          handleChange={handleChange}
          value={twentyFourHoursAgoDate}
          title="Last 24 Hours"
          name="test"
          checked={selectedDateRange === 'Last 24 Hours'}
        />

        <InputField
          handleChange={handleChange}
          value={SevenDaysAgoDate}
          title="Last 7 days"
          name="test"
          checked={selectedDateRange === 'Last 7 days'}
        />

        <InputField
          handleChange={handleChange}
          value={ThirtDaysAgoDate}
          title="Last 30 days"
          name="test"
          checked={selectedDateRange === 'Last 30 days'}
        />
      </div>
    </div>
  );
};

export default JobPostingData;