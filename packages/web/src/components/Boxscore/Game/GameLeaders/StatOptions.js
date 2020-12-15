import React from "react";
import { Card, Button } from "semantic-ui-react";

const StatOptions = ({ active, updateStat }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Card.Content className="stat-buttons">
        <Button as="div" labelPosition="right" className="button-left">
          <Button
            circular
            toggle
            name="points"
            className={active === "points" ? "left-active" : "left-stat"}
            onClick={updateStat}
          >
            Points
          </Button>
        </Button>
        <Button
          toggle
          name="steals"
          className={active === "steals" ? "middle-active" : "middle-stat"}
          onClick={updateStat}
        >
          Steals
        </Button>
        <Button as="div" labelPosition="left" className="button-right">
          <Button
            circular
            toggle
            name="assists"
            className={active === "assists" ? "right-active" : "right-stat"}
            onClick={updateStat}
          >
            Assists
          </Button>
        </Button>
      </Card.Content>
    </div>
  );
};

export default StatOptions;
