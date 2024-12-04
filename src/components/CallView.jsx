import { useSelector } from "react-redux";

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
            <div key={date} className="date-view">
              <h2>{date}</h2>
              {calls.map((call) => (
                <CallCard key={call.id} call={call} />
              ))}
            </div>
          ))}
    </div>
  );
};

export default CallView;
