import {ContentTypeEnum} from '../../enums/ContentType.enum';

export interface ISections<T> {
    title: string;
    content: T;
    _id: string;
    type: ContentTypeEnum;
    subSections: Array<ISections<any>> | undefined;
}
