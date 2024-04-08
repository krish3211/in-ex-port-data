# Inventory Management

The Backend directory consists of the express.js api which connects to mongodb 

The Frontend directory consists of reactJS scripts

The Scripts directory consists of bash and powershell scripts to automatically run these
- In case of powershell (in the parent directory)
```bash
./Scripts/run-server.ps1
```

- In case of bash (in parent directory)
```bash  
./Scripts/run-server.sh
```



Otherwise to run this normally
- first open a powershell or terminal
```bash
node ./Backend/server.js
```
- Simultaneously run the below command in another powershell or terminal
```bash
cd ./frontend/
npm start
```



