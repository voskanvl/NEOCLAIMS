export const request = async (
    method: "login" | "registration",
    props: object,
) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/auth/${method}`,
        {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
    const ok = response.ok;
    const result = await response.json();
    if (!ok) throw Error(JSON.stringify(result));
    return result;
};
