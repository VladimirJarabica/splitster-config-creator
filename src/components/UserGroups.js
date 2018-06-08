import * as React from "react";
import * as R from "ramda";

import UserGroup from "./UserGroup";

const NEW_USER_GROUP = {};

const UserGroups = props => {
  const { values, handleChange, setFieldValue } = props;
  const { config, services } = values;
  return (
    <fieldset>
      <legend>User groups</legend>
      {R.compose(
        R.values,
        R.mapObjIndexed((val, key) => (
          <UserGroup
            values={values}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            userGroupId={key}
            userGroupValue={val}
          />
        )),
      )(config.userGroups)}
      <input
        type="text"
        id="services.newUserGroup"
        onChange={handleChange}
        value={services.newUserGroup}
        placeholder="New user group"
      />
      <button
        onClick={() => {
          // TODO: check if test does not exist already
          setFieldValue(`config.userGroups.${services.newUserGroup}`, NEW_USER_GROUP);
          setFieldValue("services.newUserGroup", "");
        }}
      >
        Add user group
      </button>
    </fieldset>
  );
};

export default UserGroups;
