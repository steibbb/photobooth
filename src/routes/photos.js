const router = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Photo = require('../models/Photo');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Please log in first' });
};

// Upload photo
router.post('/upload', isAuthenticated, upload.single('photo'), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'pica-photobooth'
    });

    const photo = new Photo({
      userId: req.user._id,
      cloudinaryId: result.public_id,
      imageUrl: result.secure_url,
      filter: req.body.filter || 'none'
    });

    await photo.save();
    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading photo', error: error.message });
  }
});

// Get user's photos
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const photos = await Photo.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photos', error: error.message });
  }
});

// Delete photo
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const photo = await Photo.findOne({ _id: req.params.id, userId: req.user._id });
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    await cloudinary.uploader.destroy(photo.cloudinaryId);
    await photo.remove();
    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting photo', error: error.message });
  }
});

module.exports = router;