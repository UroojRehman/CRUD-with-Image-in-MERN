// getting-started.js
import { connect } from 'mongoose';

main().catch(err => console.log(err));

export async function main() {
  await connect('mongodb://localhost:27017/MyDb');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}