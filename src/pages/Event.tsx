import React from 'react';
import { RouteComponentProps } from 'react-router';
import EventContainer from '../containers/EventContainer';

function Event({ match }: RouteComponentProps) {
  return <EventContainer match={match} />;
}

export default Event;

//////////////////////////////////////////////////////////////////////////////////////

// react-router-dom props 적용할 때

// interface MatchParams {
//   eventurl: string;
// }
// const Event: React.SFC<RouteComponentProps<MatchParams>> = ({ match }) => {
//   return (
//     <div>
//       <EventContainer url={match.params.eventurl} />
//     </div>
//   );
// };

// export default Event;
