const protobuf = require('protobufjs');

const root = protobuf.loadSync('test.proto');
const Type = root.lookupType('TestArray');
const request = {name: 'test'};
const message = Type.fromObject(request)

console.log(message) // --> output: TestArray { allowed: [], name: 'test' }
console.log(message.name === request.name)// --> output:true
console.log(request.allowed === undefined)// --> output:true
console.log(message.allowed.length === 0)// --> output: true

const serializer = require('proto3-json-serializer');
const serialized = serializer.toProto3JSON(message);
console.log(serialized);

