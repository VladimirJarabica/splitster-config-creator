import * as React from "react";
import * as R from "ramda";
import { withFormik, FieldArray } from "formik";

import UserGroups from "./components/UserGroups"

const NEW_TEST = {
  description: "",
};

const ConfigCreator = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
  } = props;
  const { config, services } = values;
  console.log("values", values);
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Tests</legend>
        {R.compose(
          R.values,
          R.mapObjIndexed((val, key) => (
            <fieldset key={key}>
              <legend>{key}</legend>
              <input
                type="text"
                id={`config.tests.${key}.description`}
                onChange={handleChange}
                value={val.description}
              />
            </fieldset>
          )),
        )(config.tests)}
        <input
          type="text"
          id="services.newTest"
          onChange={handleChange}
          value={services.newTest}
          placeholder="New test"
        />
        <button
          onClick={() => {
            // TODO: check if test does not exist already
            setFieldValue(`config.tests.${services.newTest}`, NEW_TEST);
            setFieldValue("services.newTest", "");
          }}
        >
          Add test
        </button>
      </fieldset>
      <UserGroups values={values} handleChange={handleChange} setFieldValue={setFieldValue} />
      <fieldset>
        <legend>Options</legend>
        <fieldset>
          <legend>Cookies</legend>
          <label htmlFor="config.options.cookies.disabled">Disabled</label>
          <input
            type="checkbox"
            id="options.cookies.disabled"
            onChange={handleChange}
            checked={config.options.cookies.disabled}
          />
        </fieldset>
        <label htmlFor="config.options.separateTest">Separate test</label>
        <input
          type="checkbox"
          id="config.options.separateTest"
          onChange={handleChange}
          checked={config.options.separateTest}
        />
      </fieldset>
      <input type="text" name="config.kek" onChange={handleChange} value={config.kek} />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    config: props.initialValues || {
      tests: {
        kek: {
          description: "hello",
        },
      },
      userGroups: {},
      options: {
        cookies: {
          disabled: false,
        },
        separateTest: false,
      },
    },
    services: {
      newTest: "",
      newUserGroup: "",
      newUserGroupProp: {},
      userGroupValues: {},
    },
  }),
  handleSubmit: (values, { setSubmitting }) => {
    console.log("handleSubmit", values);
  },
  displayName: "ConfigCreator",
})(ConfigCreator);
