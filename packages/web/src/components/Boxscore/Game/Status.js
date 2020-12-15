import React from "react";
import { Header, Icon, Table, Menu, Grid } from "semantic-ui-react";

const getRow = (type, team = null) => {
  const cells = [];
  for (var i = 0; i < 5; i++) {
    if (type === "header") {
      cells.push(
        <Table.HeaderCell className="status-summary">
          {i ? i : ""}
        </Table.HeaderCell>
      );
    } else {
      cells.push(
        <Table.Cell className="status-summary">
          {i ? team[1][i - 1] : team[0].abbreviation}
        </Table.Cell>
      );
    }
  }
  type === "header"
    ? cells.push(
        <Table.HeaderCell className="status-summary">T</Table.HeaderCell>
      )
    : cells.push(<Table.Cell className="status-summary">{team[2]}</Table.Cell>);
  return <Table.Row>{cells}</Table.Row>;
};

const Status = ({ home, away, other, nba }) => {
  if (!home.team_info || !away.team_info) return <div />;
  let awayWon = nba
    ? away.totals.points > home.totals.points
    : away.batter_totals.runs > home.batter_totals.runs;
  return (
    <Menu
      borderless
      style={{ justifyContent: "center", width: "100%" }}
      className="nba-status"
    >
      <Menu.Item
        style={{
          padding: "0px",
          width: "40%",
          justifyContent: "flex-end"
        }}
      >
        <Header style={{ margin: "0px" }} disabled={!awayWon}>
          {away.team_info.full_name + " "}
          <Header.Subheader style={{ textAlign: "right" }}>
            Away
          </Header.Subheader>
        </Header>
        <Icon
          name={nba ? "basketball ball" : "baseball ball"}
          size="big"
          className="status-icon"
          style={{ margin: "0px" }}
        />
        <Header style={{ margin: "0px", fontSize: "28px" }} disabled={!awayWon}>
          {nba ? away.totals.points : away.batter_totals.runs}
        </Header>
        {awayWon ? (
          <Icon name={"caret left"} size="big" className="status-icon" />
        ) : null}
      </Menu.Item>
      <Menu.Item style={{ width: "15%", justifyContent: "center" }}>
        <Grid style={{ minWidth: "100%", padding: "0px 20px" }}>
          <Grid.Column style={{ padding: "0px", maxWidth: "100%" }}>
            <Header style={{ marginBottom: "5px", fontSize: "15px" }}>
              {other.event_information.status}
            </Header>
            {nba ? (
              <Table
                basic="very"
                celled
                collapsing
                compact
                style={{ width: "100%", margin: "auto" }}
              >
                <Table.Header>{getRow("header")}</Table.Header>
                <Table.Body>
                  {getRow("body", [
                    away.team_info,
                    away.period_scores,
                    nba ? away.totals.points : away.batter_totals.runs
                  ])}
                  {getRow("body", [
                    home.team_info,
                    home.period_scores,
                    nba ? home.totals.points : home.batter_totals.runs
                  ])}
                </Table.Body>
              </Table>
            ) : null}
          </Grid.Column>
        </Grid>
      </Menu.Item>
      <Menu.Item
        style={{
          width: "40%",
          padding: "0px",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        {!awayWon ? (
          <Icon name={"caret right"} className="winner-icon" />
        ) : null}
        <Header style={{ margin: "0px", fontSize: "28px" }} disabled={awayWon}>
          {nba ? home.totals.points : home.batter_totals.runs}
        </Header>
        <Icon
          name={nba ? "basketball ball" : "baseball ball"}
          size="big"
          className="status-icon"
          style={{ margin: "0px" }}
        />
        <Header style={{ margin: "0px" }} disabled={awayWon}>
          {home.team_info.full_name + " "}
          <Header.Subheader style={{ margin: "0px", textAlign: "left" }}>
            Home
          </Header.Subheader>
        </Header>
      </Menu.Item>
    </Menu>
  );
};

export default Status;
