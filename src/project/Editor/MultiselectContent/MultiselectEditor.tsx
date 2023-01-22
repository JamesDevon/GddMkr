import {FormGroup} from '@mui/material';
import React, {useState} from 'react';
import {MultiselectContent} from '../../../interfaces/MultiSelectContent';
import {MultiSelectItem} from './MultiSelectItem/MultiSelectItem';
import {MultiselectEditorStyles} from './MultiselectEditorStyles';
import {Item, ItemText} from '../../NavBarTop/NavBarTopStyles';
import {Icon} from '../../../shared/components';
import {MultiSelectItemEditor} from './MultiSelectItemEditor/MultiSelectItemEditor';
import {ProjectService} from '../../../service/api/projects/ProjectService';
import {v4 as uuid} from 'uuid';

export interface MultiselectContentProps {
    items: MultiselectContent[] | undefined;
    setSelectedProject: any;
    projectId: string;
    sectionId: string;
}

export const MultiselectEditor= (props: MultiselectContentProps) => {
  const itemsMap = new Map<string, MultiselectContent>();

  props.items?.forEach((item) => {
    itemsMap.set(item.id, item);
  });

  const [items, setItems] = useState<Map<string, MultiselectContent>>(itemsMap);
  const [editingItem, setEditingItem] = useState<MultiselectContent | undefined>();

  const addItemToMap = (item: MultiselectContent) => {
    const newMap = new Map(items.entries());
    newMap.set(item.id, item);
    setItems(newMap);
  };

  const removeItemFromMap = (id: string) => {
    const newMap = new Map(items.entries());
    newMap.delete(id);
    setItems(newMap);
  };

  const setEditItem = (item: MultiselectContent | undefined = undefined) => {
    items.forEach((item) => item.editSelected = false);
    const itemToEdit = items.get(item?.id || '');
    if (itemToEdit == null) {
      setEditingItem(undefined);
      return;
    }
    itemToEdit.editSelected = true;
    addItemToMap(itemToEdit);
    setEditingItem(itemToEdit);
  };


  const createMultiSelectItem = async () => {
    const newItem: MultiselectContent = {
      id: uuid(),
      description: '',
      editSelected: false,
      selected: false,
      title: 'New Item',
    };
    const content: unknown[] = [];
    items.forEach((value) => {
      content.push({
        id: value.id,
        title: value.title,
        description: value.description,
        selected: false,
      });
    });
    content.push({id: newItem.id, title: newItem.title, description: newItem.description, selected: false});
    const result = await ProjectService.updateProjectSection(props.projectId, props.sectionId, {content: content});
    props.setSelectedProject(result.data.project);
    addItemToMap(newItem);
    setEditItem(newItem);
  };

  const deleteMultiSelectItem = async (id: string) => {
    itemsMap.delete(id);
    const content: unknown[] = [];
    itemsMap.forEach((value) => {
      content.push({
        id: value.id,
        title: value.title,
        description: value.description,
        selected: false,
      });
    });
    const result = await ProjectService.updateProjectSection(props.projectId, props.sectionId, {content: content});
    props.setSelectedProject(result.data.project);
    removeItemFromMap(id);
    setEditItem();
  };

  const updateValue = async (item: Partial<MultiselectContent>) => {
    if (item.id == null) return;
    const existingItem = itemsMap.get(item.id);
    if (existingItem == null) return;
    const updatedItem = {
      id: item.id,
      title: item.title ?? existingItem.title,
      description: item.description ?? existingItem.description,
      selected: item.selected ?? existingItem.selected,
      editSelected: item.editSelected ?? existingItem.editSelected,
    };
    itemsMap.set(item.id, updatedItem);
    const content: unknown[] = [];
    itemsMap.forEach((value) => {
      content.push({
        id: value.id,
        title: value.title,
        description: value.description,
        selected: value.selected,
      });
    });
    const result = await ProjectService.updateProjectSection(props.projectId, props.sectionId, {content: content});
    props.setSelectedProject(result.data.project);
    addItemToMap(updatedItem);
  };

  return (
    <MultiselectEditorStyles>
      <FormGroup className="container">
        <div className='list'>
          {Array.from(items.values()).map((item) => <MultiSelectItem key={item.id} item={item} editItem={setEditItem} update={updateValue}/>)}
          <Item onClick={createMultiSelectItem}>
            <Icon type="add" size={25} top={3} color='blue' />
            <ItemText>alerts</ItemText>
          </Item>
        </div>
        <div className='editor'>
          {editingItem?.editSelected ? <MultiSelectItemEditor key={editingItem.id} item={editingItem} update={updateValue} delete={deleteMultiSelectItem}/> : <></>}
        </div>
      </FormGroup>
    </MultiselectEditorStyles>
  );
};
