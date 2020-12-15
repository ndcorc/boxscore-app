import React, { Component } from "react";
import { Grid, Container } from "semantic-ui-react";
import { Status, Summary, Stats } from "./Game";

const getTeam = (team, data) => {
  var {
    [team + "_team"]: team_info,
    [team + "_period_scores"]: period_scores,
    [team + "_stats"]: stats,
    [team + "_totals"]: totals,
    [team + "_batter_totals"]: batter_totals,
    [team + "_fielding"]: fielding,
    [team + "_pitchers"]: pitchers,
    [team + "_batters"]: batters,
    [team + "_errors"]: errors
  } = data;
  var obj = {
    team_info,
    period_scores,
    stats,
    totals,
    batter_totals,
    fielding,
    pitchers,
    batters,
    errors
  };
  return obj;
};

const getOther = data => {
  const other = (({ officials, event_information }) => ({
    officials,
    event_information
  }))(data);
  try {
    var status = other.event_information.status;
    status = status === "completed" ? "Final" : status;
    other.event_information.status = status;
  } catch (e) {
    console.log(e);
  }
  return other;
};

const Game = props => {
  return (
    <>
      <Status {...props} />
      <Container fluid className="main-boxscore">
        <Summary {...props} />
        <Stats {...props} />
      </Container>
    </>
  );
};

class Boxscore extends Component {
  state = {
    active: "points"
  };

  updateStat = (e, { name }) => this.setState({ active: name });

  render() {
    const { active } = this.state;
    const { data, league } = this.props;
    if (!data || !league) return <div />;
    const newData = {
      home: getTeam("home", data),
      away: getTeam("away", data),
      other: getOther(data)
    };
    return (
      <Grid className="App-scores">
        <Game
          {...newData}
          updateStat={this.updateStat}
          active={active}
          nba={league === "NBA"}
        />
      </Grid>
    );
  }
}

export default Boxscore;
