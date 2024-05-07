import React, { useState } from 'react';

export default function AddTraining({ gridRef }) {
  const [formData, setFormData] = useState({
    date: '',
    activity: '',
    duration: '',
    customer: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedNode = gridRef.current.getSelectedNodes()[0];
    if (!selectedNode) {
      console.error('Please select customer');
      return;
    }
    const customerId = selectedNode.data.id;

    const trainingData = {
      date: formData.date,
      activity: formData.activity,
      duration: formData.duration,
      customer: `https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${customerId}`
    };

    fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
      method: 'POST',
        headers: {
            'Content-Type': 'application/json'
      },
      body: JSON.stringify(trainingData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add training');
          }
          console.log('Training added successfuly');
      })
      .catch(error => {
        console.error('Something went wrong:', error.message);
      });

    setFormData({
      date: '',
      activity: '',
      duration: '',
      customer: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
      </label>
      <br/>
      <label>
        Activity:
        <input type="text" name="activity" value={formData.activity} onChange={handleChange} />
      </label>
      <br/>
      <label>
        Duration (min):
        <input type="number" name="duration" value={formData.duration} onChange={handleChange} />
      </label>
      <br/>
      <button type="submit">Add New Training</button>
    </form>
  );
}
