import React from "react";
import { Table } from "semantic-ui-react";
import { TeamStats, TeamHeader } from "./index";

const compareBatters = (a, b) => {
  return a.bat_order < b.bat_order ? -1 : a.bat_order > b.bat_order ? 1 : 0;
};
const comparePitchers = (a, b) => {
  return a.pitch_order < b.pitch_order
    ? -1
    : a.pitch_order > b.pitch_order
    ? 1
    : 0;
};

const statLine = {
  HITTERS: {
    HITTERS: "display_name",
    AB: "at_bats",
    R: "runs",
    RBI: "rbi",
    BB: "walks",
    K: "strike_outs",
    AVG: "avg_string",
    OBP: "obp_string",
    SLG: "slg_string"
  },
  PITCHERS: {
    PITCHERS: "display_name",
    IP: "innings_pitched",
    H: "hits_allowed",
    R: "runs_allowed",
    ER: "earned_runs",
    BB: "walks",
    K: "strike_outs",
    HR: "home_runs_allowed",
    "PC-ST": ["pitch_count", "pitches_strikes"],
    ERA: "era"
  }
};

const MLBStats = ({ team, stat, players, totals }) => {
  if (!team.team_info) return <div />;
  const compare = stat === "HITTERS" ? compareBatters : comparePitchers;
  return (
    <Table compact basic striped className="nba-table">
      <TeamHeader player={stat} statLine={statLine[stat]} />
      <TeamStats players={players.sort(compare)} statLine={statLine[stat]} />
      <TeamHeader player={"TEAM"} statLine={statLine[stat]} totals={totals} />
    </Table>
  );
};

export default MLBStats;
