const pbjs = require('protobufjs/cli/').pbjs;
const pbts = require('protobufjs/cli/').pbts; // or require("protobufjs-cli").pbjs / .pbts

pbjs.main(
  [ "--target", "static-module", "comments.proto", "-o", "protos/index.js" ], function(err, output) {
    if (err) {
      console.log(err);
      throw err;
    }
    // do something with output
    // console.log(output);
    pbts.main(["protos/index.js", "-o", "protos/index.d.ts"], function(err, output) {
      if (err) {
        console.log('pbts error: ', err)
        throw err;
      }
      // console.log('----output:', output)
    })
})
