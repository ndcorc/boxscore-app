import React from "react";
import { Table } from "semantic-ui-react";

const TeamStats = ({ players, statLine }) => {
  const rows = [];
  players.forEach(player => {
    const stats = [];
    Object.keys(statLine).forEach((stat, i) => {
      var pStat = statLine[stat];
      if (!Array.isArray(pStat)) pStat = player[pStat];
      else if (stat === "REB") pStat = player[pStat[0]] + player[pStat[1]];
      else pStat = player[pStat[0]] + "/" + player[pStat[1]];
      if (i < 15) stats.push(<Table.Cell>{pStat}</Table.Cell>);
    });
    rows.push(<Table.Row>{stats}</Table.Row>);
  });
  return <Table.Body>{rows}</Table.Body>;
};

export default TeamStats;
