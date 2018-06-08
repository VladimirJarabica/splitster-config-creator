import * as React from "react";
import * as R from "ramda";

import UserGroupProp from "./UserGroupProp";

const NEW_USER_GROUP_PROP = [];

const UserGroup = props => {
  const { values, handleChange, setFieldValue, userGroupId, userGroupValue } = props;
  const { config, services } = values;
  return (
    <fieldset key={userGroupId}>
      <legend>User group: {userGroupId}</legend>
      {R.compose(
        R.values,
        R.mapObjIndexed((val, key) => (
          <UserGroupProp
            values={values}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            userGroupId={userGroupId}
            userGroupPropId={key}
            userGroupPropValue={val}
          />
        )),
      )(userGroupValue)}
      <input
        type="text"
        id={`services.newUserGroupProp.${userGroupId}`}
        onChange={handleChange}
        value={R.pathOr("", ["newUserGroupProp", userGroupId], services)}
        placeholder="New user group prop"
      />
      <button
        onClick={() => {
          setFieldValue(
            `config.userGroups.${userGroupId}.${services.newUserGroupProp[userGroupId]}`,
            NEW_USER_GROUP_PROP,
          );
          setFieldValue(`services.newUserGroupProp.${userGroupId}`);
        }}
      >
        Add user group prop
      </button>
    </fieldset>
  );
};

export default UserGroup;
