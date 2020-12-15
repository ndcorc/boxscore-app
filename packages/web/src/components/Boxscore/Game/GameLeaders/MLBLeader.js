import React from "react";
import { Card, Segment, Icon } from "semantic-ui-react";

const MLBLeader = ({ teams }) => {
  var [away, home] = teams;
  var pitchers = [];
  var allPitchers = away.pitchers.concat(home.pitchers);
  var keyInfo = {
    WIN: allPitchers.reduce((a, b) => (b.win ? b : a), null),
    LOSS: allPitchers.reduce((a, b) => (b.loss ? b : a), null),
    SAVE: allPitchers.reduce((a, b) => (b.save ? b : a), null)
  };
  if (!keyInfo.SAVE) delete keyInfo.SAVE;
  Object.keys(keyInfo).forEach((info, i) => {
    pitchers.push(
      <Segment.Group horizontal basic className="leader-segments">
        <Segment basic className="pitcher-icon-segment">
          <Icon name="user" size="big" />
        </Segment>
        <Segment.Group basic className="pitcher-segment">
          <Segment basic className="pitcher-segment">
            <Card.Header textAlign="left">{info}</Card.Header>
            <Card.Header textAlign="left">
              {keyInfo[info].first_name}. {keyInfo[info].last_name}{" "}
              <span className="pitcher-span">
                - {keyInfo[info].team_abbreviation}
              </span>
            </Card.Header>
            <Card.Meta>
              {keyInfo[info].innings_pitched +
                " IP, " +
                keyInfo[info].earned_runs +
                " ER, " +
                keyInfo[info].strike_outs +
                " K, " +
                keyInfo[info].walks +
                " BB"}
            </Card.Meta>
          </Segment>
        </Segment.Group>
      </Segment.Group>
    );
  });
  return (
    <Card.Content className="leader-card">
      <Segment.Group horizontal basic className="leader-segments">
        {pitchers}
      </Segment.Group>
    </Card.Content>
  );
};

export default MLBLeader;
