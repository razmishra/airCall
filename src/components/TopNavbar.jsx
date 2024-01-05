// TopNavbar.js

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useEffect, useState } from "react";

const TopNavbar = ({ getTabNumber }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    getTabNumber(activeTab);
  }, [activeTab]);

  return (
    <div className="tNavbar"> 
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Inbox" className="tab" /> 
        <Tab label="All Calls" className="tab" /> 
      </Tabs>
    </div>
  );
};

export default TopNavbar;
