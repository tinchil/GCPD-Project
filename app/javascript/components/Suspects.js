import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { find } from "lodash";
import { get, post, put } from "../api";
import FormattedDate from "./FormattedDate";

function SuspectEditor({ close, onSave, currentSuspects }) {
  const [options, setOptions] = React.useState([]);
  const [criminalId, setCriminalId] = React.useState();

  React.useEffect(() => {get('/v1/criminals').then(response => {
        const new_option = response.criminals.map(criminal => {
          const criminalAlreadyExists = !!find(currentCriminal, {
            data: { id: criminal.data.id },
          });
          const { first_name, last_name } = criminal.data.attributes;

          return {
            value: criminal.data.id,
            label: `${first_name} ${last_name}`,
            disabled: criminalAlreadyExists,
          };
        });
        setOptions(new_option);
      });
    },[]);
  return (
    <>
      <Select
        options={options}
        onChange={({ value }) => setCriminalId(value)}
        isOptionDisabled={option => option.disabled}
      />
      <button onClick={() => onSave(criminalId)} disabled={!criminalId}>
        Save
      </button>{" "}
      <button onClick={close}>Cancel</button>
    </>
  );
}

SuspectEditor.propTypes = {
  close: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  currentSuspects: PropTypes.arrayOf(PropTypes.object).isRequired,
};



function Suspects({ suspects, investigationId }) {
  const [editorOpen, setEditorOpen] = React.useState(false);
  const [currentSuspects, setCurrentSuspects] = React.useState(suspects);

  function onSave(criminalId) {
      post(`/v1/investigations/${investigationId}/suspects`, {
          suspect: {
              criminal_id: criminalId,
          },
      }).then((result) => {
          setEditorOpen(false);
          setCurrentSuspects([...currentSuspects, result]);
      });
  }

  function onDrop(criminalId) {
    const droppedDate = new Date().toISOString();
    
    put(`/v1/drop_suspect/${criminalId}`, {
      suspect: {
        dropped_on: droppedDate,
      },
    }).then((result) => {
      setCurrentSuspects(
        currentSuspects.map((suspect) => {
          return suspect.data.id === criminalId ? result : suspect;
        })
      );
    });
  }

  const renderSuspects = () => {
    if(currentSuspects.length === 0){
      return <p>There are no suspects for this investigation.</p>;
    } else {
      return (
        <>
          <ul>
            {currentSuspects.map((suspect, index) => {
              const first_name = suspect.data.attributes.criminal.data.attributes.first_name;
              const last_name = suspect.data.attributes.criminal.data.attributes.last_name;
              const { added_on, dropped_on } = suspect.data.attributes;
              const criminalName = `${first_name} ${last_name}`;
              const formattedAddedOn = FormattedDate(added_on);
              const formattedDroppedOn = dropped_on === null ? <span>N/A</span> : FormattedDate(dropped_on);
              return (
                <li key={index}>
                  <span>{criminalName}</span>
                  <br />
                  <ul>
                    <li key={index}> &bull; Added: {formattedAddedOn}</li>
                    <li key={index}> &bull; Dropped: {formattedDroppedOn}&nbsp;&nbsp;
                      {dropped_on === null && <button onClick={() => onDrop(suspect.data.id)}>Drop</button>}
                    </li>
                  </ul>
                </li>
              )
            })}
          </ul>
        </>
      );
    }
  }
        
  return (
    <>
      <div className="card yellow lighten-5">
        <div className="card-content">
          <span className="card-title">Suspects</span>
          {renderSuspects()}
          {editorOpen ? (
          <SuspectEditor close={() => setEditorOpen(false)} onSave={onSave} currentSuspects={currentSuspects} />
        ) : (
          <button onClick={() => setEditorOpen(true)}>Add</button>
        )}
        </div>
      </div>
    </>
  );
}

Suspects.propTypes = {
  suspects: PropTypes.arrayOf(PropTypes.object).isRequired,
  investigationId: PropTypes.string.isRequired
};

export default Suspects;