import React from 'react';
import {List, ListItemButton, ListItemText, ListSubheader} from '@mui/material';
import {ISections} from '../interfaces/ISections';
import {ListHeader} from './Styles';

interface ISectionListProps {
  sections: ISections[] | undefined;
  selectedSection: ISections | null;
  setSelectedSection: any;
}

export const SectionList = (props: ISectionListProps) => {
  let index =0;

  const handleSelection = (e: any, key: any) => {
    if (props.sections == null) return;
    const newSelectedSections = props.sections.filter((section) => section._id == key);
    props.setSelectedSection((newSelectedSections.length > 0) ? newSelectedSections[0] : null);
  };

  return (
    <List
      sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListHeader>
          <ListSubheader component="div" id="nested-list-subheader">
              Sections
          </ListSubheader>
        </ListHeader>
      }
    >
      {
        props?.sections?.map((section) => {
          return (
            <ListItemButton className={(section._id == props.selectedSection?._id) ? 'Mui-selected' : ''} key={section._id} onClick={(event: any) => handleSelection(event, section._id)}>
              <ListItemText primary={index++ + '. ' + section.title} />
            </ListItemButton>
          );
        })
      }
    </List>
  );
};
