'use strict';

require('dotenv').config({path:'./variables.env'});
const dataBaseConnect = require('./db');
const Printer = require('./models/Printer');


module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return dataBaseConnect()
    .then(() =>
      Printer.create(JSON.parse(event.body))
    )
    .then(printer => callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(printer)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain'},
      body: `Could not create the printer.${err}`
    }));
}

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return dataBaseConnect()
    .then(() =>
      Printer.findById(event.pathParameters.id)
    )
    .then(printer => callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(printer)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the printer.'
    }));
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return dataBaseConnect()
    .then(() =>
      Printer.find()
    )
    .then(printers => callback(null, {
      statusCode: 200,
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(printers)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain',
                 'Access-Control-Allow-Origin':'*' },
      body: 'Could not fetch the printers.'
    }))
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return dataBaseConnect()
    .then(() =>
      Printer.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
    )
    .then(printer => callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(printer)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the printers.'
    }));
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return dataBaseConnect()
    .then(() =>
      Printer.findByIdAndRemove(event.pathParameters.id)
    )
    .then(printer => callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'Removed printer with id: ' + printer._id, printer: printer })
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the printers'
    }));
};


