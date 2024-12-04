import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArchiveIcon from "@mui/icons-material/Archive";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

import CallIcon from "./CallIcon";
import "../css/callCard.css";
import { toggleCallArchive } from "../redux/store";
import { patch } from "@mui/material";

// Function to format the duration of the call
const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours > 0 ? `${hours} hr${hours > 1 ? "s" : ""} ` : ""}${
    minutes > 0 ? `${minutes} min${minutes > 1 ? "s" : ""} ` : ""
  }${secs} sec${secs > 1 ? "s" : ""}`;
};

// Function to get the time in 12-hour format
const getDateTime = (date) => {
  const dateTime = new Date(date);
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

// Detail information about the call based on the call type and direction
const detailInfo = (call) => {
  return `${
    call.call_type === "missed"
      ? "Missed call"
      : call.direction === "inbound"
      ? "Incoming call"
      : "Outgoing call"
  } 
  ${
    call.direction === "inbound"
      ? `from ${call.from}`
      : `to ${call.to} via ${call.via}, ${formatDuration(call.duration)}`
  }
  `;
};

export default function CallCard({ call }) {
  const dispatch = useDispatch();

  const toggleArchive = async (id) => {
    const url = `https://aircall-api.onrender.com/activities/${id}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_archived: true }),
    });
    if (res.ok) {
      dispatch(toggleCallArchive(id));
    }
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary aria-controls="panel1-content" id="panel1-header">
          <div className="card-container">
            <CallIcon call_type={call.call_type} direction={call.direction} />
            <p>{call.direction === "inbound" ? call.to : call.from}</p>
            <p className="date">{getDateTime(call.created_at)}</p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div>{detailInfo(call)}</div>
          </div>
        </AccordionDetails>
        <AccordionActions>
          <Button size="small" onClick={() => toggleArchive(call.id)}>
            <ArchiveIcon />
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
