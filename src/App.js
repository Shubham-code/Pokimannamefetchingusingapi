import react, {useState, useEffect} from 'react';
import PokimanList from './PokimanList';
import Pagination from './Pagination';
import axios from 'axios';

function App() {

  const [pokiman, setPokiman] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(true)
    let cancel 
    axios.get(currentPageUrl, {
      cancelToken : new axios.CancelToken(c=> cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokiman(res.data.results.map(p => p.name))
    }).catch(err=>err)

    return() => cancel()

  },[currentPageUrl])

  function gotoNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."

  return (
  <> 
  <PokimanList pokiman={pokiman}/>
  <Pagination gotoNextPage={nextPageUrl ? gotoNextPage : null} 
              gotoPrevPage={prevPageUrl ? gotoPrevPage : null}/>
  </>
  );
}

export default App;
