import React, { useMemo, useEffect, useState, query } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Form, Input, Row, Label, Col, Button} from 'reactstrap';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import MyNavbar from './MyNavbar';  
import MyFooter from './MyFooter';
import './Pages.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams } from 'react-router-dom';

function Movies() {

  const url = 'http://sefdb02.qut.edu.au:3000/movies/search?';

  const [searchParams, setSearchParams] = useSearchParams();
  var titleQuery = '';
  var yearQuery = '';
  var titlePlaceholder = 'Cool Movie Title'
  var yearPlaceholder = '1990'
  if (searchParams.has('title') && searchParams.get('title') != ''){
    titleQuery += 'title=' + searchParams.get('title') + '&'
    titlePlaceholder = searchParams.get('title')
  }
  if (searchParams.has('year') && searchParams.get('year') != '') {
    yearQuery += 'year=' + searchParams.get('year') + '&'
    yearPlaceholder = searchParams.get('year')
  }

  const query = titleQuery + yearQuery
  console.log(url+query)


  const columnDefs = useMemo(() => [
      { field: 'title', width: 350, sortable: true, sort: 'asc', cellRenderer: (params) => {
        const title = params.value;
        const id = params.data.imdbID;
        const url = `/moviedetails?imdbid=${id}`;
        return <a href={url} className="titleLink">{title}</a>
      }},
      { field: 'year', width: 150 },
      { field: 'imdbRating', width: 150},
      { field: 'rottenTomatoesRating', width: 225 },
      { field: 'metacriticRating' },
      { field: 'classification', width: 280 },
      {field: 'imdbID',
      suppressColumnsToolPanel: true,
      hide: true, }
  ], []); 

  const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
        suppressMovable: true
  }), []);

  const [rowData, setRowData] = useState();

  useEffect(() => {
    fetch(url + query)
            .then(res => res.json())
            .then(res => setRowData(res.data));
  }, []);
  

  return (
    <div>
      <MyNavbar />
      <h1 className='AppHeader'>Movie Search</h1>
      <p className='subHeader'>Just type in what you're looking for, or take a scroll through the top 100 results!</p>
      <div className='inputContent'>
        <Form>
          <Row>
            <Col>
              <Label for='titleSearch'>
                Title
              </Label>
              <Input id='titleSearch' name='title' placeholder={titlePlaceholder} type='text' style={{width: 475}}/>
            </Col>
            <Col>
              <Label for='yearSearch'>
                Year
              </Label>
              <Input id='yearSearch' name='year' placeholder={yearPlaceholder} type='year' style={{width: 475}}/>
            </Col>
            <Col>
              <div className='submitButton'>
                <Button style={{width:300}} >
                  Search!
                </Button>
              </div>
            </Col>

          </Row>
        </Form>
      </div>
      <div className='agGridMovies' style={{height: 550}}>
        <AgGridReact
            className="ag-theme-alpine-dark"
            animateRows="true"
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableRangeSelection="true"
            headerHeight={30}
            rowData={rowData}
            rowSelection="multiple"
            overlayNoRowsTemplate='<span class="ag-overlay-no-rows-center">No movies found</span>'
            suppressRowClickSelection="true">
        </AgGridReact>
      </div>

      <br />
      <MyFooter />
    </div>
  );
};
  
export default Movies;