import React, {useState} from 'react';
import {Collapse, List, ListItemButton, ListItemText, ListSubheader} from '@mui/material';
import {ISections} from '../interfaces/ISections';
import {ListHeader} from './Styles';
import {findSectionPath} from './utils/findSectionPath';
import {findSection} from './utils/findSection';
import {isIncludedIn} from './utils/isIncludedIn';

interface ISectionListProps {
  sections: ISections[] | undefined;
  selectedSection: ISections | null;
  setSelectedSection: any;
}

export const SectionList = (props: ISectionListProps) => {
  const [sectionPath, setSectionPath] = useState<Array<number>>([]);
  let index =0;

  const handleSelection = (e: any, key: string) => {
    if (props.sections == null) return;
    const path = findSectionPath(props.sections, key);
    const newSelectedSection = findSection(props.sections, path);
    props.setSelectedSection(newSelectedSection);
    setSectionPath(path);
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
        props?.sections?.map((section, sKey) => (
          <>
            <ListItemButton className={(isIncludedIn([section], props.selectedSection?._id)) ? 'Mui-selected' : ''}
              key={section._id}
              onClick={(event: any) => handleSelection(event, section._id)}>
              <ListItemText primary={index++ + '. ' + section.title} />
            </ListItemButton>
            <Collapse in={sKey == sectionPath[0]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {
                  (sKey == sectionPath[0]) ?
                      (section.subSections?.map((subSection, subIndex) => {
                        return <ListItemButton
                          className={(subIndex == sectionPath[1]) ? 'Mui-selected' : ''}
                          sx={{pl: 4}}
                          key={`button ${subSection._id}`}
                          onClick={(event: any) => handleSelection(event, subSection._id)}>
                          <ListItemText primary={`${subIndex}. ${subSection.title}`} key={subSection._id}/>
                        </ListItemButton>;
                      })) :
                        <></>
                }
              </List>
            </Collapse>
          </>
        ),
        )
      }
    </List>
  );
};
