import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as ApiClient from '../Services/ApiClient';
import parse from 'html-react-parser';

function Details({ oompas }) {
  const [details, setDetails] = useState({});

  const params = useParams();
  const oompaId = params.id;

  useEffect(() => {
    ApiClient.fetchDetails(oompaId).then((data) => {
      setDetails(data);
    });
  }, []);
  useEffect(() => {}, [details]);
  return (
    <div>
      <div className="details-home">
        <Link to="/">Home</Link>
      </div>
      <div className="details-section">
        <div className="details-image-area">
          <img src={details.image} className="details-image" alt=""></img>
        </div>
        <div className="details-info">
          <div className="details-name">
            {details.first_name} {details.last_name}
          </div>
          <div>{details.gender === 'M' ? 'Man' : 'Woman'}</div>
          {details.profession}
          &nbsp;
          <div className="details-text">
            {details.description && parse(details.description)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
