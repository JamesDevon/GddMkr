import React, {useState} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {RadioContainer} from '../UpperBarStyles';

export const DisplayList = () => {
  const [displays, setDisplays] = useState<Array<{ value: string, label: string, class: string }>>([
    {value: 'L', label: 'LIST', class: 'active'},
    {value: 'B', label: 'BOARD', class: ''},
    {value: 'G', label: 'GRAPH', class: ''},
  ]);

  const enableButton = (e: React.MouseEvent) => {
    const newDisplays : Array<{ value: string, label: string, class: string }> = [];
    const value : string = (e.target as HTMLButtonElement).value;
    displays.forEach((display) => {
      const newDisplay = display;
        (newDisplay.value === value) ? newDisplay.class = 'active' : newDisplay.class = '';
        newDisplays.push(newDisplay);
    });
    setDisplays(newDisplays);
  };

  return (
    <RadioContainer>
      <ButtonGroup size="sm" onClick={enableButton}>
        {displays.map((display) => {
          return <Button key={display.value} value={display.value} className={display.class}>{display.label}</Button>;
        })}
      </ButtonGroup>
    </RadioContainer>
  );
};
