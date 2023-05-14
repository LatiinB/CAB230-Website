  import React, { useMemo, useEffect, useState, query } from 'react';
  import { AgGridReact } from 'ag-grid-react';
  import { Form, Input, Row, Label, Col, Button} from 'reactstrap';

  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import MyNavbar from './MyNavbar';  
  import MyFooter from './MyFooter';
  import './Pages.css';  
  import 'bootstrap/dist/css/bootstrap.min.css'
  import { useSearchParams } from 'react-router-dom';


  async function getMovieDetails(url, idQuery) {
    const resultObject = await fetch(url + idQuery);
    return resultObject.json();
  }

  function MovieDetail() {
    const [searchParams, setSearchParams] = useSearchParams();
    const url = 'http://sefdb02.qut.edu.au:3000/movies/data/';
    const [resultObject, setResultObject] = useState(null);

    const columnDefs = useMemo(() => [
      { field: 'id',
      suppressColumnsToolPanel: true,
      hide: true,},
      { field: 'name'},
      { field: 'characters',
      valueFormatter: (params) => {
        if (Array.isArray(params.value) && params.value.length > 0) {
          return params.value.join(', ');
        } else if (params.value && typeof params.value === 'string' && params.value.trim() !== '') {
          return params.value.trim();
        } else {
          return 'N/A';
        }
      }
    },
      { field: 'category', sortable: true, sort: 'asc'},
    ], []); 

    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
        suppressMovable: true
    }), []);

    const [rowData, setRowData] = useState();

    useEffect(() => {
      async function fetchMovieDetails() {
        if (searchParams.has('imdbid') && searchParams.get('imdbid') !== '') {
          const idQuery = searchParams.get('imdbid');
          const movieDetails = await getMovieDetails(url, idQuery);
          setResultObject(movieDetails);
        }
      }

      fetchMovieDetails();
    }, [searchParams, url]);

    useEffect(() => {
      if (resultObject && resultObject.principals){
        setRowData(resultObject.principals)
      }
    }, [resultObject]);
    
    if (resultObject === null) {
      return (
        <div>
          <MyNavbar />
          <h1 className='AppHeader'>Something went wrong!</h1>
          <h1 className='AppHeader'>Mov.ie couldn't find a movie to lookup. Please go back to&ensp;<a href='/movies/' className='titleLink'>Movie Search</a>&ensp;and try again.</h1>
          <MyFooter />
        </div>
      );
    }

    else {
      let releaseDate, runtime, genres, country, boxOfficeGross, description, posterImage, ratings;
      if (resultObject.ratings){
        if (resultObject.ratings.length > 0){
          const formattedRatings = resultObject.ratings.map((rating) => {
            return (
              <React.Fragment key={rating.source}>
                {rating.source}: {rating.value}
                <br />
              </React.Fragment>
            );
          });
          ratings = <p>Ratings:<br />{formattedRatings}</p>;
        }
      }
      if (resultObject.year) {
        releaseDate = <p>Release Date: {resultObject.year}</p>;
      }
      if (resultObject.runtime) {
        runtime = <p>Runtime: {resultObject.runtime} minutes</p>;
      }
      if (resultObject.genres && resultObject.genres.length > 0) {
        genres = <p>Genre(s): {resultObject.genres.join(', ')}</p>;
      }
      if (resultObject.country) {
        country = <p>Country/Countries: {resultObject.country}</p>;
      }
      if (resultObject.boxoffice != 0 && resultObject.boxoffice){
        boxOfficeGross = (<p>Box Office Gross: ${resultObject.boxoffice.toLocaleString()}</p>);
      }
      if (resultObject.plot) {
        description = (<p>Description: {resultObject.plot}</p>);
      }
      if (resultObject.poster){
        posterImage = (<img src={resultObject.poster} alt='Poster failed to Load' className='moviePoster' />);
      }
      return (
        <div>
          <MyNavbar />
          <div className='movieDetailContainer'> 
          <h1 className='AppHeader'>{resultObject.title}</h1>
          {posterImage}
          <div className='movieProperties'>
            {releaseDate}
            {runtime}
            {genres}
            {country}
            {boxOfficeGross}
            {description}
          </div>
          <div className='ratingsBox'>
            {ratings}
          </div>
          <div className='agGridMoviesDetails' style={{height: 300}}>
          <AgGridReact
              className="ag-theme-alpine-dark"
              animateRows="true"
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              enableRangeSelection="true"
              headerHeight={30}
              rowData={rowData}
              rowSelection="multiple"
              suppressRowClickSelection="true">
          </AgGridReact>
          </div>
          <br />
          <MyFooter />
          </div>
        </div>
      );
    }
  }

  export default MovieDetail;