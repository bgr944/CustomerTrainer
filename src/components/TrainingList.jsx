import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Date', field: 'date', sortable: true, filter: true },
    { headerName: 'Duration in minutes', field: 'duration', sortable: true, filter: true },
    { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
    { headerName: 'Customer', field: 'customerName', sortable: true, filter: true },
    { headerName: 'Customer ID', field: 'customerId', sortable: true, filter: true }]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setTrainings(data);
            })
            .catch(err => {
                console.error('Something went wrong');
            });
    };

    const formatDate = (dateString) => {
        return dayjs(dateString).format('DD.MM.YYYY HH:mm');
    };

  // customer olio training olion sisällä
  // joten ei voinut käyttää trainingsia suoraan rowDatana
    const rowData = trainings.map(training => ({
        id: training.id,
        date: formatDate(training.date),
        duration: training.duration,
        activity: training.activity,
        customerName: `${training.customer.firstname} ${training.customer.lastname}`,
        customerId: training.customer.id
    }));

    return (
      <div className="ag-theme-material" style={{width: 1200, height: 500}}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                pagination={true}
                paginationPageSize={10}
                rowSelection="multiple"
            />
        </div>
    );
}
