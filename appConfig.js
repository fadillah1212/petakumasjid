var developmentDatabase = {
    postgres: {
    host: 'ec2-52-211-161-21.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'dahmfc058svt0n',
    user: 'ggyilhxfjzmdjh',
    password: 'a8e57f5aa1d5456c4f4b5529f1a14ce00194913dd9ee40b2fddf3d78dddac73d'
    }
    }
    
    var connectionString = "postgres://ggyilhxfjzmdjh:a8e57f5aa1d5456c4f4b5529f1a14ce00194913dd9ee40b2fddf3d78dddac73d@ec2-52-211-161-21.eu-west-1.compute.amazonaws.com:5432/dahmfc058svt0n";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }
