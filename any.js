const serializer = require('proto3-json-serializer');
const protobuf = require('protobufjs');
// npx pbjs -t json test.proto > test.json
const root = protobuf.loadSync('test.proto');
const metaproto = protobuf.loadSync('metadata.proto');

function decodeAny(
) {
  const json = {
    content: "test content"
  }
  const parseType = metaproto.lookupType('Metadata');
  const message = serializer.fromProto3JSON(parseType, json);
  if (!message) {
    throw new Error(`fail to serializer`);
  }
  const result = parseType.toObject(message);
  console.log('---result:', result)
}
decodeAny();
