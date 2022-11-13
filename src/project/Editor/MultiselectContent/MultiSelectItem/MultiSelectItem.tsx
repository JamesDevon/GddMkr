import React from 'react';
import {MultiselectContent} from '../../../../interfaces/MultiSelectContent';
import {Checkbox, FormControlLabel, FormLabel} from '@mui/material';
import {Icon} from '../../../../shared/components';
import {color} from '../../../../shared/utils/styles';
import {StyledMultiSelectItem} from './MultiSelectItemStyles';

export interface MultiSelectItemProps {
    item: MultiselectContent;
}

export const MultiSelectItem = (props: MultiSelectItemProps) => {
  const {item} = props;
  return (
    <StyledMultiSelectItem>
      <table>
        <tr>
          <td className="checkmark">
            <FormControlLabel control={<Checkbox checked={item.selected} />} label="" value={item.title} />
          </td>
          <td className="label">
            <FormLabel>{item.title}</FormLabel>
          </td>
          <td>
            <Icon type="selector" size={15} color={color.get('primary')} visibility='hidden'/>
          </td>
        </tr>
      </table>
    </StyledMultiSelectItem>
  );
};
