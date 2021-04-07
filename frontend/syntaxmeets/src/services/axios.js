import axios from "axios";

//named axiosExecute bcz we are excuting the code.
const axiosExecute = axios.create({
    baseURL: "https://judge0-ce.p.rapidapi.com",
    headers: {
        "content-type": "application/json",
        "x-rapidapi-key": process.env.REACT_APP_ONLINE_JUDGE_API,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
})


export default axiosExecute;