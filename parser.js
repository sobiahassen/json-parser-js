
// the regexes
var nullReg = /^(null)((.|\n)*)$/
var boolReg = /^(true|false)((.|\n)*)$/
var spaceReg = /^([  \t]+)((.|\n)*)$/
var numberReg =  /^((?:\d+(?:\.\d*)?|\.\d+)(?:[e][+-]?\d+)?)((.|\n)*)$/
var openSqrReg = /^(\[)((.|\n)*)$/
var closeSqrReg = /^(\])((.|\n)*)$/
var closeCurlyReg = /^(\})((.|\n)*)$/
var openCurlyReg = /^(\{)((.|\n)*)$/
var commaReg = /^(,)((.|\n)*)$/
var colonReg = /^(\:)((.|\n)*)$/
// stringReg changed now working fine
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
  else {
    return [':', matchArr[1]]
  }
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
  if(mayBeSqrBkt){
    return getArrayValues(mayBeSqrBkt[1])
  }
  return null
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

function objectParser(input) {
  var mayBeOpenCurly = openCurlyParser(input)
  if (mayBeOpenCurly) {
   return  getObjValuesandRest(mayBeOpenCurly[1])
  }
  //console.log('res---->', res)
  return null
}
function getObjValuesandRest (input, accum, previousInputWasComma){
 // console.log(input, accum, previousInputWasComma)
  if(accum === undefined) {
    accum = {} }
  if(previousInputWasComma === undefined) {
    previousInputWasComma = false }
  if((closeCurlyParser(input) !== null ) && previousInputWasComma === false) {
    var rest = closeCurlyParser(input)[1]
    console.log('accum = ', accum, ' rest = ', rest)
    return [accum, rest] }
  if((closeCurlyParser(input) !== null ) && previousInputWasComma === true) {
    return null }
  if (spaceParser(input)  !== null) 
  { var rest = spaceParser(input)[1]
    return getObjValuesandRest(rest, accum, previousInputWasComma)
  }
  if (commaParser(input) !== null && previousInputWasComma)
  {return null
  }
  if (commaParser(input) !== null && previousInputWasComma === false)
  {var rest = commaParser(input)[1]
   return getObjValuesandRest(rest, accum, true)
  }
 // console.log(Object.keys(accum).length)
  if (keyColonValueParser(input) !== null && (previousInputWasComma || Object.keys(accum).length === 0))
  { var keyColonValueParserResult = keyColonValueParser(input)
    var key = keyColonValueParserResult[0]
    var value = keyColonValueParserResult[1]
    var rest = keyColonValueParserResult[2]
    accum[key] = value
    return  getObjValuesandRest(rest, accum, false)
    // 
  }
  return null
}

function keyColonValueParser (input) {
 // console.log("in key colon value parser , input = ", input)
  input = input.trim()
  var mayBeString = stringParser(input)
//  console.log(mayBeString)
  if (mayBeString !== null) {
    var key = mayBeString[0]
    var rest =  mayBeString[1].trim()
//    console.log(key, rest)
    var mayBeColon = colonParser(rest)
    if (mayBeColon !== null) {
      var mayBeValue = valueParser(mayBeColon[1].trim())
//      console.log(mayBeValue)
      if (mayBeValue) {
       // console.log([key, mayBeValue[0], mayBeValue[1]] + "return value of keyColon")
        return [key, mayBeValue[0], mayBeValue[1]]
      }
    }
  }
  return null
}
    


var test = "[[] , [1]]"
console.log(arrayParser(test))
var test = "{\"hello\": \"123\", \"hallo\":324}"
console.log(objectParser(test))


//objectParser("{\"hello\" : \"val\"}")
