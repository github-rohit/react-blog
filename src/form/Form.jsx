import React, { Component } from 'react';
import FieldMarkup from '../form/FormFields';
import Joi from 'joi-browser';

class Form extends Component {
  handleChange({ currentTarget: input }) {
    const errors = { ...this.state.errors };
    const errorMessage = this.validate(input);

    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  }

  handleSubmit(e) {
    e.preventDefault();

    const errors = this.validateAll();
    this.setState({ errors: errors || {} });

    if (errors) {
      return;
    }

    this.doSubmit();
  }

  doSubmit() {
    console.log('[Do Something]');
  }

  renderFieldMarkup({ name, ...props }) {
    const { data, errors } = this.state;

    return (
      <FieldMarkup
        key={name}
        error={errors[name]}
        value={data[name]}
        onChange={this.handleChange.bind(this)}
        name={name}
        {...props}
      />
    );
  }

  renderAllFieldMarkup(fields) {
    return fields.map(field => this.renderFieldMarkup(field));
  }

  validateAll() {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });

    if (!error) {
      return null;
    }

    const errors = {};

    for (let item of error.details) {
      !errors[item.path[0]] && (errors[item.path[0]] = item.message);
    }

    return errors;
  }

  validate({ name, value }) {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }
}

export default Form;
