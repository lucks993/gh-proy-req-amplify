import React from "react";
import "carbon-components/css/carbon-components.min.css";
import "./NewStaffRequirement.scss";
import {
    Select,
    SelectItem
} from "carbon-components-react";

export default function SelectOrg ({
    orgType,
    orgList,
    selectOnChange
}) {

    return(
        <div style={{ marginBottom: "1.2rem",  backgroundColor:"#dadee9" }}>
            <Select 
              id={"select-" + orgType}
              labelText={orgType} 
              light   
              onChange={(item) => {selectOnChange(item.currentTarget.value)}}       
            >
                {orgList.map(org => {
                    return(
                        <SelectItem 
                          key={org.id.toString()}
                          text={org.description}
                          value={org.id}/>
                    )
                })}
            </Select>
        </div>
    )
}