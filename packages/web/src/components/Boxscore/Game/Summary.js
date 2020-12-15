import React from "react";
import { Grid, Header } from "semantic-ui-react";
import { GameLeaders } from "./GameLeaders";
import { ScoreSummary } from "./ScoreSummary";

const Summary = props => {
  return (
    <div className="boxscore-section">
      <Grid className="nba-summary">
        <Header style={{ fontSize: "20px" }}>Game Summary</Header>
        <Grid.Column style={{ width: "100%", padding: "0px", margin: "auto" }}>
          <ScoreSummary {...props} />
        </Grid.Column>
        <Grid.Row centered className="leaders-row">
          <Grid.Column style={{ padding: "0px" }} className="game-leaders">
            <GameLeaders {...props} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Summary;
