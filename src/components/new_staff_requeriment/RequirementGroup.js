import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Button, TextInput } from "carbon-components-react";
import "carbon-components/css/carbon-components.min.css";
import { AddFilled32, TrashCan32 } from "@carbon/icons-react";
import "./RequirementGroup.scss";

function RequirementGroup({
  id,
  name,
  firstLabel,
  secondLabel,
  puestoInformation,
  type,
}, ref) {
  const [dataContent, setDataContent] = useState([{
      description: "",
      descriptionAdditional: ""
  }]);

  useEffect(() => {
      if(!!puestoInformation){
          const newDataContent = puestoInformation.information.filter( item => {
              return item.charac.id === id
          })
          if(newDataContent.length === 0){
            setDataContent([{
              description: "",
              descriptionAdditional: ""
          }])
          }
          else{
            setDataContent(newDataContent)
          }
      }
      else{
        setDataContent([{
            description: "",
            descriptionAdditional: ""
        }])
      }
  }, [puestoInformation])

  const getDataContent = () => {
      return dataContent
  }

  useImperativeHandle(ref, () => {
      return {
        getDataContent
      }
  }, [dataContent])

  const addRow = () => {
    setDataContent([...dataContent, {description: "",descriptionAdditional: ""}]);
  };
  // const addRowUnique = () => {
  //     setDataContent([...dataContent, dataContent.length]);
  //     if (props.countFunc != null) { props.countFunc(dataContent.length+1) }
  // }
  const deleteRow = (index) => {
    setDataContent(dataContent.filter((_, itemIndex) => itemIndex !== index));
  };
  // const deleteRowUnique = (index) => {
  //     setDataContent(dataContent.filter((_, itemIndex) => itemIndex !== index));
  //     if (props.countFunc != null) { props.countFunc(dataContent.length-1) }
  // }

  const onChangeText = (index, key) => {
    return (event => {
        const newRow = {...dataContent[index], [key]: event.target.value}
        const newDataContent = dataContent.map( (item, itemIndex) => {
            return itemIndex === index ? newRow : item
        })
        setDataContent(newDataContent)
    })
  }

  const showContent = () => {
      return dataContent.map((data, index) => {
        return (
          <div
            className="bx--row row-data"
            key={index}
            id={index}
            style={{ height: "2rem" }}
          >
            <div className="bx--col-lg-1">
              <span>{index + 1}</span>
            </div>
            {type === "1" && (
              <div className="bx--col-lg-8">
                <TextInput placeholder="A??ada informaci??n" value={data.description} onChange={onChangeText(index, "description")} light />
              </div>
            )}
            {type === "2" && (
              <div className="bx--col-lg-4">
                <TextInput placeholder="A??ada informaci??n" value={data.description} onChange={onChangeText(index, "description")} light />
              </div>
            )}
            {type === "2" && (
              <div className="bx--col-lg-4">
                <TextInput placeholder="A??ada informaci??n" value={data.descriptionAdditional} onChange={onChangeText(index, "descriptionAdditional")} light />
              </div>
            )}
            {/* {type === "3" &&
                    <div className="bx--col-lg-2">
                        <TextInput placeholder="A??ada informaci??n" light />
                    </div>
                    
                }
                {type === "3" &&
                    <div className="bx--col-lg-4">
                        <TextInput placeholder="A??ada informaci??n" light />
                    </div>
                }
                {type === "3" &&
                    <div className="bx--col-lg-4">
                        <TextInput placeholder="A??ada informaci??n" light />
                    </div>
                } */}
            {type === "1" && (
              <div className="bx--col-lg-3">
                {dataContent.length === 1 ? (
                  <Button
                    hasIconOnly
                    renderIcon={TrashCan32}
                    tooltipAlignment="center"
                    tooltipPosition="bottom"
                    iconDescription="Eliminar funci??n"
                    kind="ghost"
                    onClick={() => deleteRow(index)}
                    disabled
                  />
                ) : (
                  <Button
                    hasIconOnly
                    renderIcon={TrashCan32}
                    tooltipAlignment="center"
                    tooltipPosition="bottom"
                    iconDescription="Eliminar funci??n"
                    kind="ghost"
                    onClick={() => deleteRow(index)}
                  />
                )}
              </div>
            )}
            {type === "2" && (
              <div className="bx--col-lg-3">
                {dataContent.length === 1 ? (
                  <Button
                    hasIconOnly
                    renderIcon={TrashCan32}
                    tooltipAlignment="center"
                    tooltipPosition="bottom"
                    iconDescription="Eliminar funci??n"
                    kind="ghost"
                    onClick={() => deleteRow(index)}
                    disabled
                  />
                ) : (
                  <Button
                    hasIconOnly
                    renderIcon={TrashCan32}
                    tooltipAlignment="center"
                    tooltipPosition="bottom"
                    iconDescription="Eliminar funci??n"
                    kind="ghost"
                    onClick={() => deleteRow(index)}
                  />
                )}
              </div>
            )}
            {/* {type === "3" &&
                    <div className="bx--col-lg-3">
                        {(dataContent.length === 1) ? (
                            <Button
                                hasIconOnly
                                renderIcon={TrashCan32}
                                tooltipAlignment="center"
                                tooltipPosition="bottom"
                                iconDescription="Eliminar funci??n"
                                kind='ghost'
                                onClick={() => deleteRowUnique(index)}
                                disabled/>
                         ) : (
                            <Button
                                hasIconOnly
                                renderIcon={TrashCan32}
                                tooltipAlignment="center"
                                tooltipPosition="bottom"
                                iconDescription="Eliminar funci??n"
                                kind='ghost'
                                onClick={() => deleteRowUnique(index)} />
                         )
                         }
                    </div>} */}
          </div>
        );
      });
  };
  const renderButton = () => {
    var buttonNuevoType2;
    if (type === "3") {
      // buttonNuevoType2 = (
      //     ((!checkUniqueValue) ?
      //         ((dataContent.length < 3) ? (
      //             <Button className="custom-class" kind='ghost' renderIcon={AddFilled32} size='small' onClick={addRowUnique}>Nuevo</Button>)
      //         : (<Button className="custom-class" kind='ghost' renderIcon={AddFilled32} size='small' onClick={addRowUnique} disabled >Nuevo</Button>
      //             )
      //     ) : (
      //         <Button className="custom-class" kind='ghost' renderIcon={AddFilled32} size='small' onClick={addRowUnique} disabled >Nuevo</Button>
      //     ))
      // )
    } else if (type === "2") {
      buttonNuevoType2 = (
        <Button
          className="custom-class"
          kind="ghost"
          renderIcon={AddFilled32}
          size="small"
          onClick={addRow}
        >
          Nuevo
        </Button>
      );
    } else {
      buttonNuevoType2 = (
        <Button
          className="custom-class"
          kind="ghost"
          renderIcon={AddFilled32}
          size="small"
          onClick={addRow}
        >
          Nuevo
        </Button>
      );
    }
    return buttonNuevoType2;
  };
  var div1, div2, div3;
  if (type === "3") {
    div1 = (
      <div className="bx--col-lg-4">
        <span>{firstLabel}</span>
      </div>
    );
    div2 = (
      <div className="bx--col-lg-4">
        <span>{secondLabel}</span>
      </div>
    );
    /*div3 = (<div className="bx--col-lg-3">
            <span>{this.props.thirdLabel}</span>
        </div>);*/
  } else if (type === "2") {
    div1 = (
      <div className="bx--col-lg-4">
        <span>{firstLabel}</span>
      </div>
    );
    div2 = (
      <div className="bx--col-lg-4">
        <span>{secondLabel}</span>
      </div>
    );
  } else {
    div1 = (
      <div className="bx--col-lg-8">
        <span>{firstLabel}</span>
      </div>
    );
  }
  return (
    <div className="bx--row">
      <div className="bx--col">
        <label className="label-group">{name}</label>
        {renderButton()}
        <div
          className="bx--row row-header"
          style={{ height: "2rem", fontWeight: "bold" }}
        >
          <div className="bx--col-lg-1">
            <span>#</span>
          </div>

          {div1}
          {div2}
          {div3}

          <div className="bx--col-lg-3">
            <span>Acci??n</span>
          </div>
        </div>

        {showContent()}
      </div>
    </div>
  );
}
export default forwardRef(RequirementGroup);
/*
{{ __html: "<!-- section for rows -->" }}
 */
