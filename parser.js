// the regexes
var nullReg = /^(null)((.|\n)*)$/
var boolReg = /^(true|false)((.|\n)*)$/
var spaceReg = /^([  \t]+)((.\n)*)$/
var numberReg =  /^((?:\d+(?:\.\d*)?|\.\d+)(?:[e][+-]?\d+)?)((.|\n)*)$/
var openSqrReg = /^(\[)((.|\n)*)$/
var closeSqrReg = /^(\])((.|\n)*)$/
var closeCurReg = /^(\})((.|\n)*)$/
var openCurReg = /^(\{)((.|\n)*)$/
var commaReg = /^(,)((.|\n)*)$/
var stringReg = /^("(\"|[^"])*")((.|\n)*)$/

// this takes regex and input and gives matched value and rest of string
function getMatchAndRest (regex, input) {
  var tempMatch = regex.exec(input)
  var match = tempMatch[1]
  var rest = tempMatch[2]
  return [match, rest]
}
  if(tempMatch === null) {
    return null
  }
  else  {
    var match = tempMatch[1]
    var rest = tempMatch[2]
    return [match, rest]
  }
}  

function stringParser (input) {
  var matchArr = inputMatcher(stringReg, input)
}
function numberParser(input) {
  var matchArr = getMatchAndRest(numberReg, input)
  if(matchArr === null) {
    return null
  }
  else {
    return [Number(matchArr[0]), matchArr[1]]
  }
}
