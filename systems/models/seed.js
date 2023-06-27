const patients = [
    {
      name: 'John Smith',
      dob: new Date('1980-01-15'),
      age: 43,
      sex: 'Male',
      phoneNumber: '(123) 456-7890',
      email: 'john.smith@example.com',
      city: 'New York',
      state: 'NY',
      ssn: '123-45-6789',
      maritalStatus: 'Married',
      bloodType: 'A+',
      condition: 'Hypertension',
      allergies: 'Penicillin'
    },
    {
      name: 'Jane Johnson',
      dob: new Date('1992-06-27'),
      age: 31,
      sex: 'Female',
      phoneNumber: '(987) 654-3210',
      email: 'jane.johnson@example.com',
      city: 'Los Angeles',
      state: 'CA',
      ssn: '987-65-4321',
      maritalStatus: 'Single',
      bloodType: 'B-',
      condition: 'Asthma',
      allergies: 'NKDA'
    },
    {
      name: 'David Williams',
      dob: new Date('1975-11-10'),
      age: 48,
      sex: 'Male',
      phoneNumber: '(111) 222-3333',
      email: 'david.williams@example.com',
      city: 'Chicago',
      state: 'IL',
      ssn: '555-44-3333',
      maritalStatus: 'Divorced',
      bloodType: 'O+',
      condition: 'Diabetes',
      allergies: 'NSAIDs'
    },
    {
      name: 'Emily Davis',
      dob: new Date('1995-03-03'),
      age: 28,
      sex: 'Female',
      phoneNumber: '(444) 555-6666',
      email: 'emily.davis@example.com',
      city: 'Houston',
      state: 'TX',
      ssn: '222-33-4444',
      maritalStatus: 'Single',
      bloodType: 'AB+',
      condition: 'Depression',
      allergies: 'Codeine'
    },
    {
      name: 'Michael Brown',
      dob: new Date('1988-09-08'),
      age: 35,
      sex: 'Male',
      phoneNumber: '(777) 888-9999',
      email: 'michael.brown@example.com',
      city: 'Miami',
      state: 'FL',
      ssn: '888-99-7777',
      maritalStatus: 'Married',
      bloodType: 'O-',
      condition: 'Arthritis',
      allergies: 'Sulfa'
    }
  ];
  
    

// Export the seed data to `models/index.js`
module.exports = patients