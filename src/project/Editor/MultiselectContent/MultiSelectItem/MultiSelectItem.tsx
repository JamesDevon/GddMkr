import React from 'react';
import {MultiselectContent} from '../../../../interfaces/MultiSelectContent';
import {Button, Checkbox, FormControlLabel} from '@mui/material';
import {Icon} from '../../../../shared/components';
import {color} from '../../../../shared/utils/styles';
import {StyledMultiSelectItem} from './MultiSelectItemStyles';

export interface MultiSelectItemProps {
    item: MultiselectContent;
    editItem: (item: MultiselectContent) => void;
    update: (item: MultiselectContent) => void;
}

export const MultiSelectItem = (props: MultiSelectItemProps) => {
  const {item, editItem} = props;
  const enableEdit = () => {
    editItem(item);
  };

  const changeSelectStatus = async () => {
    props.update({...item, selected: !item.selected});
  };

  return (
    <StyledMultiSelectItem>
      <table>
        <tbody>
          <tr>
            <td className="checkmark">
              <FormControlLabel control={<Checkbox checked={item.selected} />} label="" value={item.title} onClick={changeSelectStatus}/>
            </td>
            <td className="label">
              <Button onClick={enableEdit}>{item.title}</Button>
            </td>
            <td>
              <Icon type="selector" size={15} color={color.get('primary')} visibility={item.editSelected ? 'visible' : 'hidden'}/>
            </td>
          </tr>
        </tbody>
      </table>
    </StyledMultiSelectItem>
  );
};
