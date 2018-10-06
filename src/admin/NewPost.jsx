import React from 'react';
import Joi from 'joi-browser';
import Form from '../form/Form';
import Fields from './fields.json';
import NewPostSubFields from './NewPostSubFields';
import NewPostButtons from './NewPostButtons';
import { autoResizeTextarea } from '../common/util';
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
    try {
      const data = {
        created_by: authService.user._id,
        status: e.currentTarget.dataset.type,
        ...this.state.data
      };

      const response = await fetch(`http://localhost:3000/api/posts`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const { success, post, errors = {} } = await response.json();

      this.setState({ success, errors });

      if (success) {
        this.props.history.replace(
          `/post/${post._id}/${post.title}?success=true`
        );
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  componentDidMount() {
    document.body.classList.add('no-footer');
  }

  componentWillUnmount() {
    document.body.classList.remove('no-footer');
  }

  render() {
    return (
      <React.Fragment>
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
