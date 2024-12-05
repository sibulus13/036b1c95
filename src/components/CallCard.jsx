import * as React from "react";
import { useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArchiveIcon from "@mui/icons-material/Archive";
import Button from "@mui/material/Button";

import CallIcon from "./CallIcon";
import "../css/callCard.css";
import { toggleCallArchive } from "../redux/store";
import { patchToggleCallArchive } from "../lib/call";
import { formatDuration, getDateTime } from "../lib/date";

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
      ? `from ${formatMobileNumber(call.from)}`
      : `to ${formatMobileNumber(call.to)} via ${formatMobileNumber(
          call.via
        )}, ${formatDuration(call.duration)}`
  }
  `;
};

// Assuming the number is a 10, 11, or 12 digit number with country code
const formatMobileNumber = (number) => {
  number = String(number);
  if (number.length === 10) {
    return number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }
  if (number.length === 11) {
    return number.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "+$1 ($2) $3-$4");
  }
  if (number.length === 12) {
    return number.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "+$1 ($2) $3-$4");
  }

  return number;
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
    <Accordion>
      <AccordionSummary aria-controls="panel1-content" id="panel1-header">
        <div className="card-container">
          <CallIcon call_type={call.call_type} direction={call.direction} />
          <p>
            {call.direction === "inbound"
              ? formatMobileNumber(call.to)
              : formatMobileNumber(call.from)}
          </p>
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
  );
}
