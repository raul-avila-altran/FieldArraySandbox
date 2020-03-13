import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderOptions = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Option</button>
    </li>
    {fields.map((option, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Option"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={option}
          type="text"
          component={renderField}
          label={`Option #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);
const renderDependancy = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Dependancy</button>
    </li>
    {fields.map((dependancy, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Dependancy"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={dependancy}
          type="text"
          component={renderField}
          label={`Dependancy #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

const renderTask = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>Add Task</button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((task, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Task"
          onClick={() => fields.remove(index)}
        />
        <h4>Member #{index + 1}</h4>
        <Field
          name="name"
          type="text"
          component={renderField}
          label="Task Name"
        />
        <Field
          name="type"
          type="text"
          component={renderField}
          label="Task Type"
        />
        <Field
          name="waitForReturn"
          type="text"
          component={renderField}
          label="Wait For Return"
        />
        <Field
          name="queue"
          type="text"
          component={renderField}
          label="salesforce"
        />
        <FieldArray name={"options"} component={renderOptions} />
        <FieldArray name={"dependsOn"} component={renderDependancy} />
      </li>
    ))}
  </ul>
);

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        type="text"
        component={renderField}
        label="Name"
      />
      <Field
        name="type"
        type="text"
        component={renderField}
        label="Type"
      />
      <Field
        name="removedAtEnd"
        type="checkbox"
        component={renderField}
        label="Removed At End"
      />
      <FieldArray name="members" component={renderTask} />
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate,
})(FieldArraysForm);
