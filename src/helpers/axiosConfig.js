import get from "lodash/get";
import axios from "axios";

// the baseURL should to point to localhost in development
// and your domain in production
//const axiosCreate = async ()=>{
const app = await axios.create({ 
 //baseURL: "http://localhost:6001/api/auth/"
  baseURL: "https://api-lky4.onrender.com/api/auth/"
});

// axios consumes rejected API responses by default,
// so the configuration below intercepts the those
// responses and passes them down to the function that
// uses our custom "app" axios configuration.
app.interceptors.response.use(
  response => response,
  error => {
    const err = get(error, ["response", "data", "err"]);

    // "err" refers to the response returned from the API when
    // a response is rejected. "err" can be named anything, but it
    // must be consistent across all your API routes (for example, see
    // anarchive/routes/api => verify route => "catch" sends the "err")
    return Promise.reject(err ? err : error.message);
  }
);
//}


export default app;