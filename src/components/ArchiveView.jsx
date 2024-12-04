import { useSelector } from "react-redux";

import CallCard from "./CallCard";
import "../css/view.css";
import { sortCallsByDate } from "../lib/date";

const ArchiveView = () => {
  const calls = useSelector((state) => state.calls);
  const archiveCalls = calls.filter((call) => call.is_archived);

  return (
    <div className="view">
      Archive Page
      <div className="">Unarchive all calls</div>
      {archiveCalls &&
        Object.entries(sortCallsByDate(archiveCalls)).map(([date, calls]) => (
          <div key={date} className="date-view">
            <h2>{date}</h2>
            {calls.map((call) => (
              <CallCard key={call.id} call={call} />
            ))}
          </div>
        ))}{" "}
    </div>
  );
};

export default ArchiveView;
