import React from "react";
import { CardTitle } from "reactstrap";
import { Icon, TooltipComponent } from "../../../Component";
import { BarChart } from "../../charts/default/Charts";
import { useContext } from "react";
import AuthContext from "../../../../contexts/AuthProvider";

const ActiveSubscription = () => {
  const { auth } = useContext(AuthContext);

  return (
    <React.Fragment>
      <div className="card-title-group align-start mb-2">
        <CardTitle>
          <h6 className="title">Active Buses Today</h6>
        </CardTitle>
        <div className="card-tools">
          <TooltipComponent
            icon="help-fill"
            iconClass="card-hint"
            direction="left"
            id="Tooltip-2"
            text="Buses available for booking"
          />
        </div>
      </div>
      <div className="align-end flex-sm-wrap g-4 flex-md-nowrap">
        <div className="nk-sale-data">
          <span className="amount">09</span>
          <span className="sub-title">
            <span className="change down text-danger">
              <Icon name="arrow-long-down" />
              1.93%
            </span>
            since last month
          </span>
        </div>
        <div className="nk-sales-ck">
          {/* show the number of active buses for the past 6 months */}
          <BarChart />
        </div>
      </div>
    </React.Fragment>
  );
};
export default ActiveSubscription;
