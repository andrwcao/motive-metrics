import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import RadarChart from "../shared/RadarChart";
import "./Motivation.css";

/**
 * Motivation page in manager dashboard.
 * @returns {*} Component with two radar charts of motivators and de-motivators
 */
function Motivation() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("Motivation.js useEffect is being called");
    invoke("getMotivation").then(setData);
    console.log("Motivation.js useEffect is being called after invoke");
    console.log("Motivation.js useEffect data: ", data);
  }, []);

  /**
   * Title of motivators, to show in the radar chart.
   * @enum {string}
   */
  const motivatorsLabelEnum = {
    m1: "Rewards and incentives",
    m2: "Development needs addressed",
    m3: "Variety of work",
    m4: "Career path",
    m5: "Empowerment",
    m6: "Good management",
    m7: "Sense of belonging",
    m8: "Work/life balance",
    m9: "Working in successful company",
    m10: "Employee involvement",
    m11: "Feedback",
    m12: "Recognition",
    m13: "Equity",
    m14: "Trust",
    m15: "Technically challenging work",
    m16: "Job security",
    m17: "Identify with the task",
    m18: "Autonomy",
    m19: "Appropriate working conditions",
    m20: "Task significance",
    m21: "Sufficient resources",
  };

  /**
   * Title of de-motivators, to show in the radar chart.
   * @enum {string}
   */
  const deMotivatorsLabelEnum = {
    d1: "Risk",
    d2: "Stress",
    d3: "Inequity",
    d4: "Interesting work going to other parties",
    d5: "Unfair reward system",
    d6: "Lack of promotion opportunities",
    d7: "Poor communication",
    d8: "Uncompetitive pay",
    d9: "Unrealistic goals",
    d10: "Bad relationship with users and colleagues",
    d11: "Poor working environment",
    d12: "Poor management",
    d13: "Producing poor quality software",
    d14: "Poor cultural fit",
    d15: "Lack of influence",
  };

  const motivatorLabels = [];
  const motivatorDataPoints = [];
  const deMotivatorLabels = [];
  const deMotivatorDataPoints = [];

  if (data != null) {
    for (const property in data.motivators) {
      //console.log(property, data.motivators[property]);
      motivatorLabels.push(motivatorsLabelEnum[`${property}`]); // push the label of motivators from enum
      motivatorDataPoints.push(data.motivators[`${property}`]); // push the count of motivators from data
    }

    for (const property in data.deMotivators) {
      deMotivatorLabels.push(deMotivatorsLabelEnum[`${property}`]); // push the label of de-motivators from enum
      deMotivatorDataPoints.push(data.deMotivators[`${property}`]); // push the count of de-motivators from data
    }
  }
  // radar chart colours
  const borderColour = "rgba(0, 82, 204)";
  const backgroundColour = "rgba(179, 212, 255, 0.5)";

  return (
    <div className="page">
      <RadarChart
        name="Motivation"
        labels={motivatorLabels}
        dataPoints={motivatorDataPoints}
        borderColour={borderColour}
        backgroundColour={backgroundColour}
      />
      <RadarChart
        name="De-motivation"
        labels={deMotivatorLabels}
        dataPoints={deMotivatorDataPoints}
        borderColour={borderColour}
        backgroundColour={backgroundColour}
      />
    </div>
  );
}

export default Motivation;
