import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';

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

  const gridRef = useRef();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDelete = () => {
      const selectedNode = gridRef.current.getSelectedNodes()[0];
      if (selectedNode) {
        const customerId = selectedNode.data.id;
        
        // Ask for confirmation
        const isConfirmed = window.confirm(`Are you sure you want to delete customer with ID ${customerId}?`);
        
        if (isConfirmed) {
          fetch(`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${customerId}`, {
            method: 'DELETE',
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to delete customer');
              }
              setCustomers(customers.filter(customer => customer.id !== customerId));
            })
            .catch(error => {
              console.error('Error deleting customer:', error.message);
            });
        }
      } else {
        alert('Select a row first!');
      }
    };
    
    
  
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
  
  const handleAddCustomer = (formData) => {
    console.log('Adding new customer:', formData);
    fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add customer');
      }
    })
    .catch(error => {
      console.error('Something went wrong again:', error.message);
    });
};
      
  return (
    <div>
      <div className="ag-theme-material" style={{width: 1200, height: 500}}>
        <AgGridReact
          ref={gridRef}
          onGridReady={ params => gridRef.current = params.api }
          columnDefs={columnDefs}
          rowData={customers}
          pagination={true}
          paginationPageSize={10}
          rowSelection="single"
        />
      </div>
      <AddCustomer NewCustomer={handleAddCustomer} fetchCustomers={fetchCustomers} />
      <button onClick={handleDelete}>Delete</button>
      <h2>Add Training</h2>
      <AddTraining gridRef={gridRef}/>
    </div>
  );
}