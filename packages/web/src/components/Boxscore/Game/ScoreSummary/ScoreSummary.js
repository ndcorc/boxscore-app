import React from "react";
import { Table } from "semantic-ui-react";

const getHeaderRow = nba => {
  var numPeriods = nba ? 4 : 9;
  const cells = [];
  for (var i = 0; i < numPeriods + 1; i++) {
    cells.push(
      <Table.HeaderCell>{i ? (nba ? "Q" + i : i) : ""}</Table.HeaderCell>
    );
  }
  if (!nba) {
    cells.push(<Table.HeaderCell>R</Table.HeaderCell>);
    cells.push(<Table.HeaderCell>H</Table.HeaderCell>);
    cells.push(<Table.HeaderCell>E</Table.HeaderCell>);
  } else {
    cells.push(<Table.HeaderCell>T</Table.HeaderCell>);
  }

  return <Table.Row style={{ backgroundColor: "#EDEEF0" }}>{cells}</Table.Row>;
};

const getRow = (nba, team) => {
  var numPeriods = nba ? 4 : 9;
  var { team_info, period_scores } = team;
  var totals = nba ? team.totals.points : team.batter_totals.runs;
  const cells = [];
  for (var i = 0; i < numPeriods + 1; i++) {
    const cell = i ? (
      <Table.Cell>{period_scores[i - 1]}</Table.Cell>
    ) : (
      <Table.Cell style={{ paddingLeft: "50px" }}>
        {team_info.abbreviation}
      </Table.Cell>
    );
    cells.push(cell);
  }
  cells.push(<Table.Cell>{totals}</Table.Cell>);
  if (!nba) {
    cells.push(<Table.Cell>{team.batter_totals.hits}</Table.Cell>);
    cells.push(<Table.Cell>{team.errors}</Table.Cell>);
  }
  return <Table.Row>{cells}</Table.Row>;
};

const ScoreSummary = ({ home, away, nba }) => {
  if (!home.team_info) return <div />;
  return (
    <Table
      basic
      celled
      verticalAlign="middle"
      style={{ width: "100%" }}
      className="summary-table"
    >
      <Table.Header>{getHeaderRow(nba)}</Table.Header>
      <Table.Body>
        {getRow(nba, away)}
        {getRow(nba, home)}
      </Table.Body>
    </Table>
  );
};

export default ScoreSummary;
