import {ISections} from '../../interfaces/ISections';
import {isIncludedIn} from './isIncludedIn';

export const findSectionPath = (parentSections: Array<ISections>, sectionKey: string): Array<number> => {
  const pathArray: Array<number> = [];
  for (let i=0; i<parentSections.length; i++) {
    const isEqual = sectionKey === parentSections[i]._id;
    if (isEqual) {
      pathArray.push(i);
      return pathArray;
    }
    if (parentSections[i].subSections) {
      // @ts-ignore
      const included = isIncludedIn(parentSections[i].subSections, sectionKey);
      if (included) {
        pathArray.push(i);
        // @ts-ignore
        pathArray.push(...findSectionPath(parentSections[i].subSections, sectionKey));
        return pathArray;
      }
    }
  }
  return pathArray;
};
