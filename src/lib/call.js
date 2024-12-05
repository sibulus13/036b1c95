// Updates the is_archived property of a call to the opposite of its current value.
export async function patchToggleCallArchive(call) {
    const url = `https://aircall-api.onrender.com/activities/${call.id}`;
    const res = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_archived: !call.is_archived }),
    });

    return res;
}