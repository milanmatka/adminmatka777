import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
} from '@mui/material';
import { CloudUpload, Delete, Visibility } from '@mui/icons-material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Gameresult() {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const fetchImages = async () => {
  try {
    const res = await axios.get('https://mtka-api.onrender.com/api/homedp/latest-qr');
    console.log('Fetched Image Response:', res.data);
    
    if (res.data && res.data.data) {
      setImages([res.data.data]); // Wrap the single object in an array
    } else {
      setImages([]);
      toast.warn('No image found.');
    }
  } catch (error) {
    console.error('Error fetching image:', error.message);
    toast.error('Failed to fetch image.');
  }
};


  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append('qrcode', file));

    try {
      const res = await axios.post('https://mtka-api.onrender.com/api/homedp/upload-qr', formData);
      console.log('Upload Response:', res.data);
      toast.success('Image(s) uploaded successfully!');
      setSelectedFiles([]);
      fetchImages();
    } catch (error) {
      console.error('Upload failed:', error.message);
      toast.error('Failed to upload image(s).');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://mtka-api.onrender.com/api/homedp/delete-qr/${id}`);
      console.log('Delete Response:', res.data);
      toast.success('Image deleted successfully!');
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error.message);
      toast.error('Failed to delete image.');
    }
  };

  const handleView = (imageName) => {
    const imageUrl = `https://mtka-api.onrender.com/uploads/QRcode/${imageName}`;
    window.open(imageUrl, '_blank');
  };

  return (
    <Box p={4} maxWidth="900px" mx="auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Upload Add Money QR Code
      </Typography>

      <Typography variant="body1" mb={2} color="text.secondary">
        Upload and manage your image files. You can view or delete them anytime.
      </Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUpload />}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Select Images
          <input
            hidden
            accept="image/*"
            type="file"
            multiple
            onChange={handleImageChange}
          />
        </Button>

        <Button
          variant="outlined"
          disabled={selectedFiles.length === 0}
          onClick={handleUpload}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Upload Selected
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              <TableCell><strong>Preview</strong></TableCell>
              <TableCell><strong>Image Name</strong></TableCell>
              <TableCell><strong>Uploaded At</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {images.length > 0 ? (
              images.map((img) => (
                <TableRow key={img._id}>
                  <TableCell>
                    <img
                      src={`https://mtka-api.onrender.com/uploads/QRcode/${img.image}`}
                      alt="preview"
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: '10px',
                        border: '1px solid #ccc',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <a
                      href={`https://mtka-api.onrender.com/uploads/QRcode/${img.image}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: '#1976d2' }}
                    >
                      {img.image}
                    </a>
                  </TableCell>
                  <TableCell>{new Date(img.createdAt).toLocaleString()}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton onClick={() => handleView(img.image)} color="primary">
                        <Visibility />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(img._id)} color="error">
                        <Delete />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="text.secondary">No images uploaded yet.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Gameresult;
