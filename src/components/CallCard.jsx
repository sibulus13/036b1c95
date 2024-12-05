import * as React from "react";
import { useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArchiveIcon from "@mui/icons-material/Archive";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

import CallIcon from "./CallIcon";
import "../css/callCard.css";
import { toggleCallArchive } from "../redux/store";
import { patchToggleCallArchive } from "../lib/call";
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
    try {
      const res = await patchToggleCallArchive(call);
      if (res.ok) {
        dispatch(toggleCallArchive(id));
      } else {
        alert("Error archiving call, please try again later.");
      }
    } catch (error) {
      console.error("Error toggling archive status:", error);
      alert("Error archiving call, please try again later.");
    }
  };

  return (
    <motion.div
      key={call.id}
      exit={{
        opacity: 0,
        x: -20,
        transition: {
          duration: 0.5,
        },
      }}
    >
      {" "}
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
    </motion.div>
  );
}
