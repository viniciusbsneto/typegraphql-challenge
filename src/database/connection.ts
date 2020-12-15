import mongoose from 'mongoose';

const databaseUri = process.env.DATABASE_URI as string;

mongoose.connect(databaseUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on('error', () => console.error('Connection error:'));
mongoose.connection.once('open', () => console.log('Databased connected.'));