export default function fetcher(promise) {
    let status: string = "pending";
    let response: object;

    const requester = promise.then((res) => {
        status = "success";
        response = res.data;
    }, (error) => {
        status = "error";
        response = error;
    });

    return () => {
        switch (status) {
            case "error":
                throw response;
            case "success":
                return response;
            case "pending":
                throw requester;
    }}
}