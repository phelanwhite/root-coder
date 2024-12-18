
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const EditorReact = () => {
  return (
    <div>
      <CKEditor
       editor={ ClassicEditor }
       data="<p>Hello from CKEditor 5!</p>"
       onChange={ ( event, editor ) => console.log( { event, editor } ) }
      />
    </div>
  );
};

export default EditorReact;
