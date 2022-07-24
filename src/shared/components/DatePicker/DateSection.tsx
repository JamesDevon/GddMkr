import React, {useState} from 'react';
import moment from 'moment';
import {times, range} from 'lodash';

import {formatDate, formatDateTimeForAPI} from '../../utils/dateTime';
import Icon from '../icon/Icon';

import {
  DateSection,
  YearSelect,
  SelectedMonthYear,
  Grid,
  PrevNextIcons,
  DayName,
  Day,
} from './Styles';

const defaultProps = {
  withTime: true,
  value: undefined,
};

const DatePickerDateSection = ({withTime, value, onChange, setDropdownOpen}: any) => {
  const [selectedMonth, setSelectedMonth] = useState(moment(value).startOf('month'));

  const handleYearChange = (year: any) => {
    setSelectedMonth(moment(selectedMonth).set({year: Number(year)}));
  };

  const handleMonthChange = (addOrSubtract: any) => {
    const month: any =moment(selectedMonth);
    setSelectedMonth(month[addOrSubtract](1, 'month'));
  };

  const handleDayChange = (newDate: any) => {
    const existingHour = value ? moment(value).hour() : '00';
    const existingMinute = value ? moment(value).minute() : '00';

    const newDateWithExistingTime = newDate.set({
      hour: existingHour,
      minute: existingMinute,
    });
    onChange(formatDateTimeForAPI(newDateWithExistingTime));

    if (!withTime) {
      setDropdownOpen(false);
    }
  };

  return (
    <DateSection>
      <SelectedMonthYear>{formatDate(selectedMonth, 'MMM YYYY')}</SelectedMonthYear>

      <YearSelect onChange={(event) => handleYearChange(event.target.value)}>
        {generateYearOptions().map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </YearSelect>

      <PrevNextIcons>
        <Icon type="arrow-left" onClick={() => handleMonthChange('subtract')} />
        <Icon type="arrow-right" onClick={() => handleMonthChange('add')} />
      </PrevNextIcons>

      <Grid>
        {generateWeekDayNames().map((name) => (
          <DayName key={name}>{name}</DayName>
        ))}
        {generateFillerDaysBeforeMonthStart(selectedMonth).map((i) => (
          <Day key={`before-${i}`} isFiller={true} isToday={false} isSelected={false} onClick={()=>{}}/>
        ))}
        {generateMonthDays(selectedMonth).map((date: any) => (
          <Day
            isFiller={false}
            key={date}
            isToday={moment().isSame(date, 'day')}
            isSelected={moment(value).isSame(date, 'day')}
            onClick={() => handleDayChange(date)}
          >
            {formatDate(date, 'D')}
          </Day>
        ))}
        {generateFillerDaysAfterMonthEnd(selectedMonth).map((i) => (
          <Day key={`after-${i}`} isFiller />
        ))}
      </Grid>
    </DateSection>
  );
};

const currentYear = moment().year();

const generateYearOptions = () => [
  {label: 'Year', value: ''},
  ...times(50, (i) => ({label: `${i + currentYear - 10}`, value: `${i + currentYear - 10}`})),
];

const generateWeekDayNames = () => moment.weekdaysMin(true);

const generateFillerDaysBeforeMonthStart = (selectedMonth: any) => {
  const count = selectedMonth.diff(moment(selectedMonth).startOf('week'), 'days');
  return range(count);
};

const generateMonthDays = (selectedMonth: any) =>
  times(selectedMonth.daysInMonth()).map((i) => moment(selectedMonth).add(i, 'days'));

const generateFillerDaysAfterMonthEnd = (selectedMonth: any) => {
  const selectedMonthEnd = moment(selectedMonth).endOf('month');
  const weekEnd = moment(selectedMonthEnd).endOf('week');
  const count = weekEnd.diff(selectedMonthEnd, 'days');
  return range(count);
};

DatePickerDateSection.defaultProps = defaultProps;

export default DatePickerDateSection;
