import React from 'react';
import Button from '@material-ui/core/Button';

function NewPostButtons({ validateAll, handleSubmit }) {
  return (
    <React.Fragment>
      <div className="fixed-wrapper-btns create-btns clearfix">
        <div className="container">
          <Button
            disabled={!!validateAll()}
            onClick={handleSubmit}
            data-type="publish"
            type="submit"
            variant="outlined"
            color="primary"
          >
            Publish
          </Button>
          &nbsp; &nbsp;
          <Button
            data-type="draft"
            disabled={!!validateAll()}
            onClick={handleSubmit}
            type="submit"
            color="default"
          >
            Save as Draft
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewPostButtons;
