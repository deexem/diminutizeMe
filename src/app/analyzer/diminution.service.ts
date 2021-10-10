import {Injectable} from '@angular/core';
import {AnalyzerResult} from "../analyzer-result";

@Injectable({
  providedIn: 'root'
})
export class DiminutionService {


  constructor() {
  }

  diminutize(wordToDiminutize: string): AnalyzerResult {
    const cleanedUpWord = wordToDiminutize.trim();
    if (cleanedUpWord == "") {
      return DiminutionService.createResult($localize`:@@noInput:no input, no output`, "", "")
    }
    if (cleanedUpWord.endsWith("ing")) {
      let root = cleanedUpWord.substring(0, cleanedUpWord.length - 1);
      let fusion = "k";
      return DiminutionService.createResult($localize`:@@endInIng:ends in -ing`, root + fusion + "je", root, fusion)
    }
    if (cleanedUpWord.endsWith("ng")) {
      let fusion = "et";
      return DiminutionService.createResult(
        $localize`:@@endInNg:ends in -ng but not in -ing`,
        cleanedUpWord + fusion + "je", cleanedUpWord, fusion)
    }
    const endConsonants = ["s", "f", "t", "k", "c", "h", "p", "d", "g"];

    function isVowel(character: string): boolean {
      return ['a', 'e', 'i', 'o', 'u'].some(c => character == c)
    }

    if (cleanedUpWord.length >= 3) {
      let len = cleanedUpWord.length
      if (!isVowel(cleanedUpWord[len - 3])
        && isVowel(cleanedUpWord[len - 2])
        && !isVowel(cleanedUpWord[len - 1])) {
        let root = cleanedUpWord.substring(0, len - 1);
        let fusion = cleanedUpWord[len - 1].repeat(2) + "et";
        return DiminutionService.createResult(
          $localize`:@@endInCVC:Ends in consonant-vowel-consonant`,
          root + fusion + "je",
          root,
          fusion
        )
      }
    }

    if (endConsonants
      .some(l => cleanedUpWord.endsWith(l))) {
      let root = cleanedUpWord;
      return DiminutionService.createResult(
        $localize`:@@endIn:ends in (${endConsonants.join(",")}:L:)`,
        root + "je", root, "")
    }
    if (cleanedUpWord.endsWith("m")) {
      let root = cleanedUpWord.substr(0, cleanedUpWord.length - 1);
      let fusion = "mp";
      return DiminutionService.createResult(
        $localize`:@@endInM:ends in -m`,
        root + fusion + "je",
        root,
        fusion
      )
    }
    if (cleanedUpWord.length >= 2) {
      let len = cleanedUpWord.length
      if (isVowel(cleanedUpWord[len - 1])
        && (!isVowel(cleanedUpWord[len - 2]))) {
        let root = cleanedUpWord.substr(0, len - 1);
        let fusion = cleanedUpWord[len - 1].repeat(2) + "t";
        return DiminutionService.createResult(
          $localize`:@@endInV:ends in single vowel`,
          root + fusion + "je",
          root,
          fusion
        )
      }
    }
    let fusion = "t";
    return DiminutionService.createResult(
      $localize`:@@nothingFits:nothing else fits`,
      cleanedUpWord + fusion + "je", cleanedUpWord, fusion
    )
  }

  private static createResult(rule: string, final: string = "", root: string = "", fusion: string = ""): AnalyzerResult {
    return {
      rule: rule,
      final: final,
      root: root,
      fusion: fusion
    };
  }
}
