const serializer = require('proto3-json-serializer');
const protobuf = require('protobufjs');
// npx pbjs -t json test.proto > test.json
const root = protobuf.loadSync('test.proto');
const Type = root.lookupType('TestMessage');
const Enum = root.lookupTypeOrEnum('IPProtocol')

console.log('--enum:: ', Enum)
const message = Type.fromObject({
  content: 'abc',
  // value: 3 // -> output: { content: 'abc'}
  // value: 'UNKNOWN' // -> output: { content: 'abc'}
  // value: 'GLOBAL' // -> output: { content: 'abc', value: 'GLOBLE' }
  value: 0 // -> output: { content: 'abc', value: 'GLOBAL' }
});

const serialized = serializer.toProto3JSON(message);
console.log(serialized);

const responseJSON = {
  content: 'abc',
  // value: 1, // --> output: TestMessage { content: 'abc', value: 1 }
  // value: 5  // -> throw new Error(`enumFromProto3JSON: unknown value id ${enumValue}`);
  // value: 'LOCAL' // --> output: TestMessage { content: 'abc', value: 1 }
  value: 'UNKNOWN' // throw new Error(`enumFromProto3JSON: unknown value ${enumValue}`);
}

// after proto3-json-serializer fix

const _responseJSON = {
  content: 'abc',
  // value: 1, // --> output: TestMessage { content: 'abc', value: 1 }
  // value: 5  // -> no error throw and output: TestMessage { content: 'abc' }
  // value: 'LOCAL' // --> output: TestMessage { content: 'abc', value: 1 }
  value: 'UNKNOWN' // --> no error throw and output: TestMessage { content: 'abc' }
}

const deserialized = serializer.fromProto3JSON(Type, _responseJSON);
console.log(deserialized)
