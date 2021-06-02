import React from "react";
import "carbon-components/css/carbon-components.min.css";
import "./NewStaffRequirement.scss";
import {
    Select,
    SelectItem,
    ComboBox
} from "carbon-components-react";

export default function SelectOrg ({
    orgType,
    orgList,
    orgSelect,
    selectOnChange
}) {

    return(
        <div style={{ marginBottom: "1.2rem",  backgroundColor:"#dadee9" }}>
            <ComboBox
                onChange={(item) => {selectOnChange(item)}}
                id={"combo"+orgType}
                light
                selectedItem={orgSelect}
                items={orgList}
                itemToString={(item) => (item ? item.description : "")}
                invalid={orgSelect === null}
                placeholder={"Escriba "+orgType+" ..."}
                shouldFilterItem={({ item: { description }, inputValue }) => 
                description.toLowerCase().includes(inputValue?.toLowerCase())
                }
            ></ComboBox>
            {/* <Select 
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
            </Select> */}
        </div>
    )
}