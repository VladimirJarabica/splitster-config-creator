import * as React from "react";
import * as R from "ramda";

const UserGroupProp = props => {
  const {
    values,
    handleChange,
    setFieldValue,
    userGroupId,
    userGroupPropId,
    userGroupPropValue,
  } = props;
  const { config, services } = values;
  return (
    <fieldset key={userGroupPropId}>
      <legend>Property: {userGroupPropId}</legend>
      {userGroupPropValue.map((value, index) => (
        <React.Fragment>
          <input
            key={index}
            type="text"
            id={`config.userGroups.${userGroupId}.${userGroupPropId}[${index}]`}
            onChange={handleChange}
            value={config.userGroups[userGroupId][userGroupPropId][index]}
          />
          <button
            onClick={() => {
              setFieldValue(
                `config.userGroups.${userGroupId}.${userGroupPropId}`,
                R.remove(index, 1, userGroupPropValue),
              );
            }}
          >
            Remove
          </button>
        </React.Fragment>
      ))}
      <input
        key={`${userGroupPropId}_new_prop`}
        type="text"
        id={`services.userGroupValues.${userGroupId}.${userGroupPropId}`}
        onChange={handleChange}
        value={R.pathOr("", ["userGroupValues", userGroupId, userGroupPropId], services)}
      />
      <button
        onClick={() => {
          setFieldValue(
            `config.userGroups.${userGroupId}.${userGroupPropId}.${userGroupPropValue.length}`,
            services.userGroupValues[userGroupId][userGroupPropId],
          );
          setFieldValue(`services.userGroupValues.${userGroupId}.${userGroupPropId}`);
        }}
      >
        Add value
      </button>
    </fieldset>
  );
};

export default UserGroupProp;
