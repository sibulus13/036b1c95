import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

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
  const dispatch = useDispatch();
  const calls = useSelector((state) => state.calls);
  const filteredCalls = useMemo(() => {
    if (type === "calls") {
      return calls.filter((call) => !call.is_archived);
    } else if (type === "archive") {
      return calls.filter((call) => call.is_archived);
    }
    return calls;
  }, [calls, type]);
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
          .map(([date, calls], index) => (
            <div className="date-column" key={index}>
              <h2>{date}</h2>
              <AnimatePresence>
                {calls.map((call, index) => (
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
                    <CallCard call={call} />
                  </motion.div>
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
