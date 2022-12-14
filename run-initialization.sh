echo "Wait for server"
#sleep 30s

/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P CorrectHorseBatteryStapleFor$ -d master -i create-database.sql