import React from "react";
import "carbon-components/css/carbon-components.min.css";
import { Checkbox } from "carbon-components-react";
import "./ConfigRequirement.scss";

export default function ConfigRequirementSociety({
  societyId,
  societyName,
  societyLevel,
  societyOnChange,
}) {
  return (
    <div style={{ marginBottom: "1.05rem" }}>
      <Checkbox
        className="checkbox a"
        labelText={societyName}
        id={societyId.toString()}
        checked={!!societyLevel}
        value={!!societyLevel}
        onChange={() => {
          societyOnChange(societyId, societyLevel == 1 ? 0 : 1);
        }}
      />
    </div>
  );
}
