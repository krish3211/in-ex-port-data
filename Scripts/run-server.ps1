# Start the server
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "./backend/server.js -d"
Write-Host "Server UP!"

# Navigate to the client directory
Set-Location "./frontend"
Write-Host "Starting up"

# Start the client application in development mode
npm start