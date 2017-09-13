
// the regexes
var nullReg = /^(null)((.|\n)*)$/
var boolReg = /^(true|false)((.|\n)*)$/
var spaceReg = /^([  \t]+)((.|\n)*)$/
var numberReg =  /^((?:\d+(?:\.\d*)?|\.\d+)(?:[e][+-]?\d+)?)((.|\n)*)$/
var openSqrReg = /^(\[)((.|\n)*)$/
var closeSqrReg = /^(\])((.|\n)*)$/
var closeCurReg = /^(\})((.|\n)*)$/
var openCurReg = /^(\{)((.|\n)*)$/
var closeCurlyReg = /^(\})((.|\n)*)$/
var openCurlyReg = /^(\{)((.|\n)*)$/
var commaReg = /^(,)((.|\n)*)$/
var stringReg = /^("(\"|[^"])*")((.|\n)*)$/
var stringReg = /^\"([^\"]*)\"((.|\n)*)/

// this takes regex and input and gives matched value and rest of string
function getMatchAndRest (regex, input) {
  var tempMatch = regex.exec(input)
  if(tempMatch === null) {
    return null
  }
  else  {
    var match = tempMatch[1]
    var rest = tempMatch[2]
    return [match, rest]
  }
}  

//takes input and returns consumed string ans rest or null
function stringParser (input) {
  var matchArr = stringReg.exec(input)
  if (matchArr === null) {
    return null
  }
  else {
    return [matchArr[1], matchArr[3]]
  }
}

function nullParser(input) {
  var matchArr = getMatchAndRest(nullReg, input)
  if (matchArr === null) {
    return null
  }
  else {
    return [null, matchArr[1]]
  }
}

function numberParser(input) {
 var matchArr = getMatchAndRest(numberReg, input)
  if (matchArr === null) {
    return null
  }
  else {
    return [Number(matchArr[0]), matchArr[1]]
  }
}

function openSqrParser(input) {
  var matchArr = getMatchAndRest(openSqrReg, input)
  if (matchArr === null) {
    return null
  }
  else {
    return ['[', matchArr[1]]
  }
}

function openCurlyParser(input) {
  var matchArr = getMatchAndRest(openCurlyReg, input)
  if (matchArr === null) {
    return null
  }
  else {
    return ['{', matchArr[1]]
  }
}

function closeSqrParser(input) {
  var matchArr = getMatchAndRest(closeSqrReg, input)
  if (matchArr === null) {
    return null
  }
  else {
    return [']', matchArr[1]]
  }
}

function closeCurlyParser(input) {
  var matchArr = getMatchAndRest(closeCurlyReg, input)
  if (matchArr === null) {
    return null
  }
  else {
    return ['}', matchArr[1]]
  }
}

function commaParser(input) {
  var matchArr = getMatchAndRest(commaReg, input)
  if (matchArr === null) {
    return null
  }
  else {
    return [',', matchArr[1]]
  }
}
function colonParser(input) {
  var matchArr = getMatchAndRest(colonReg, input)
  if (matchArr === null) {
    return null
  }
function spaceParser(input) {
  var matchArr = getMatchAndRest(spaceReg, input)
  if (matchArr === null) {
    return null
  }
  else {
    return [' ', matchArr[1]]
  }
}

function boolParser(input) {
  var matchArr = getMatchAndRest(boolReg, input)
  if (matchArr === null) return null
  return [(matchArr[0] === "true") , matchArr[1]]
}

function valueParser(input) {
  return numberParser(input) || boolParser(input) || stringParser(input) || arrayParser(input)
}


function arrayParser (input) {
  var mayBeSqrBkt = openSqrParser(input)
  return getArrayValues(mayBeSqrBkt[1])
}

function getArrayValues(input, accum, previousInputWasComma) {
  if (accum === undefined) {
    accum = []}
  if (previousInputWasComma === undefined) {
    previousInputWasComma = false}
  if ((closeSqrParser(input)  !== null) && previousInputWasComma === false)
   { var rest = closeSqrParser(input)[1]
    return [accum, rest]
   }
  if ((closeSqrParser(input)  !== null) && previousInputWasComma)
  { return null
  }
  
  if (spaceParser(input)  !== null) 
  { var rest = spaceParser(input)[1]
    return getArrayValues(rest, accum, previousInputWasComma)
  }
  if (commaParser(input) !== null && previousInputWasComma === false)
  {var rest = commaParser(input)[1]
   return getArrayValues(rest, accum, true)
  }
  if (commaParser(input) !== null && previousInputWasComma)
  {return null
  }

  if (valueParser(input) !== null && (previousInputWasComma || accum.length === 0))
     { var rest = valueParser(input)[1]
       var value = [valueParser(input)[0]]
       return getArrayValues(rest, accum.concat(value), false)
      }
    return null
    
}

    


var test = "[[] , [1]]"
console.log(arrayParser(test))
