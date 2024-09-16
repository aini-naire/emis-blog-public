export default function fetcher(promise) {
    let status: string = "pending";
    let response: object;
    console.log("fetcher")

    const requester = promise.then((res) => {
        status = "success";
        response = res.data;
        console.log("promise success")
    }, (error) => {
        status = "error";
        response = error;
    });

    return () => {
        switch (status) {
            case "error":
                throw response;
            case "success":
                console.log("success")
                return response;
            case "pending":
                console.log("pending")
                throw requester;
    }}
}