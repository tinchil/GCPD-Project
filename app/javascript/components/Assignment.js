import React from "react";
import FormattedDate from "./FormattedDate";

function Assignment ({investigation}) {
    const { current_assignments } = investigation.data.attributes;
    
    const renderAssignments = () => {
        if (current_assignments.length === 0) {
            return <p>There are no officers assigned to this investigation at this moment.</p>;
        } else {
          return (
            <ul>
                {current_assignments.map(assignment => {
                    const { first_name, last_name, rank } = assignment.data.attributes.officer.data.attributes;
                    const startDate = assignment.data.attributes.start_date;
                    
                    return (
                        <li key={`assignment-${assignment.data.id}`}>
                            <p>&bull; {rank} {first_name} {last_name} (as of: {FormattedDate(startDate)})</p>
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
                <span className="card-title">Current Assignments</span>
                {renderAssignments()}
            </div>
        </div>
    );
}

export default Assignment;
