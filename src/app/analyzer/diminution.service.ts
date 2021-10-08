import {Injectable} from '@angular/core';
import {AnalyzerResult} from "../analyzer-result";

@Injectable({
  providedIn: 'root'
})
export class DiminutionService {

  constructor() {
  }

  diminutize(wordToDiminutize: string): AnalyzerResult {
    if(wordToDiminutize.trim() == ""){
      return {
        rule: $localize`:@@noInput:no input, no output`,
        final:""
      }
    }
    if (wordToDiminutize.endsWith("ing")) {
      return {
        rule: $localize `:@@endInIng:ends in -ing`,
        final: wordToDiminutize.substring(0, wordToDiminutize.length - 1) + "kje"
      }
    }
    if (wordToDiminutize.endsWith("ng")) {
      return {
        rule: $localize `:@@endInNg:ends in -ng but not in -ing`,
        final: wordToDiminutize + "etje"
      }
    }
    const endConsonants = ["s", "f", "t", "k", "c", "h", "p", "d", "g"];
    if (endConsonants
      .some(l => wordToDiminutize.endsWith(l))) {
      return {
        rule: $localize `:@@endIn:ends in (${endConsonants.join(",")}:L:)`,
        final: wordToDiminutize + "je"
      }
    }

    function isVowel(character: string): boolean {
      return ['a', 'e', 'i', 'o', 'u'].some(c => character == c)
    }

    if (wordToDiminutize.length >= 3) {
      let len = wordToDiminutize.length
      if (!isVowel(wordToDiminutize[len - 3])
        && isVowel(wordToDiminutize[len - 2])
        && !isVowel(wordToDiminutize[len - 1])) {
        return {
          rule: $localize `:@@endInCVC:Ends in consonant-vowel-consonant`,
          final: wordToDiminutize + wordToDiminutize[len - 1] + "etje"
        }
      }
    }
    if (wordToDiminutize.endsWith("m")) {
      return {
        rule: $localize`:@@endInM:ends in -m`,
        final: wordToDiminutize + "pje"
      }
    }
    if (wordToDiminutize.length >= 2) {
      let len = wordToDiminutize.length
      if (isVowel(wordToDiminutize[len - 1])
        && (!isVowel(wordToDiminutize[len - 2]))) {
        return {
          rule: $localize`:@@endInV:ends in single vowel`,
          final: wordToDiminutize + wordToDiminutize[len - 1] + "tje"
        }
      }
    }
    return {
      rule: $localize`:@@nothingFits:nothing else fits`,
      final: wordToDiminutize + "tje"
    }
  }
}
