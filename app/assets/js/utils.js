'use strict';

function knyMiddleware(context){
  return kny.syllbreak( kny.fontConvert(context, "unicode5"), "unicode5");
}