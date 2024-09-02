import "../AdminDashboard.css";
import Dropdown from "react-bootstrap/Dropdown";
import CampaignRequestsCard from "./CampaignRequestsCard.jsx";

import React from "react";

const CampaignRequests = () => {
  return (
    <div className="w-100">
      <div className="dashboard-body w-100 h-100 d-flex row m-0 align-items-center justify-content-center">
        <div className="body-header w-100 d-flex align-items-center  justify-content-between column p-3 m-0 sticky-top">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Filter By
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Animal</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Medical</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Education</Dropdown.Item>
              <Dropdown.Item href="#/action-4">View All</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="admin-search-div">
            <input type="text" className="admin-search px-3" placeholder="Search" />
          </div>
        </div>
        <div className="body-content w-100 p-0 d-flex flex-wrap row justify-content-around align-items-center">
            <CampaignRequestsCard/>
            <CampaignRequestsCard/>
            <CampaignRequestsCard/>
            <CampaignRequestsCard/>
            <CampaignRequestsCard/>


            
        </div>
      </div>
    </div>
  );
};

export default CampaignRequests;
