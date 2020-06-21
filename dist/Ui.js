"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
var Collections = require("typescript-collections");
var WordsToNumberConverter = /** @class */ (function () {
    function WordsToNumberConverter() {
        this.TOKENS = this.GetTokens();
        this.MULTIPLIERS = this.GetMultipliers();
    }
    WordsToNumberConverter.prototype.GetTokens = function () {
        var tokens = new Collections.Dictionary();
        tokens.setValue("ninety", 90);
        tokens.setValue("eighty", 80);
        tokens.setValue("seventy", 70);
        tokens.setValue("sixty", 60);
        tokens.setValue("fifty", 50);
        tokens.setValue("forty", 40);
        tokens.setValue("thirty", 30);
        tokens.setValue("twenty", 20);
        tokens.setValue("nineteen", 19);
        tokens.setValue("eighteen", 18);
        tokens.setValue("seventeen", 17);
        tokens.setValue("sixteen", 16);
        tokens.setValue("fifteen", 15);
        tokens.setValue("fourteen", 14);
        tokens.setValue("thirteen", 13);
        tokens.setValue("twelve", 12);
        tokens.setValue("eleven", 11);
        tokens.setValue("ten", 10);
        tokens.setValue("nine", 9);
        tokens.setValue("eight", 8);
        tokens.setValue("seven", 7);
        tokens.setValue("six", 6);
        tokens.setValue("five", 5);
        tokens.setValue("four", 4);
        tokens.setValue("three", 3);
        tokens.setValue("two", 2);
        tokens.setValue("one", 1);
        tokens.setValue("hundred", 100);
        tokens.setValue("thousand", 1000);
        tokens.setValue("million", 1000000);
        tokens.setValue("billion", 1000000000);
        return tokens;
    };
    WordsToNumberConverter.prototype.GetMultipliers = function () {
        var multipliers = new Array();
        multipliers.push("hundred");
        multipliers.push("thousand");
        multipliers.push("million");
        multipliers.push("billion");
        return multipliers;
    };
    WordsToNumberConverter.prototype.ParseWordsAndConvertToNumber = function (words) {
        words = words.toLowerCase().trim().replace(/ /gi, "");
        return this.FindMatchingTokenAndGetValue(0, words);
    };
    WordsToNumberConverter.prototype.FindMatchingTokenAndGetValue = function (previousValue, remainingWords) {
        var _this = this;
        if (remainingWords.length == 0) {
            return previousValue;
        }
        this.TOKENS.forEach(function (token) {
            var _a;
            var tokenValue = (_a = _this.TOKENS.getValue(token)) !== null && _a !== void 0 ? _a : 0;
            if (_this.IsTokenMatch(remainingWords, token)) {
                if (!_this.IsMultiplier(token)) {
                    if (previousValue % 1000 == 0 ||
                        previousValue % 100 == 0 && tokenValue >= 100) {
                        previousValue = _this.FindMatchingTokenAndGetValue(tokenValue, remainingWords.substring(token.length)) + previousValue;
                        //return previousValue;
                        //return this.FindMatchingTokenAndGetValue(tokenValue, remainingWords.substring(token.length)) + previousValue;
                    }
                    else {
                        previousValue = _this.FindMatchingTokenAndGetValue(previousValue + tokenValue, remainingWords.substring(token.length));
                        //return previousValue;
                        //return this.FindMatchingTokenAndGetValue(previousValue + tokenValue, remainingWords.substring(token.length));
                    }
                }
                else // token is a multiplier
                 {
                    previousValue = _this.FindMatchingTokenAndGetValue(previousValue * tokenValue, remainingWords.substring(token.length));
                    //return previousValue;
                }
            }
        });
        return previousValue;
    };
    WordsToNumberConverter.prototype.IsMultiplier = function (token) {
        return this.MULTIPLIERS.indexOf(token) > -1;
    };
    WordsToNumberConverter.prototype.IsTokenMatch = function (words, token) {
        return words.indexOf(token) == 0;
    };
    return WordsToNumberConverter;
}());
$(document).ready(function () {
    $("#btnConvert").click(function () {
        var _a, _b;
        var words = (_b = (_a = $("#words").val()) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
        var converter = new WordsToNumberConverter();
        var result = converter.ParseWordsAndConvertToNumber(words);
        $("#result").html(result.toString());
    });
});
