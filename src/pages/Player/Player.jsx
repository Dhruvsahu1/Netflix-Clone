import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    type:"",
  });

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTVhZTkxODc5NmZiYTI1NzY2ZmVlNGVlNzU4MDIwMSIsIm5iZiI6MTc2MjM1NzEwNi42NzM5OTk4LCJzdWIiOiI2OTBiNmY3MjNkYWNmYzZhNjViNjk0NjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BEfEQVPzUmhKh5JhO1vNODxigLw2RS9aq2HtZ0LdCuo'
  }
};

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
}, [])


  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-1)}} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="Trailer"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
