@echo off

cd backend
start cmd /k "npm i && npm start"

cd ..

cd frontend
start cmd /k "npm i && npm start"