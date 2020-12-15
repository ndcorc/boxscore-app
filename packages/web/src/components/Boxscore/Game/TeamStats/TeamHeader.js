import React from "react";
import { Table } from "semantic-ui-react";

const TeamHeader = ({ player, statLine, totals }) => {
  var cells = [];
  if (player === "TEAM") {
    Object.keys(statLine).forEach((stat, i) => {
      switch (stat) {
        case "STARTERS":
          cells.push(
            <Table.HeaderCell className="name-stat">TEAM</Table.HeaderCell>
          );
          break;
        case "HITTERS":
          cells.push(
            <Table.HeaderCell className="name-stat">TEAM</Table.HeaderCell>
          );
          break;
        case "PITCHERS":
          cells.push(
            <Table.HeaderCell className="name-stat">TEAM</Table.HeaderCell>
          );
          break;
        case "MIN":
          cells.push(<Table.HeaderCell className="name-stat" />);
          break;
        case "ERA":
          cells.push(<Table.HeaderCell className="name-stat" />);
          break;
        default:
          var pStat = statLine[stat];
          if (!Array.isArray(pStat)) pStat = totals[pStat];
          else if (stat === "REB") pStat = totals[pStat[0]] + totals[pStat[1]];
          else pStat = totals[pStat[0]] + "/" + totals[pStat[1]];
          cells.push(
            <Table.HeaderCell className="name-stat">{pStat}</Table.HeaderCell>
          );
          break;
      }
    });
  } else {
    Object.keys(statLine).forEach(stat =>
      cells.push(
        <Table.HeaderCell className="name-stat">{stat}</Table.HeaderCell>
      )
    );
    cells.splice(0, 1, <Table.HeaderCell>{player}</Table.HeaderCell>);
  }
  return (
    <Table.Header>
      <Table.Row>{cells}</Table.Row>
    </Table.Header>
  );
};

export default TeamHeader;
