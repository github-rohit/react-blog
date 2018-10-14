import React from 'react';
import Joi from 'joi-browser';
import Form from '../form/Form';
import Fields from './fields.json';
import NewPostSubFields from './NewPostSubFields';
import NewPostButtons from './NewPostButtons';
import { autoResizeTextarea, getEncodeURI } from '../common/util';
import CustomizedSnackbars from '../common/MySnackbarContent';
import http from '../common/services/PostHttpService';
import authService from '../common/services/AuthService';

class NewPost extends Form {
  state = {
    data: {
      title: '',
      description: '',
      image: '',
      category: '',
      tags: ''
    },
    snackbar: null,
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .min(5)
      .label('Title'),
    description: Joi.string()
      .required()
      .label('Description')
  };

  handelKeyDown(e) {
    if (e.key === 'Enter') e.preventDefault();
  }

  handelKeyup(e) {
    if (e.key === 'Enter') e.preventDefault();
    autoResizeTextarea(e.currentTarget);
  }

  async doSubmit(e) {
    this.setState({ snackbar: null });
    const { type, id } = this.props.match.params;
    const data = {
      created_by: authService.user._id,
      status: e.currentTarget.dataset.type,
      ...this.state.data
    };
    let response;

    if (type === 'edit') {
      response = await http.patch(id, data);
    } else {
      response = await http.post(data);
    }

    if (!response) {
      return;
    }

    const { success, post, errors = {} } = response;

    this.setState({ errors });

    if (success && data.status !== 'DRAFT') {
      this.props.history.replace(
        `/post/${post._id}/${getEncodeURI(post.title)}`
      );
    } else if (success) {
      this.setState({
        snackbar: {
          variant: 'success',
          autoHideDuration: 6000,
          message: 'Post updated successfully.'
        }
      });
    }
  }

  async componentDidMount() {
    document.body.classList.add('no-footer');
    const { type, id } = this.props.match.params;

    if (type === 'edit') {
      const response = await http.getById(id);

      if (!response) {
        return;
      }

      const data = response;
      const { title, description, tags = '', category = '', image = '' } = data;

      this.setState({ data: { title, description, tags, category, image } });
      const elem = document.querySelector('[name="title"]');
      autoResizeTextarea(elem);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('no-footer');
  }

  render() {
    const { snackbar } = this.state;

    return (
      <React.Fragment>
        {snackbar && <CustomizedSnackbars {...snackbar} />}
        {authService.user && (
          <form className="ui-new-post">
            <div className="row">
              <div className="col">
                {this.renderFieldMarkup({
                  onKeyDown: this.handelKeyDown,
                  onKeyUp: this.handelKeyup,
                  ...Fields[0]
                })}
                {this.renderFieldMarkup(Fields[1])}
              </div>
              <div className="col-md-3">
                <NewPostSubFields
                  Fields={[...Fields].slice(2)}
                  onChange={this.handleChange.bind(this)}
                  otherData={this.state.data}
                />
              </div>
            </div>
            <NewPostButtons
              validateAll={this.validateAll.bind(this)}
              handleSubmit={this.handleSubmit.bind(this)}
            />
          </form>
        )}
      </React.Fragment>
    );
  }
}

export default NewPost;
