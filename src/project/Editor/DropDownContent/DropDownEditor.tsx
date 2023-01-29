import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import React, {useState} from 'react';
import {ISections} from '../../interfaces/ISections';
import {DropDownEditorStyles} from './DropDownEditorStyles';
import {Icon} from '../../../shared/components';
import {Item, ItemText} from '../../NavBarTop/NavBarTopStyles';
import {DropDown, DropDownSelector} from './DropDown';
import {v4 as uuid} from 'uuid';
import {ProjectService} from '../../../service/api/projects/ProjectService';

interface DropDownContentProps {
  projectId: string;
  setSelectedProject: any;
  section: ISections<DropDown>;
}

export const DropDownEditor = (props: DropDownContentProps) => {
  const [selectors, setSelectors] = useState<DropDownSelector[]>(props.section.content.selectors ?? []);

  const handleChange = (event: SelectChangeEvent, selectorId: string) => {
    const selectorIndex = selectors.findIndex((s) => s.id == selectorId);
    const updatedSelectors: DropDownSelector[] = [];
    for (let i=0; i< selectors.length; i++) {
      if (selectorIndex == i) {
        updatedSelectors.push({
          id: selectorId,
          title: event.target.value,
          description: selectors[i].description,
        });
        continue;
      }
      updatedSelectors.push(selectors[i]);
    }
    setSelectors(updatedSelectors);
  };

  const addNewDropDown = async () => {
    const newSelector: DropDownSelector = {
      id: uuid(),
      title: '',
      description: '',
    };
    const result = await ProjectService.updateProjectSection(props.projectId, props.section._id, {content: {
      ...props.section.content,
      selectors: [...selectors, newSelector],
    }});
    props.setSelectedProject(result.data.project);
    setSelectors([...selectors, newSelector] );
  };

  return (
    <DropDownEditorStyles>
      <div className={'dropDownContainer'}>
        <Box sx={{minWidth: 60, maxWidth: 120, marginLeft: 3}}>
          {selectors.map((selector) =>
            <FormControl key={selector.id} fullWidth>
              <InputLabel id="demo-simple-select-label">Button</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selector.title}
                label="Button"
                onChange={(event) => handleChange(event, selector.id)}
              >
                {props.section.content.values.map((value: string) => <MenuItem key={uuid()} value={value}>{value}</MenuItem>)}
              </Select>
            </FormControl>)}
          <Item onClick={addNewDropDown}>
            <Icon type="add" size={25} top={5} color='blue' />
            <ItemText>alerts</ItemText>
          </Item>
        </Box>
      </div>
    </DropDownEditorStyles>);
};
