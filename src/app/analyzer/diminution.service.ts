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
      return {final:""}
    }
    if (wordToDiminutize.endsWith("ing")) {
      return {
        final: wordToDiminutize.substring(0, wordToDiminutize.length - 1) + "kje"
      }
    }
    if (wordToDiminutize.endsWith("ng")) {
      return {
        final: wordToDiminutize + "etje"
      }
    }
    if (["s", "f", "t", "k", "c", "h", "p", "d", "g"]
      .some(l => wordToDiminutize.endsWith(l))) {
      return {
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
          final: wordToDiminutize + wordToDiminutize[len - 1] + "etje"
        }
      }
    }
    if (wordToDiminutize.endsWith("m")) {
      return {
        final: wordToDiminutize + "pje"
      }
    }
    if (wordToDiminutize.length >= 2) {
      let len = wordToDiminutize.length
      if (isVowel(wordToDiminutize[len - 1])
        && (!isVowel(wordToDiminutize[len - 2]))) {
        return {
          final: wordToDiminutize + wordToDiminutize[len - 1] + "tje"
        }
      }
    }
    return {
      final: wordToDiminutize + "tje"
    }
  }
}
