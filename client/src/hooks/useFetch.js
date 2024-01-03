import { useEffect , useState } from 'react';
import axios from 'axios'

function useFetch(url) {

    const [data , setData] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const [error , setError] = useState();

    useEffect(() => {
        async function fetchData(){

            try {
                setIsLoading(true);
                const response = await axios.get(url);
                
                console.log(response.data);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setError(error)
            }
            setIsLoading(false);
        }

        fetchData();
    } , [url]);


    return {
        data,
        isLoading,
        error
    };
    
}

export default useFetch;