import {ISections} from '../../interfaces/ISections';

export const isIncludedIn = (parentSections: Array<ISections>, subSectionKey: string = ''): boolean => {
  let found = false;
  for (let i=0; i<parentSections.length; i++) {
    found = (parentSections[i]._id === subSectionKey);
    if (found) {
      return found;
    } else if (parentSections[i].subSections) {
      // @ts-ignore
      found = isIncludedIn(parentSections[i].subSections, subSectionKey);
    }
  }
  return found;
};
