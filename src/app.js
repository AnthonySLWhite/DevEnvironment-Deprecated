import '@babel/polyfill';
import 'dotenv/config';
console.log(`This is my ${process.env.MY_DATABASE_PASSWORD}`);
import './server/server';
