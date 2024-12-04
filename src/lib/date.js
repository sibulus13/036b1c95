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