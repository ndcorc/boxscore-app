import React from "react";
import { Card, Segment, Icon } from "semantic-ui-react";

const getStat = (player, stat) => {
  switch (stat) {
    case "points":
      return {
        PTS: player.points,
        FG: player.field_goals_made + "/" + player.field_goals_attempted,
        FT: player.free_throws_made + "/" + player.free_throws_attempted
      };
    case "assists":
      return {
        AST: player.assists,
        TO: player.turnovers,
        MIN: player.minutes
      };
    case "steals":
      return {
        STL: player.assists,
        BLK: player.blocks,
        MIN: player.minutes
      };
    default:
      console.log("error");
  }
};

const NBALeader = ({ stat, team }) => {
  var player = team.stats.reduce((a, b) => (a[stat] > b[stat] ? a : b));
  var stats = [];
  var statLine = getStat(player, stat);
  Object.keys(statLine).forEach((stat, i) => {
    stats.push(
      <Segment basic className={"stat-" + (i + 1)}>
        <div className="stat-text">
          <Card.Header className="stat-header">{statLine[stat]}</Card.Header>
          <Card.Meta>{stat}</Card.Meta>
        </div>
      </Segment>
    );
  });
  return (
    <Card.Content className="leader-card">
      <Segment.Group horizontal basic className="leader-segments">
        <Segment basic className="icon-segment">
          <Icon name="user" size="big" />
        </Segment>
        <Segment.Group basic className="player-segment">
          <Segment basic className="player-segment">
            <Card.Header textAlign="left">
              {player.first_name[0]}. {player.last_name}{" "}
              <span>
                {player.position} - {player.team_abbreviation}
              </span>
            </Card.Header>
          </Segment>
          <Segment.Group horizontal className="stat-segment" basic>
            {stats}
          </Segment.Group>
        </Segment.Group>
      </Segment.Group>
    </Card.Content>
  );
};

export default NBALeader;
