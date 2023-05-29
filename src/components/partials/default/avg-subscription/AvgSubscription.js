import React from "react";
import { CardTitle } from "reactstrap";
import { Icon, TooltipComponent } from "../../../Component";
import { BarChart } from "../../charts/default/Charts";
import { useContext } from "react";
import AuthContext from "../../../../contexts/AuthProvider";

const AvgSubscription = () => {
  const { auth } = useContext(AuthContext);
  return (
    <React.Fragment>
      {" "}
      <div className="card-title-group align-start mb-2">
        <CardTitle>
          <h6 className="title">Total Buses</h6>
        </CardTitle>
        <div className="card-tools">
          <TooltipComponent
            icon="help-fill"
            iconClass="card-hint"
            direction="left"
            id="Tooltip-3"
            text={`All buses owned by ${auth?.name?.split(" ")[0]}`}
          />
        </div>
      </div>
      <div className="align-end flex-sm-wrap g-4 flex-md-nowrap">
        <div className="nk-sale-data">
          <span className="amount">346</span>
          <span className="sub-title">
            <span className="change up text-success">
              <Icon name="arrow-long-up" />
              2.45%
            </span>
            since last week
          </span>
        </div>
        <div className="nk-sales-ck">
          {/* bar chart showing the number of buses owned by company at each month for past 6 months */}
          <BarChart />
        </div>
      </div>
    </React.Fragment>
  );
};
export default AvgSubscription;
