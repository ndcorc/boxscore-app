import React from "react";
import { Table } from "semantic-ui-react";
import { TeamStats, TeamHeader } from "./index";

const compare = (a, b) => {
  return a.last_nom < b.last_nom ? -1 : a.last_nom > b.last_nom ? 1 : 0;
};

const statLine = {
  STARTERS: "display_name",
  MIN: "minutes",
  FG: ["field_goals_made", "field_goals_attempted"],
  "3PT": ["three_point_field_goals_made", "three_point_field_goals_attempted"],
  FT: ["free_throws_made", "free_throws_attempted"],
  OREB: "offensive_rebounds",
  DREB: "defensive_rebounds",
  REB: ["offensive_rebounds", "defensive_rebounds"],
  AST: "assists",
  STL: "steals",
  BLK: "blocks",
  TO: "turnovers",
  PF: "personal_fouls",
  PTS: "points"
};

const NBAStats = ({ team }) => {
  if (!team.team_info) return <div />;
  return (
    <Table compact basic striped className="nba-table">
      <TeamHeader player={"STARTERS"} statLine={statLine} />{" "}
      <TeamStats
        players={team.stats.filter(player => player.is_starter).sort(compare)}
        statLine={statLine}
      />
      <TeamHeader player={"BENCH"} statLine={statLine} />
      <TeamStats
        players={team.stats.filter(player => !player.is_starter).sort(compare)}
        statLine={statLine}
      />
      <TeamHeader player={"TEAM"} statLine={statLine} totals={team.totals} />
    </Table>
  );
};

export default NBAStats;
