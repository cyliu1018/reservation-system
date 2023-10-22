# Reservation service

## Modules

1. Reservation API server

## Environment variables

| Key                                         | Default   | Description                                                                |
| ------------------------------------------- | --------- | -------------------------------------------------------------------------- |
| PORT                                        | 3000      | port that API server binds                                                 |
| SWAGGER_ENABLED                             | 1         | swagger for the API server                                                 |
| PG_HOST                                     | localhost | postgres host                                                              |
| PG_PORT                                     | 5432      | postgres port                                                              |
| PG_DB                                       | postgres  | postgres database                                                          |
| PG_USER                                     | postgres  | postgres user                                                              |
| PG_PSWD                                     | docker    | postgres password                                                          |
| LIMIT_COUNT_FOR_USER_RESERVE_BY_MOCA_NFT    | 3         | times an invite code could ues for user who reserve by moca NFT            |
| LIMIT_COUNT_FOR_USER_RESERVE_BY_INVITE_CODE | 1         | times an invite code could ues for user who reserve by another invite code |
