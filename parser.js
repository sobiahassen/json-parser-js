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

