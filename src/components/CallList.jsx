import React, { useEffect, useState } from "react";
import { getCallList } from "../services/call";
import ArchivedCall from "./ArchivedCall";
import UnArchivedCall from "./UnArchivedCall";
import "../App.css";
import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";
import { MdOutlineArchive } from "react-icons/md";
import AllCall from "./AllCall";
import { options } from "../../sampleData";

const CallList = () => {
  const [archivedCallList, setArchivedCallList] = useState([]);
  const [checkArchived, setCheckArchived] = useState(false);
  const [callList, setCallList] = useState([]);
  const [flag, setflag] = useState(false);
  const [currentTab, setCurrentTab] = useState();
  const [allCallsList, setAllCallsList] = useState([]);

  const sortCallList = (list) => {
    const sortedArchivedCalllist = list.sort((a, b) => {
      const dateA = new Date(a?.created_at);
      const dateB = new Date(b?.created_at);
      return dateB - dateA;
    });
    return sortedArchivedCalllist;
  };

  const fetchActivitiesData = async () => {
    try {
      const response = await getCallList();
      const data = response?.data || options;
      const sortedCallList = sortCallList(data);
      setAllCallsList(sortedCallList);

      const unarchivedCalllist = sortedCallList?.filter(
        (item) => item?.is_archived == false
      );
      const archivedCalllist = sortedCallList?.filter(
        (item) => item?.is_archived == true
      );

      setArchivedCallList(archivedCalllist);
      setCallList(unarchivedCalllist);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTabNumber = (tabNum) => {
    setCurrentTab(tabNum);
  };

  useEffect(() => {
    fetchActivitiesData();
  }, []);

  return (
    <div className="aircall-phone-container">
      <TopNavbar getTabNumber={getTabNumber} />
      {currentTab === 0 && !checkArchived && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            padding: "5px",
            borderRadius: "10px",
            cursor: "pointer",
            marginBottom: "-10px",
          }}
          onClick={() => setCheckArchived(!checkArchived)}
        >
          <MdOutlineArchive
            size={25}
            color="rgb(135 119 119)"
            style={{ marginLeft: "10px", marginTop: "5px" }}
          />
          <div
            className="chat-item"
            style={{
              fontSize: "20px",
              color: "gray",
              marginLeft: "1px",
              marginBottom: "5px",
            }}
          >
            Archived ({archivedCallList?.length})
          </div>
        </div>
      )}

      {currentTab === 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #ccc",
          }}
        >
          <div
            className="chat-item"
            style={{
              fontSize: "20px",
              color: "gray",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          >
            Total Number of Calls ({allCallsList?.length})
          </div>
        </div>
      )}

      {currentTab === 0 ? (
        checkArchived ? (
          <ArchivedCall
            list={archivedCallList}
            checkArchived={checkArchived}
            setCheckArchived={setCheckArchived}
          />
        ) : (
          <UnArchivedCall
            list={callList}
            fetchActivitiesData={fetchActivitiesData}
          />
        )
      ) : (
        <AllCall list={allCallsList} />
      )}
      <Navbar />
    </div>
  );
};

export default CallList;
