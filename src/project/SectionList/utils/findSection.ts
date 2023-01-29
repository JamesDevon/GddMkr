import {ISections} from '../../interfaces/ISections';
import {ContentTypeEnum} from '../../../enums/ContentType.enum';

export const findSection = (parentSections: Array<ISections<any>>, path: Array<number>): ISections<any> | null => {
  let section: ISections<any> = {
    title: '',
    content: '',
    _id: '',
    type: ContentTypeEnum.Parent,
    subSections: parentSections,
  };
  for (let i=0; i<path.length; i++) {
    // @ts-ignore
    if (section.subSections?.length >= path[i]) {
      // @ts-ignore
      section = section.subSections[path[i]];
    }
  }
  return section;
};
