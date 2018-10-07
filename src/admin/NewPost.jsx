import React from 'react';
import Joi from 'joi-browser';
import Form from '../form/Form';
import Fields from './fields.json';
import NewPostSubFields from './NewPostSubFields';
import NewPostButtons from './NewPostButtons';
import { autoResizeTextarea, getEncodeURI } from '../common/util';
import CustomizedSnackbars from '../common/MySnackbarContent';
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
    try {
      const { type, id } = this.props.match.params;
      const data = {
        created_by: authService.user._id,
        status: e.currentTarget.dataset.type,
        ...this.state.data
      };
      let method = 'POST';
      let url = `http://localhost:3000/api/posts`;

      if (type === 'edit') {
        url += `/${id}`;
        method = 'PATCH';
      }

      const response = await fetch(url, {
        mode: 'cors',
        method,
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const { success, post, errors = {} } = await response.json();

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
    } catch (ex) {
      console.log(ex);
    }
  }

  async componentDidMount() {
    document.body.classList.add('no-footer');
    const { type, id } = this.props.match.params;

    if (type === 'edit') {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
          mode: 'cors'
        });
        const data = await response.json();
        const {
          title,
          description,
          tags = '',
          category = '',
          image = ''
        } = data;

        this.setState({ data: { title, description, tags, category, image } });
        const elem = document.querySelector('[name="title"]');
        autoResizeTextarea(elem);
      } catch (ex) {
        console.log(ex);
      }
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
