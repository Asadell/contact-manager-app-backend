const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    // const connect = await mongoose.connect(<harusnya ngambil dari env, string mongo drivernya>);
    const connect = await mongoose.connect(
      'mongodb://127.0.0.1:27017/mycontacts-backend'
    );
    console.log(
      'Database connected: ',
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
