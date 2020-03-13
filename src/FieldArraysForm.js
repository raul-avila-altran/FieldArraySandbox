import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "./validate";
import optionsFile from "./options";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderHobbies = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Dependancy
      </button>
    </li>
    {fields.map((hobby, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Dependancy"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Dependancy #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);
const renderOptions = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Option
      </button>
    </li>
    {fields.map((option, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Option"
          onClick={() => fields.remove(index)}
        />
        <Field name={`${option}.option`} component="select">
          <option />
          <option value={optionsFile.options[index]}>ave</option>
          <option value="singleParameter">singleParameter</option>
          <option value="">Other</option>
        </Field>
        <Field
          name={`${option}.option`}
          type="text"
          component={renderField}
          label={`Option`}
        />
        <Field
          name={`${option}`}
          type="text"
          component={renderField}
          label={`Option conditional`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

const renderTask = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Task
      </button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((task, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Task"
          onClick={() => fields.remove(index)}
        />
        <h4>Task #{index + 1}</h4>
        <Field
          name={`${task}.name`}
          type="text"
          component={renderField}
          label="Task Name"
        />
        <Field
          name={`${task}.type`}
          type="text"
          component={renderField}
          label="Task Type"
        />
        <Field
          name={`${task}.waitForReturn`}
          type="checkbox"
          component={renderField}
          label="Wait For Return"
        />
        <Field
          name={`${task}.queue`}
          type="text"
          component={renderField}
          label="queue"
        />
        <FieldArray name={`${task}.options`} component={renderOptions} />
        <FieldArray name={`${task}.dependsOn`} component={renderHobbies} />
        {/* <FieldArray name={`${task}.dependsOn`} component={renderDependancy} /> */}
      </li>
    ))}
  </ul>
);

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" type="text" component={renderField} label="Name" />
      <Field name="type" type="text" component={renderField} label="Type" />
      <Field
        name="removedAtEnd"
        type="checkbox"
        component={renderField}
        label="Removed At End"
      />
      <FieldArray name="tasks" component={renderTask} />
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "fieldArrays", // a unique identifier for this form
  validate
})(FieldArraysForm);
