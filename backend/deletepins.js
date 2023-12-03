const Pin = require('./models/pin'); // Adjust the path based on your project structure

const deleteAllPins = async () => {
  try {
    await Pin.deleteMany({});
    console.log('All pins deleted successfully.');
  } catch (error) {
    console.error('Error deleting pins:', error.message);
  } finally {
    // Close the MongoDB connection or perform any other necessary cleanup
    mongoose.connection.close();
  }
};

// Call the function to delete all pins
deleteAllPins();