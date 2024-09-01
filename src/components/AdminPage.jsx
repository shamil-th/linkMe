import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Container,
  CssBaseline,
} from '@mui/material';
import AddPatientForm from './AddPatientForm';
import ContactForm from './ContactForm';
import LabelForm from './LabelForm';

export default function AdminPage() {
  const [selectedSection, setSelectedSection] = useState('addPatient');

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
        {/* <Typography component="h1" variant="h4" align="center" gutterBottom>
          Admin Dashboard
        </Typography> */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <Button
            variant={selectedSection === 'addPatient' ? 'contained' : 'outlined'}
            onClick={() => handleSectionChange('addPatient')}
          >
            Add Patient
          </Button>
          <Button
            variant={selectedSection === 'contactMe' ? 'contained' : 'outlined'}
            onClick={() => handleSectionChange('contactMe')}
          >
            Contact Info
          </Button>
          <Button
            variant={selectedSection === 'label' ? 'contained' : 'outlined'}
            onClick={() => handleSectionChange('label')}
          >
            Label
          </Button>
        </Box>
        {selectedSection === 'addPatient' && <AddPatientForm />}
        {selectedSection === 'contactMe' && <ContactForm />}
        {selectedSection === 'label' && <LabelForm />}
      </Paper>
    </Container>
  );
}
