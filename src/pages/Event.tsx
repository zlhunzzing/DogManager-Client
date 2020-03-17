import React from 'react';
import EventContainer from '../containers/EventContainer';
import { withRouter, RouteComponentProps } from 'react-router';

interface MatchParams {
  eventurl: string;
}
const Event: React.SFC<RouteComponentProps<MatchParams>> = ({ match }) => {
  return (
    <div>
      <EventContainer url={match.params.eventurl} />
    </div>
  );
};

export default Event;
