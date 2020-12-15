import React from "react";
import { Header, Grid } from "semantic-ui-react";
import { NBAStats, MLBStats } from "./TeamStats";

const getPitcherTotals = pitchers => {
  return pitchers.reduce((map, obj) => {
    Object.keys(obj).forEach(k => {
      if (!Number.isInteger(obj[k])) return map;
      else map[k] = k in map ? (map[k] += obj[k]) : (map[k] = obj[k]);
    });
    return map;
  }, {});
};

const Stats = ({ home, away, nba }) => {
  if (!home.team_info) return <div />;
  return (
    <div className="boxscore-section">
      <div className="nba-team">
        <Grid className="nba-summary">
          <Grid.Row>
            <Grid.Column className="stats-column">
              <div className="stats-section">
                <div className="inner-section1">
                  <Header size="large">{away.team_info.full_name}</Header>
                </div>
                {nba ? (
                  <div className="inner-section1">
                    <NBAStats team={away} />
                  </div>
                ) : (
                  <div className="inner-section1">
                    <MLBStats
                      team={away}
                      stat={"HITTERS"}
                      players={away.batters}
                      totals={away.batter_totals}
                    />
                    <MLBStats
                      team={away}
                      stat={"PITCHERS"}
                      players={away.pitchers}
                      totals={getPitcherTotals(away.pitchers)}
                    />
                  </div>
                )}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <div className="nba-team">
        <Grid className="nba-summary">
          <Grid.Row>
            <Grid.Column className="stats-column">
              <div className="stats-section">
                <div className="inner-section1">
                  <Header size="large">{home.team_info.full_name}</Header>
                </div>
                {nba ? (
                  <div className="inner-section1">
                    <NBAStats team={home} />
                  </div>
                ) : (
                  <div className="inner-section1">
                    <MLBStats
                      team={home}
                      stat={"HITTERS"}
                      players={home.batters}
                      totals={home.batter_totals}
                    />
                    <MLBStats
                      team={home}
                      stat={"PITCHERS"}
                      players={home.pitchers}
                      totals={getPitcherTotals(home.pitchers)}
                    />
                  </div>
                )}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default Stats;
