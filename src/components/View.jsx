import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import CallCard from "./CallCard";
import "../css/view.css";
import { sortCallsByDate } from "../lib/date";
import { patchToggleCallArchive } from "../lib/call";
import { toggleAllArchiveByType } from "../redux/store";

const archiveButtonText = (type) => {
  if (type === "calls") {
    return "Archive all calls";
  }
  return "Unarchive all calls";
};

const emptyText = (type) => {
  if (type === "calls") {
    return "No calls to display";
  }
  return "No archived calls to display";
};

// Generic view component to display calls or archived calls
const View = ({ type = "calls" }) => {
  const calls = useSelector((state) => state.calls);
  let filteredCalls = calls;
  if (type === "calls") {
    filteredCalls = calls.filter((call) => !call.is_archived);
  } else if (type === "archive") {
    filteredCalls = calls.filter((call) => call.is_archived);
  }
  const dispatch = useDispatch();
  const toggleAllArchive = async () => {
    try {
      await Promise.all(
        filteredCalls.map((call) => {
          patchToggleCallArchive(call);
          return dispatch(toggleAllArchiveByType(type));
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="view">
      <button onClick={() => toggleAllArchive()}>
        <div>{archiveButtonText(type)}</div>
      </button>
      {filteredCalls.length > 0 ? (
        Object.entries(sortCallsByDate(filteredCalls))
          .reverse()
          .map(([date, calls]) => (
            <div className="date-column" key={date}>
              <h2>{date}</h2>
              <AnimatePresence>
                {calls.map((call) => (
                  <CallCard call={call} key={call.id} />
                ))}
              </AnimatePresence>
            </div>
          ))
      ) : (
        <div>{emptyText(type)}</div>
      )}
    </div>
  );
};

export default View;
