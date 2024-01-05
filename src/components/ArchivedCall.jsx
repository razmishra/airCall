import React, { useEffect, useState } from "react";
import { archiveCall, getCallDetailsById } from "../services/call";
import moment from "moment";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LeftArrow from "../assets/icons8-left-50.png";
import { MdCallMissed, MdCallReceived } from "react-icons/md";
import {
  calculatePeriod,
  calculateDaysFromToday,
} from "../utils/helperFunctions";

const ArchivedCall = ({ list, checkArchived, setCheckArchived }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [toggleArchiveButton, setToggleArchiveButton] = useState([]);
  const id = open ? "simple-popover" : undefined;
  const [newList, setNewList] = useState([]);

  useEffect(() => {
    if (list?.length > 0) {
      const updatedList = updateCallArray(list);
      updatedList?.length > 0 ? setNewList(updatedList) : setNewList([]);
    }
  }, [list]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleArchiveAndClose = (data) => {
    handleArchived(data);
    handleClose(); // Close the Popover after handling the archived action
  };

  const updateCallArray = (list) => {
    const updatedArray = list.map((call) => {
      const daysDifference = calculateDaysFromToday(call.created_at);
      const callDay = daysDifference;

      return { ...call, call_day: callDay };
    });

    return updatedArray;
  };

  const toggleArchive = (i) => {
    let archiveButtonList = [];
    archiveButtonList[i] = true;
    setToggleArchiveButton(archiveButtonList);
  };

  const handleArchived = async (data, i) => {
    try {
      toggleArchive(i);
      let params = { is_archived: !data?.is_archived };
      let id = data?.id;
      const response = await archiveCall(id, params);
      setToggleArchiveButton([]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
   
    const temp = phoneNumber.toString();
    if (temp && temp?.length >= 2) {
      // Insert a dash after the first two digits
      return `${temp.substring(0, 2)}-${temp.substring(2)}`;
    }
    return phoneNumber;
  };

  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "-30px" }}
      >
        <img
          src={LeftArrow}
          onClick={() => setCheckArchived(!checkArchived)}
          alt="Left Arrow"
          style={{ width: "30px", height: "30px", cursor: "pointer" }}
        />
        <h2 style={{ marginLeft: "10px" }}>Archived Call</h2>
      </div>
      <ul className="chat-list">
        {newList &&
          newList?.length > 0 &&
          newList.map(
            (contact, i) =>
              contact?.to &&
              contact.from && (
                <li
                  key={contact?.id}
                  className="chat-item ccc"
                  onClick={() => toggleArchive(i)}
                  style={{
                    paddingBottom: "8px",
                    border: "1px solid #dfdfdf",
                    borderRadius: "10px",
                    margin: "20px 20px 10px 5px",
                    padding: "15px 15px 15px 15px",
                  }}
                >
                  <div className="call">
                    {contact.call_type === "missed" ? (
                      <MdCallMissed size={25} style={{ color: "red" }} />
                    ) : (
                      <MdCallReceived size={25} style={{ color: "green" }} />
                    )}
                  </div>
                  <div className="contact-details">
                    <span
                      style={{
                        color: "black",
                        fontSize: "20px",
                        fontWeight: "bold",
                        fontFamily: "",
                      }}
                      className="direction"
                    >
                      {contact.from && formatPhoneNumber(contact.from)}
                    </span>
                    <span className="call-type">
                      tried to call {contact.to ?? "NA"}
                    </span>
                  </div>

                  {!toggleArchiveButton?.[i] ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span className="timestamp">
                        {moment(contact?.created_at).format("hh:mm A")}
                      </span>
                      <span className="timestamp">
                        {calculatePeriod(contact.call_day)}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <Button
                        style={{
                          border: "1px solid gray",
                          color: "gray",
                          height: "30px",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArchived(contact, i);
                        }}
                      >
                        Unarchive
                      </Button>
                    </div>
                  )}
                </li>
              )
          )}
      </ul>
    </div>
  );
};

export default ArchivedCall;