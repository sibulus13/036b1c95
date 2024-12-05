export const sortCallsByDate = (calls) => {
    // group all calls by date
    const groupedCalls = calls.reduce((acc, call) => {
        const date = new Date(call.created_at).toDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(call);
        return acc;
    }, {});

    return groupedCalls;
};

// Formats the duration of the call
export const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours > 0 ? `${hours} hr${hours > 1 ? "s" : ""} ` : ""}${
      minutes > 0 ? `${minutes} min${minutes > 1 ? "s" : ""} ` : ""
    }${secs} sec${secs > 1 ? "s" : ""}`;
  };  

// Function to get the time in 12-hour format
export const getDateTime = (date) => {
    const dateTime = new Date(date);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };