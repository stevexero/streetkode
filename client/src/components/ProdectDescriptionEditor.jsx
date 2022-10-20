import { useEffect, useRef, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs'; // FIXME: When seller goes to edit listing
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { setProductDescription } from '../features/productDescription/productDescriptionSlice';
import { useDispatch } from 'react-redux';

const ProductDescriptionEditor = () => {
  const dispatch = useDispatch();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = useRef(null);

  useEffect(() => {
    dispatch(
      setProductDescription(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      )
    );
  }, [dispatch, editorState]);

  return (
    <div>
      <Editor
        ref={editor}
        editorState={editorState}
        wrapperClassName='demo-wrapper'
        editorClassName='demo-editor'
        onEditorStateChange={(editorState) => setEditorState(editorState)}
        toolbar={{
          options: ['list'],
        }}
      />
    </div>
  );
};

export default ProductDescriptionEditor;
