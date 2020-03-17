import React from 'react';
import EventEditContainer from '../containers/EventEditContainer';
import { RouteComponentProps } from 'react-router-dom';

// interface EventEditProps {
//   eventId: string;
// }

// function EventEdit({ eventId }: EventEditProps) {
//   return (
//     <div>
//       <EventEditContainer></EventEditContainer>
//     </div>
//   );
// }

function EventEdit({ history }: RouteComponentProps) {
  return (
    <div>
      <EventEditContainer history={history}></EventEditContainer>
    </div>
  );
}

export default EventEdit;
