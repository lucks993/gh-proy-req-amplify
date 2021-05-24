import React, { useState } from "react";
import { Button, TextInput } from "carbon-components-react";
import "carbon-components/css/carbon-components.min.css";
import { AddFilled32, TrashCan32 } from '@carbon/icons-react';
import './RequirementGroupForm.scss';
const RequirementGroup = props => {
    const [dataContent, setDataContent] = useState([0]);

    const addRow = () => {
        setDataContent([...dataContent, dataContent.length]);
    }
    const addRowUnique = () => {
        setDataContent([...dataContent, dataContent.length]);
        if (props.countFunc != null) { props.countFunc(dataContent.length+1) }
    }
    const deleteRow = (index) => {
        setDataContent(dataContent.filter((_, itemIndex) => itemIndex !== index));
    }
    const deleteRowUnique = (index) => {
        setDataContent(dataContent.filter((_, itemIndex) => itemIndex !== index));
        if (props.countFunc != null) { props.countFunc(dataContent.length-1) }
    }

    const showContent = () => {
        return dataContent.map((data, index) => {

            return (<div className="bx--row row-data" key={index} id={index} style={{ height: "2rem" }}>
                <div className="bx--col-lg-1" >
                    <span>{index + 1}</span>
                </div>
                {props.type === "1" &&
                    <div className="bx--col-lg-8">
                        <TextInput placeholder="Añada información" light readOnly/>
                    </div>
                }
                {props.type === "2" &&
                    <div className="bx--col-lg-4">
                        <TextInput placeholder="Añada información" light readOnly/>
                    </div>
                    
                }
                {props.type === "2" &&
                    <div className="bx--col-lg-4">
                        <TextInput placeholder="Añada información" light readOnly/>
                    </div>
                }
                {/* {props.type === "3" &&
                    <div className="bx--col-lg-2">
                        <TextInput placeholder="Añada información" light readOnly/>
                    </div>
                    
                } */}
                {props.type === "3" &&
                    <div className="bx--col-lg-4">
                        <TextInput placeholder="Añada información" light readOnly/>
                    </div>
                }
                {props.type === "3" &&
                    <div className="bx--col-lg-4">
                        <TextInput placeholder="Añada información" light readOnly/>
                    </div>
                }
                {props.type === "1" &&
                    <div className="bx--col-lg-3">
                        {(dataContent.length === 1) ? (
                            <Button
                                hasIconOnly
                                renderIcon={TrashCan32}
                                tooltipAlignment="center"
                                tooltipPosition="bottom"
                                iconDescription="Eliminar función"
                                kind='ghost'
                                onClick={() => deleteRow(index)}
                                disabled/> 
                         ) : (
                            <Button
                            hasIconOnly
                            renderIcon={TrashCan32}
                            tooltipAlignment="center"
                            tooltipPosition="bottom"
                            iconDescription="Eliminar función"
                            kind='ghost'
                            onClick={() => deleteRow(index)}/>
                         )
                        }
                    </div>}
                {props.type === "2" &&
                    <div className="bx--col-lg-3">
                        {(dataContent.length === 1) ? (
                            <Button
                                hasIconOnly
                                renderIcon={TrashCan32}
                                tooltipAlignment="center"
                                tooltipPosition="bottom"
                                iconDescription="Eliminar función"
                                kind='ghost'
                                onClick={() => deleteRow(index)}
                                disabled/> 
                         ) : (
                            <Button
                            hasIconOnly
                            renderIcon={TrashCan32}
                            tooltipAlignment="center"
                            tooltipPosition="bottom"
                            iconDescription="Eliminar función"
                            kind='ghost'
                            onClick={() => deleteRow(index)}/>
                         )
                        }
                    </div>}
                {props.type === "3" &&
                    <div className="bx--col-lg-3">
                        {(dataContent.length === 1) ? (
                            <Button
                                hasIconOnly
                                renderIcon={TrashCan32}
                                tooltipAlignment="center"
                                tooltipPosition="bottom"
                                iconDescription="Eliminar función"
                                kind='ghost'
                                onClick={() => deleteRowUnique(index)}
                                disabled/>
                         ) : (
                            <Button
                                hasIconOnly
                                renderIcon={TrashCan32}
                                tooltipAlignment="center"
                                tooltipPosition="bottom"
                                iconDescription="Eliminar función"
                                kind='ghost'
                                onClick={() => deleteRowUnique(index)} />
                         )
                         }
                    </div>}
            </div>);
        })

    }
    const renderButton = () => {
        var buttonNuevoType2;
        if (props.type === "3") {
            buttonNuevoType2 = (
                ((!props.checkUniqueValue) ?
                    ((dataContent.length < 3) ? (
                        <Button className="custom-class" kind='ghost' renderIcon={AddFilled32} size='small' onClick={addRowUnique} disabled>Nuevo</Button>)
                    : (<Button className="custom-class" kind='ghost' renderIcon={AddFilled32} size='small' onClick={addRowUnique} disabled >Nuevo</Button>
                        )   
                ) : (
                    <Button className="custom-class" kind='ghost' renderIcon={AddFilled32} size='small' onClick={addRowUnique} disabled >Nuevo</Button>    
                ))
            )
        }
        else if (props.type === "2") {
            buttonNuevoType2 = (
                <Button className="custom-class" kind='ghost' renderIcon={AddFilled32} size='small' onClick={addRow} disabled>Nuevo</Button>
            )
        } else {
            buttonNuevoType2 = (
                <Button className="custom-class" kind='ghost' renderIcon={AddFilled32} size='small' onClick={addRow} disabled>Nuevo</Button>
            )
        }
        return buttonNuevoType2
    }
    var div1, div2, div3;
    if (props.type === "3") {
        div1 = (<div className="bx--col-lg-4">
            <span>{props.firstLabel}</span>
        </div>);
        div2 = (<div className="bx--col-lg-4">
            <span>{props.secondLabel}</span>
        </div>);
    }
    else if (props.type === "2") {
        div1 = (<div className="bx--col-lg-4">
            <span>{props.firstLabel}</span>
        </div>);
        div2 = (<div className="bx--col-lg-4">
            <span>{props.secondLabel}</span>
        </div>);
    } else {
        div1 = <div className="bx--col-lg-8">
            <span>{props.firstLabel}</span>
        </div>
    }
    return (
        <div className="bx--row">
            <div className="bx--col">
                <label className="label-group">{props.name}</label>
                {renderButton()}
                <div className="bx--row row-header" style={{ height: "2rem", fontWeight: "bold" }}>
                    <div className="bx--col-lg-1" >
                        <span>#</span>
                    </div>
                    
                    {div1}
                    {div2}
                    {div3}
                    
                    
                    <div className="bx--col-lg-3">
                        <span>Acción</span>
                    </div>
                </div>

                {showContent()}
            </div>
        </div>
        );
};
export default RequirementGroup;
