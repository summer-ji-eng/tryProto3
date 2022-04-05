const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./protos/v2_test.proto');
// console.log('-----packageDefinition:: ', packageDefinition);
const proto = grpc.loadPackageDefinition(
  packageDefinition
);
// console.log('-----proto:: ', proto);

console.log('-=-=-=-;:' ,protoLoader.fromJSON(proto));
