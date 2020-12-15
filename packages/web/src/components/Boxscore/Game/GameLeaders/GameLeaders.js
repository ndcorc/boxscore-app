import React from "react";
import { Card } from "semantic-ui-react";
import StatOptions from "./StatOptions";
import NBALeader from "./NBALeader";
import MLBLeader from "./MLBLeader";

const GameLeaders = ({ home, away, active, updateStat, nba }) => {
  if (!home.team_info) return <div />;
  return (
    <Card style={{ width: "auto" }} centered>
      {nba ? (
        <Card.Content className="leader-header">
          <Card.Header>Game Leaders</Card.Header>
        </Card.Content>
      ) : null}

      {nba ? <StatOptions active={active} updateStat={updateStat} /> : null}
      {nba ? (
        <NBALeader stat={active} team={away} />
      ) : (
        <MLBLeader teams={[away, home]} />
      )}
      {nba ? <NBALeader stat={active} team={home} /> : null}
    </Card>
  );
};

export default GameLeaders;
