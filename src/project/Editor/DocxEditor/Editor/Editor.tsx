import React, {useCallback, useEffect, useRef, useState} from 'react';
import Quill from 'quill';
import {io, Socket} from 'socket.io-client';
import {EditorStyles} from './EditorStyles';
import {IProject} from '../../../interfaces/IProject';
import {useParams} from 'react-router-dom';
import {isEqual} from 'lodash';
import {MsConfig} from '../../../../config/MsConfig';
import {ISections} from '../../../interfaces/ISections';

// eslint-disable-next-line no-unused-vars
const TOOLBAR_OPTIONS = [
  [{header: [1, 2, 3, 4, 5, 6, false]}],
  [{font: []}],
  [{list: 'ordered'}, {list: 'bullet'}],
  ['bold', 'italic', 'underline'],
  [{color: []}, {background: []}],
  [{script: 'sub'}, {script: 'super'}],
  [{align: []}],
  ['image', 'blockquote', 'code-block'],
  ['clean'],
];

export interface IEditorProps {
  zoom: number;
  project: IProject | null;
  selectedSection: ISections | null;
}

const Editor = (props: IEditorProps) => {
  const {id: documentId} = useParams();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [quill, setQuill] = useState<Quill | null>(null);
  const dataRef = useRef<any>();

  const wrapperRef: any = useCallback((wrapper: Element) => {
    if (wrapper == null) return;
    wrapper.innerHTML = '';
    if (props.project == null) return;
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
    });
    q.disable();
    q.setText('Loading ...');

    setQuill(q);
  }, []);

  useEffect(() => {
    const s = io(MsConfig.rootPath);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [documentId, props.selectedSection]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once('load-document', (document: any) => {
      quill.setContents(document);
      dataRef.current = document;
      quill.enable();
    });
    quill.disable();
    quill.setText('Loading ...');
    socket.emit('get-document', {projectId: documentId, sectionId: props.selectedSection?._id});
  }, [socket, quill, documentId, props.selectedSection]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta: any, oldDelta: any, source: string) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };
    quill.on('text-change', handler);

    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: any) => {
      quill.updateContents(delta);
    };

    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      if (isEqual(dataRef.current.ops, quill.getContents().ops)) return;
      dataRef.current = quill.getContents();
      socket.emit('save-document', quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  return (
    <EditorStyles className='docxEditor' ref={wrapperRef} zoomPercentage={props.zoom}></EditorStyles>
  );
};

export default Editor;
