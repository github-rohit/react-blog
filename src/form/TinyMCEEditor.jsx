import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function TinyMCEEditor({ name, ...props }) {
  return (
    <Editor
      init={{
        name,
        theme: 'modern',
        menubar: false,
        branding: false,
        autoresize_bottom_margin: 0,
        autoresize_min_height: 300,
        plugins: [
          'advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help autoresize'
        ],
        toolbar:
          'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent table | link image, media | forecolor backcolor | code',
        image_advtab: true
      }}
      {...props}
    />
  );
}

export default TinyMCEEditor;
