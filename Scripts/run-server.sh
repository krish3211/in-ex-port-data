#!/bin/bash

node ./backend/server.js -d &
echo "Server UP!" 

cd ./frontend/
echo "Starting up"
npm --silent start 
