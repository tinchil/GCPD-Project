import React, { useState } from "react";
import PropTypes from "prop-types";
import { post } from "../api";
import FormattedDate from "./FormattedDate";

function InvestigationNotesEditor({ close, onSave }) {
  const [noteContent, setNoteContent] = useState();

  const handleChange = (event) => {
    setNoteContent(event.target.value);
  };

  return (
    <div>
      <textarea value={noteContent} onChange={handleChange} />
      <button onClick={() => onSave(noteContent)}>Save</button>
      <button onClick={close}>Cancel</button>
    </div>
  );
}

InvestigationNotesEditor.propTypes = {
  close: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

function InvestigationNotes({ notes, investigationId }) {
  const [editorOpen, setEditorOpen] = useState(false);
  const [currentNotes, setCurrentNotes] = useState(notes);

  const onSave = (text) => {
    post(`/v1/investigations/${investigationId}/notes`, {
      investigation_note: {
        content: text,
      },
    }).then((result) => {
      setEditorOpen(false);
      setCurrentNotes([...currentNotes, result]);
    });
  };

  const renderNotes = () => {
    if (currentNotes.length === 0) {
      return <p>There are no notes for this investigation.</p>;
    } else {
      return (
        <ul>
          {currentNotes.map((note) => {
            const { content, date, officer } = note.data.attributes;
            const formattedDate = FormattedDate(date);
            const officerName = `${officer.data.attributes.first_name} ${officer.data.attributes.last_name}`;
            return (
              <li key={`note-${note.data.id}`}>
                <p>{formattedDate}: {content}</p>
                <p>- {officerName}</p>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return (
    <div className="card yellow lighten-5">
      <div className="card-content">
        <span className="card-title">Investigation Notes</span>
        {renderNotes()}
        {editorOpen ? (
          <InvestigationNotesEditor close={() => setEditorOpen(false)} onSave={onSave} />
        ) : (
          <button onClick={() => setEditorOpen(true)}>Add</button>
        )}
      </div>
    </div>
  );
}

InvestigationNotes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  investigationId: PropTypes.number.isRequired,
};

export default InvestigationNotes;
