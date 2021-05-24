import React, { useState } from "react";
import { Button, TextInput } from "carbon-components-react";
import "carbon-components/css/carbon-components.min.css";
import { AddFilled32, TrashCan32 } from "@carbon/icons-react";
import "./RequirementGroup.scss";
export default function RequirementGroup({
  name,
  firstLabel,
  secondLabel,
  puestoInformation,
  puestoInfCharac,
  type,
}) {
  const [dataContent, setDataContent] = useState([0]);
  const [dataContent2, setDataContent2] = useState(null);

  const addRow = () => {
    setDataContent([...dataContent, dataContent.length]);
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

  const showContent = () => {
    if (puestoInfCharac) {
      console.log("Entre en el if");
      // setDataContent2(puestoInformation)
      // console.log(dataContent2)
      // console.log(puestoInfCharac)
      console.log(puestoInformation.charac);
      // puestoInformation.map((data, index) => {
      //     console.log(data[index].description)
      // })

      // return puestoInformation.map((data, index) => {

      //     return (<div className="bx--row row-data" key={index} id={index} style={{ height: "2rem" }}>
      //         <div className="bx--col-lg-1" >
      //             <span>{index + 1}</span>
      //         </div>
      //         {type === "1" &&
      //             <div className="bx--col-lg-8">
      //                 <TextInput placeholder="Añada información" light />
      //             </div>
      //         }
      //         {type === "2" &&
      //             <div className="bx--col-lg-4">
      //                 <TextInput placeholder={data[index].description.toString()} light />
      //             </div>

      //         }
      //         {type === "2" &&
      //             <div className="bx--col-lg-4">
      //                 <TextInput placeholder={data[index].descriptionAdditional}  light />
      //             </div>
      //         }
      //         {type === "1" &&
      //             <div className="bx--col-lg-3">
      //                 {(dataContent.length === 1) ? (
      //                     <Button
      //                         hasIconOnly
      //                         renderIcon={TrashCan32}
      //                         tooltipAlignment="center"
      //                         tooltipPosition="bottom"
      //                         iconDescription="Eliminar función"
      //                         kind='ghost'
      //                         onClick={() => deleteRow(index)}
      //                         disabled/>
      //                  ) : (
      //                     <Button
      //                     hasIconOnly
      //                     renderIcon={TrashCan32}
      //                     tooltipAlignment="center"
      //                     tooltipPosition="bottom"
      //                     iconDescription="Eliminar función"
      //                     kind='ghost'
      //                     onClick={() => deleteRow(index)}/>
      //                  )
      //                 }
      //             </div>}
      //         {type === "2" &&
      //             <div className="bx--col-lg-3">
      //                 {(dataContent.length === 1) ? (
      //                     <Button
      //                         hasIconOnly
      //                         renderIcon={TrashCan32}
      //                         tooltipAlignment="center"
      //                         tooltipPosition="bottom"
      //                         iconDescription="Eliminar función"
      //                         kind='ghost'
      //                         onClick={() => deleteRow(index)}
      //                         disabled/>
      //                  ) : (
      //                     <Button
      //                     hasIconOnly
      //                     renderIcon={TrashCan32}
      //                     tooltipAlignment="center"
      //                     tooltipPosition="bottom"
      //                     iconDescription="Eliminar función"
      //                     kind='ghost'
      //                     onClick={() => deleteRow(index)}/>
      //                  )
      //                 }
      //             </div>}

      //     </div>);
      // })
    } else {
      console.log("Entre en el else");
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
                <TextInput placeholder="Añada información" light />
              </div>
            )}
            {type === "2" && (
              <div className="bx--col-lg-4">
                <TextInput placeholder="Añada información" light />
              </div>
            )}
            {type === "2" && (
              <div className="bx--col-lg-4">
                <TextInput placeholder="Añada información" light />
              </div>
            )}
            {/* {type === "3" &&
                    <div className="bx--col-lg-2">
                        <TextInput placeholder="Añada información" light />
                    </div>
                    
                }
                {type === "3" &&
                    <div className="bx--col-lg-4">
                        <TextInput placeholder="Añada información" light />
                    </div>
                }
                {type === "3" &&
                    <div className="bx--col-lg-4">
                        <TextInput placeholder="Añada información" light />
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
                    iconDescription="Eliminar función"
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
                    iconDescription="Eliminar función"
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
                    iconDescription="Eliminar función"
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
                    iconDescription="Eliminar función"
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
                    </div>} */}
          </div>
        );
      });
    }
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
            <span>Acción</span>
          </div>
        </div>

        {showContent()}
      </div>
    </div>
  );
}
// export default RequirementGroup;
/*
{{ __html: "<!-- section for rows -->" }}
 */
