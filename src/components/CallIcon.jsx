import CallMissedIcon from "@mui/icons-material/CallMissed";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";

import "../css/callIcon.css";
export default function CallIcon({ call_type, direction }) {
  return {
    answered: {
      inbound: <CallReceivedIcon className="success" />,
      outbound: <CallMadeIcon className="success" />,
    },
    missed: {
      inbound: <CallMissedIcon className="failure" />,
      outbound: <CallMissedOutgoingIcon className="failure" />,
    },
  }[call_type][direction];
}

/**
 * Call type: answered, missed
 * Direction: inbound, outbound
 */
