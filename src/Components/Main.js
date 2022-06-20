import React, { useEffect, useState } from 'react';
import * as ApiClient from '../Services/ApiClient';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector, useDispatch } from 'react-redux';
import {
  setOompas,
  setPageId,
  setSearchTerm,
  setPageLoaded,
  setTimer,
  resetOompas,
} from '../actions';

function Main() {
  const [filteredOompas, setFilteredOompas] = useState([]);
  const [more, setMore] = useState(true);

  const dispatch = useDispatch();
  const pageId = useSelector((state) => state.setPage);
  const searchTerm = useSelector((state) => state.setSearch);
  const oompas = useSelector((state) => state.setOompas);
  const pageLoaded = useSelector((state) => state.setPageLoaded);
  const timerState = useSelector((state) => state.setTimer);

  useEffect(() => {
    if (Date.now() - timerState >= 24 * 60 * 60 * 1000) {
      dispatch(resetOompas());
      localStorage.setItem('persist:root', []);

      dispatch(setTimer());

      ApiClient.fetchRequest(1).then((data) => {
        if (timerState === 0) dispatch(setTimer());
        dispatch(setOompas(data.results));
      });
    }

    if (oompas.length === 0) {
      ApiClient.fetchRequest(1).then((data) => {
        dispatch(setOompas(data.results));
      });
    }
  }, []);

  const fetchData = async () => {
    if (!pageLoaded.includes(pageId)) {
      ApiClient.fetchRequest(pageId).then((data) => {
        dispatch(setOompas(data.results));
        dispatch(setPageLoaded(pageId));
        dispatch(setTimer());
      });
    }
    dispatch(setPageId());
  };

  useEffect(() => {
    const filtered = (loompas, terms) => {
      if (loompas.length && terms) {
        const filt = loompas.filter((el) => {
          if (
            el.first_name.toLowerCase().includes(terms.toLowerCase()) ||
            el.last_name.toLowerCase().includes(terms.toLowerCase()) ||
            (el.first_name + ' ' + el.last_name)
              .toLowerCase()
              .includes(terms.toLowerCase()) ||
            el.profession.toLowerCase().includes(terms.toLowerCase())
          ) {
            return el;
          }
        });
        return filt;
      }
    };
    if (searchTerm === '') {
      setFilteredOompas(oompas);
    } else setFilteredOompas(filtered(oompas, searchTerm));
  }, [searchTerm, oompas]);

  return (
    <>
      <form>
        <div>
          <input
            type="search"
            placeholder="Search"
            onChange={(event) => {
              dispatch(setSearchTerm(event.target.value));
              if (event.target.value.length > 0) setMore(false);
              if (event.target.value.length === 0) setMore(true);
            }}
          />
          <img
            src={`/ic_search.png`}
            alt="search"
            width={10}
            className="search-icon"
          />
        </div>
      </form>
      <div className="headings">
        <div className="heading-one">Find your Oompa Loompa</div>
        <div className="heading-two">There are more than 100k</div>
      </div>

      {oompas && Object.keys(oompas).length ? (
        <InfiniteScroll
          dataLength={oompas.length}
          next={fetchData}
          hasMore={more}
          loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Searching only previously seen Oompa Loompas </b>
            </p>
          }
        >
          <div className="oompa-list">
            {!filteredOompas || filteredOompas.length === 0 ? (
              <div>
                There are no Oompa Loompas that match your search. Try scrolling
                through more.
              </div>
            ) : (
              ''
            )}
            {filteredOompas && filteredOompas.length
              ? filteredOompas.map((oompa) => {
                  return (
                    <>
                      <div className="ind-oompa">
                        <Link
                          to={`/${oompa.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <div>
                            <img
                              src={oompa.image}
                              alt="oompa"
                              width={200}
                            ></img>
                          </div>
                          <div className="oompa-text">
                            <div className="oompa-name">
                              {oompa.first_name + ' ' + oompa.last_name}
                            </div>
                            <div>{oompa.gender === 'F' ? 'Woman' : 'Man'}</div>
                            <div>{oompa.profession}</div>
                          </div>
                        </Link>
                      </div>
                    </>
                  );
                })
              : ''}
          </div>
        </InfiniteScroll>
      ) : (
        ''
      )}
    </>
  );
}

export default Main;
