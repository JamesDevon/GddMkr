import {FormGroup} from '@mui/material';
import React from 'react';
import {MultiselectContent} from '../../../interfaces/MultiSelectContent';
import {MultiSelectItem} from './MultiSelectItem/MultiSelectItem';
import {MultiselectEditorStyles} from './MultiselectEditorStyles';

export interface MultiselectContentProps {
    items: MultiselectContent[] | undefined;
}

export const MultiselectEditor= (props: MultiselectContentProps) => {
  const {items} = props;
  return (
    <MultiselectEditorStyles>
      <FormGroup>
        {items?.map((item) => <MultiSelectItem key={item.title} item={item}/>)}
      </FormGroup>
    </MultiselectEditorStyles>
  );
};
