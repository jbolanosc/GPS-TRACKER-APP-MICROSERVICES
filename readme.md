# GPS TRACKER APP .NET CORE MICROSERVICES AND ANGULAR

THIS APP IS DEVELOPED USING .NET CORE 5.0, NODEJS TYPESCRIPT, ANGULAR, SQL SERVER AND MICROSERVICES WITH DOCKER-COMPOSE
**SOME FEATURES STILL UNDER DEVELOPMENT**

## STEPS

1- CLONE AND DOWNLOAD REPO
2- EXECUTE IN CMD docker compose up --build
3- WAIT FOR ALL SERVICES TO START UP AROUND A MINUTE
4- OPEN http://localhost:7104

## ROUTES

**ANGULAR**: http://localhost:7104

**API-GATEWAY**: http://localhost:7100

**Gps**
1- GET /gps to get all gps
2- GET /gps/:id get one gps
3- POST /gps create gps
4- PUT /gps/:id update gps
5- DELETE /gps/:id delete gps

**Reports**
1- GET /reports to get all gps
2- GET /reports/:id get one gps
3- POST /reports create gps
4- PUT /reports/:id update gps
5- DELETE /reports/:id delete gps

**User**
1- GET /user to get all gps
2- GET /user/:id get one gps
3- POST /user create gps
4- PUT /user/:id update gps
5- DELETE /user/:id delete gps
6- POST /user/login with email and password
