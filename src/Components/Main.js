import React, { useEffect, useState } from 'react';
import * as ApiClient from '../Services/ApiClient';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector, useDispatch } from 'react-redux';
import { setOompas, setPageId, setSearchTerm, increment } from '../actions';

function Main() {
  const [filteredOompas, setFilteredOompas] = useState([]);

  const dispatch = useDispatch();
  const pageId = useSelector((state) => state.setPage);
  const searchTerm = useSelector((state) => state.setSearch);
  const oompas = useSelector((state) => state.setOompas);
  // const inc = useSelector((state) => state.increment);

  useEffect(() => {
    ApiClient.fetchRequest(1).then((data) => {
      console.log('HERE');
      // if (Object.keys(oompas).length === 0) {
      dispatch(setOompas(data.results));
      window.preventDefault();
      // setFilteredOompas(data.results);
      // }
    });
  }, []);

  // useEffect(() => {}, [oompas]);

  const fetchData = async () => {
    ApiClient.fetchRequest(pageId).then((data) => {
      dispatch(setOompas(data.results));
    });

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
      {/* <div>
        {inc}
        <button
          onClick={() => {
            dispatch(increment());
          }}
        >
          +
        </button>
      </div> */}
      <form>
        <div>
          <input
            type="search"
            placeholder="Search"
            onChange={(event) => {
              dispatch(setSearchTerm(event.target.value));
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
          hasMore={true}
          loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="oompa-list">
            {!filteredOompas || filteredOompas.length === 0 ? (
              <div>There are no Oompa Loompas that match your search</div>
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
