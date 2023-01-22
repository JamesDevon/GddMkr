import {ContentTypeEnum} from '../../enums/ContentType.enum';

export interface ISections {
    title: string;
    content: any;
    _id: string;
    type: ContentTypeEnum;
    subSections: Array<ISections> | undefined;
}
