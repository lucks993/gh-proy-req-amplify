import React, { useState, useEffect } from "react";
import "carbon-components/css/carbon-components.min.css";
import { Button, TextArea } from "carbon-components-react";
import "./ConfigRequirement.scss";
import ConfigRequirementSociety from "./ConfigRequirementSociety";
import { fetchSocieties, sendSocieties } from "../../services/api/servicies";

export default function ConfigRequirement() {
  const [listSocieties, setListSocieties] = useState([]);
  const [checkSocieties, setCheckSocieties] = useState(() => {
    const statusCheck = {};
    listSocieties.forEach((society) => {
      statusCheck[society.id] = society.levelAproved;
    });
    return statusCheck;
  });

  //Fetch Societies
  useEffect(() => {
    const getSocieties = async () => {
      const societiesFromServer = await fetchSocieties();
      setListSocieties(societiesFromServer);
      setCheckSocieties(() => {
        const statusCheck = {};
        societiesFromServer.forEach((society) => {
          statusCheck[society.id] = society.levelAproved;
        });
        return statusCheck;
      });
    };
    getSocieties();
  }, []);

  const societyOnChange = (id, newLevel) => {
    setCheckSocieties({ ...checkSocieties, [id]: newLevel });
  };

  const saveStateCheck = async () => {
    const data = {};
    data.society = Object.keys(checkSocieties).map((key) => ({
      id: key,
      levelAproved: checkSocieties[key],
    }));
    // console.log(JSON.stringify(data))
    const societiesSend = await sendSocieties(data);
    // console.log("response: " + JSON.stringify(societiesSend))
  };

  return (
    <div>
      <h2>Configuración</h2>
      <div style={{ marginBottom: "2rem" }}>
        <TextArea
          cols={20}
          id="instuctionConfig"
          labelText="Indicaciones"
          rows={1}
          light
          style={{ resize: "none" }}
          readOnly
          defaultValue="- Seleccionar las Sociedades que tendrán aprobación hasta Presidencia."
        ></TextArea>
      </div>
      <div style={{ marginBottom: "2rem" }}>
        {listSocieties.map((society) => {
          return (
            <ConfigRequirementSociety
              key={society.id.toString()}
              societyId={society.id}
              societyName={society.description}
              societyLevel={checkSocieties[society.id]}
              societyOnChange={societyOnChange}
            />
          );
        })}
      </div>
      <div className="row-action">
        <Button
          className="custom-class"
          kind="primary a"
          size="default"
          onClick={saveStateCheck}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}
