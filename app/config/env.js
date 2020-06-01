const env = {
  database: 'de6cn590msbuc5',
  username: 'hwucgjsisukblf',
  password: '82f916d852a42327b52b6148352c1789bbe0e292a43fad810226a784f3b149a0',
  host: 'ec2-3-222-150-253.compute-1.amazonaws.com',
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
 
module.exports = env;