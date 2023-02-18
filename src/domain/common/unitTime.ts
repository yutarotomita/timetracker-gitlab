/**
 * 時間の単位を示す列挙型
 * Enumを使いたかったがTypeScriptのEnumは下記問題あり。Union Typesを利用する。と思ったが使い方がよく分からなかったのでEnumを使う。
 * 
 * 参考：「TypeScriptのenumを使わないほうがいい理由を、Tree-shakingの観点で紹介します」
 * https://engineering.linecorp.com/ja/blog/typescript-enum-tree-shaking/
 */
enum UnitTime {
    HOUR =  60 *60 * 1000,
    MINUTE = 60 * 1000,
    SECOND = 1000,
    MILISECOND = 1
}