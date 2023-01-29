import {ISections} from './ISections';

export interface IProject {
    _id: string;
    userId: string;
    genre: string;
    title: string;
    description: string;
    sections: ISections<any>[];
    __v: number;
}
