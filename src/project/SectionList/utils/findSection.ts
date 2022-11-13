import {ISections} from '../../interfaces/ISections';
import {ContentTypeEnum} from '../../../enums/ContentType.enum';

export const findSection = (parentSections: Array<ISections>, path: Array<number>): ISections | null => {
  let section: ISections = {
    title: '',
    content: '',
    _id: '',
    type: ContentTypeEnum.Parent,
    subSections: parentSections,
  };
  for (let i=0; i<path.length; i++) {
    // @ts-ignore
    section = section.subSections[path[i]];
  }
  return section;
};
