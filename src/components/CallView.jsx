import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import CallCard from "./CallCard";
import "../css/view.css";
import { sortCallsByDate } from "../lib/date";

const CallView = () => {
  const calls = useSelector((state) => state.calls);
  const activeCalls = calls.filter((call) => !call.is_archived);

  return (
    <div className="view">
      <button>
        <div>Archive all calls</div>
      </button>
      {activeCalls &&
        Object.entries(sortCallsByDate(activeCalls))
          .reverse()
          .map(([date, calls]) => (
            <div>
              <h2>{date}</h2>
              {calls.map((call) => (
                <AnimatePresence>
                  <CallCard key={call.id} call={call} />
                </AnimatePresence>
              ))}
            </div>
          ))}
    </div>
  );
};

export default CallView;
