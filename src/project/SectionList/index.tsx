import React, {useState} from 'react';
import {Collapse, List, ListItemButton, ListItemText, ListSubheader} from '@mui/material';
import {ISections} from '../interfaces/ISections';
import {ListHeader} from './Styles';

interface ISectionListProps {
  sections: ISections[] | undefined;
  selectedSection: ISections | null;
  setSelectedSection: any;
}

export const SectionList = (props: ISectionListProps) => {
  const [selectedSub, setSelectedSub] = useState<ISections | null >(null);
  let index =0;

  const handleSelection = (e: any, key: any) => {
    if (props.sections == null) return;
    setSelectedSub(null);
    const newSelectedSections = props.sections.filter((section) => section._id == key);
    props.setSelectedSection((newSelectedSections.length > 0) ? newSelectedSections[0] : null);
  };

  const handleSubSelection = (e: any, key: any) => {
    if (!props.selectedSection?.subSections) return;
    const selectedS = props.selectedSection.subSections.filter((section) => section._id == key);
    setSelectedSub((selectedS.length > 0) ? selectedS[0] : null);
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
            <>
              <ListItemButton className={(section._id == props.selectedSection?._id) ? 'Mui-selected' : ''}
                key={section._id}
                onClick={(event: any) => handleSelection(event, section._id)}>
                <ListItemText primary={index++ + '. ' + section.title} />
              </ListItemButton>
              <Collapse in={section._id == props.selectedSection?._id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {props.selectedSection?.subSections?.map((subSection, subIndex) =>
                    <ListItemButton
                      className={(subSection._id === selectedSub?._id) ? 'Mui-selected' : ''}
                      sx={{pl: 4}}
                      key={`button ${subSection._id}`}
                      onClick={(event: any) => handleSubSelection(event, subSection._id)}>
                      <ListItemText primary={`${subIndex}. ${subSection.title}`} key={subSection._id}/>
                    </ListItemButton>,
                  )}
                </List>
              </Collapse>
            </>
          );
        })
      }
    </List>
  );
};
