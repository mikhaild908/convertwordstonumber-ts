import Collections = require('typescript-collections');

class WordsToNumberConverter {
    TOKENS = this.GetTokens();
    MULTIPLIERS = this.GetMultipliers();

    constructor() { }

    private GetTokens(): Collections.Dictionary<string, number>
    {
        const tokens = new Collections.Dictionary<string, number>();
        
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
    }

    private GetMultipliers(): Array<string>
    {
        const multipliers = new Array<string>();

        multipliers.push("hundred");
        multipliers.push("thousand");
        multipliers.push("million");
        multipliers.push("billion");

        return multipliers;
    }

    public ParseWordsAndConvertToNumber(words: string): number
    {
        words = words.toLowerCase().trim().replace(/ /gi, "");

        return this.FindMatchingTokenAndGetValue(0, words);
    }

    private FindMatchingTokenAndGetValue(previousValue: number, remainingWords: string): number
    {
        if (remainingWords.length == 0)
        {
            return previousValue;
        }

        this.TOKENS.forEach(token => {
            if (this.IsTokenMatch(remainingWords, token))
            {
                const tokenValue = this.TOKENS.getValue(token) ?? 0;

                if (!this.IsMultiplier(token))
                {
                    if (previousValue % 1000 == 0 ||
                        previousValue % 100 == 0 &&  tokenValue >= 100)
                    {
                        previousValue = this.FindMatchingTokenAndGetValue(tokenValue, remainingWords.substring(token.length)) + previousValue;
                        // return previousValue;
                        //return this.FindMatchingTokenAndGetValue(tokenValue, remainingWords.substring(token.length)) + previousValue;
                        remainingWords = "";
                    }
                    else
                    {
                        previousValue = this.FindMatchingTokenAndGetValue(previousValue + tokenValue, remainingWords.substring(token.length));
                        // return previousValue;
                        //return this.FindMatchingTokenAndGetValue(previousValue + tokenValue, remainingWords.substring(token.length));
                        remainingWords = "";
                    }
                }
                else // token is a multiplier
                {
                    previousValue = this.FindMatchingTokenAndGetValue(previousValue * tokenValue, remainingWords.substring(token.length));
                    // return previousValue;
                    //return this.FindMatchingTokenAndGetValue(previousValue * tokenValue, remainingWords.substring(token.length));
                    remainingWords = "";
                }
            }
        });

        return previousValue;
    }

    private IsMultiplier(token: string): boolean
    {
        return this.MULTIPLIERS.indexOf(token) > -1;
    }

    private IsTokenMatch(words: string, token: string) : boolean
    {
        return words.indexOf(token) == 0;
    }
}

$(document).ready(function () {
    $("#btnConvert").click(function () {
        let words = $("#words").val()?.toString() ?? "";
        let converter = new WordsToNumberConverter();
        let result = converter.ParseWordsAndConvertToNumber(words);

        $("#result").html(result.toString());
    });
});