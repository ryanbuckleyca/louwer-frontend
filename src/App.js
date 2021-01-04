import React, {useState, useEffect} from 'react';
import { callAPI } from './utils/callAPI'
import Slogan from './components/Slogan'
import Posts from './components/Posts'
import Filters from './components/Filters/'
import Mapbox from './components/Mapbox/'

function App() {

  const [ posts, setPosts ] = useState([])
  const [ dimensions, setDimensions ] = useState()
  const [ refs, setRefs ] = useState(null)
  const [ map, setMap ] = useState()
  const [ errors, setErrors ] = useState()

  const handleResize = () => {
    const { innerWidth: width, innerHeight: height } = window
    console.log('w, h: ', width, height)
    setDimensions({ width, height })
  }

  useEffect(() => { 
    handleResize()
    window.addEventListener('resize', handleResize)

    const query = `query={ posts {
      id, title, price, location, latitude, longitude,images, text, link, group { id, name } }
    }`
    callAPI(query).then(res => res.data
      ? setPosts(res.data.posts)
      : setErrors("cannot connect to api")
    )
  }, [])

  if(errors) return <div>{errors}</div>

  return (
    <div>
      <div id="slogan" className="
        w-full p-5 bg-red-600 z-10
        sm:w-1/2
      ">
        <Slogan />
      </div>
      <div className="sticky top-0 z-20">
        <div id="mapbox" className="
          w-full h-64 top-20
          sm:w-1/2 sm:h-screen sm:top-0 sm:right-0 sm:fixed
        ">
          <Mapbox dimensions={dimensions} map={map} refs={refs} setMap={setMap}>
            { posts }
          </Mapbox>
        </div>
        <div id="filters" className="
          w-full bg-beige pt-2 z-10
          sm:w-1/2 sm:top-0
        ">
          <Filters setPosts={setPosts}>
            { posts }
          </Filters>
        </div>
      </div>
      <div id="posts" className="
        w-full px-3 bg-beige
        sm:w-1/2
      ">
        <Posts dimensions={dimensions} map={map} refs={refs} setRefs={setRefs}>
          { posts }
        </Posts>
      </div>
    </div>
  );
}

export default App;
