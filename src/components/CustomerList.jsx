import React, { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'First Name', field: 'firstname', sortable: true, filter: true },
    { headerName: 'Last Name', field: 'lastname', sortable: true, filter: true },
    { headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true },
    { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true },
    { headerName: 'City', field: 'city', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'Phone', field: 'phone', sortable: true, filter: true }
  ]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
      fetch('https://customerrestservice-personaltraining.rahtiapp.fi/getcustomers')
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(data => {
          setCustomers(data);
        })
        .catch(err => {
          console.error('Something went wrong');
        });
    };
      
      return (
        <div className="ag-theme-material" style={{width: 1200, height: 500}}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={customers}
            pagination={true}
            paginationPageSize={10}
            rowSelection="multiple"
          />
        </div>
      );
    }