import type { Exam } from "@/lib/content/types";

export const cssExam: Exam = {
  mcq: [
    { topic: 'CSS', q: 'ماذا يعني اختصار CSS؟', opts: ['Cascading Style Sheets', 'Creative Style System', 'Computer Styled Syntax', 'Colorful Sheet Styles'], correct: 0 },
    { topic: 'CSS', q: 'أين تُكتب CSS الداخليَّة؟', opts: ['داخل <body>', 'داخل <style> في <head>', 'في ملف منفصل', 'داخل <script>'], correct: 1 },
    { topic: 'CSS', q: 'أي وسم يربط ملف CSS خارجي؟', opts: ['<style>', '<link>', '<css>', '<src>'], correct: 1 },
    { topic: 'CSS', q: 'الرمز الذي يسبق محدِّد الفئة (class) هو:', opts: ['#', '.', '@', '*'], correct: 1 },
    { topic: 'CSS', q: 'الرمز الذي يسبق محدِّد المعرّف (id) هو:', opts: ['.', '#', '&', '%'], correct: 1 },
    { topic: 'CSS', q: 'قيمة text-align التي تجعل الأسطر متساوية العرض:', opts: ['center', 'justify', 'right', 'left'], correct: 1 },
    { topic: 'CSS', q: '1em يساوي كم بكسل افتراضياً؟', opts: ['10px', '16px', '20px', '12px'], correct: 1 },
    { topic: 'CSS', q: 'محدِّد الرابط عند مرور الفأرة فوقه:', opts: ['a:link', 'a:visited', 'a:hover', 'a:active'], correct: 2 },
    { topic: 'CSS', q: 'قيمة background-repeat التي تمنع تكرار الصورة:', opts: ['repeat', 'repeat-x', 'no-repeat', 'once'], correct: 2 },
    { topic: 'CSS', q: 'قيمة font-style للخط المائل:', opts: ['bold', 'italic', 'slant', 'oblique-normal'], correct: 1 }
  ],
  coding: [
    {
      topic: 'CSS طرق',
      prompt: 'اكتب وسم <link> لربط ملف CSS خارجي اسمه style.css.',
      hint: 'rel="stylesheet" و href="style.css".',
      starter: '',
      solution: '<link rel="stylesheet" type="text/css" href="style.css" />',
      check: (c) => /<link\b[^>]*rel\s*=\s*["']stylesheet["'][^>]*href\s*=\s*["']style\.css["']/i.test(c)
        || /<link\b[^>]*href\s*=\s*["']style\.css["'][^>]*rel\s*=\s*["']stylesheet["']/i.test(c)
    },
    {
      topic: 'CSS محدِّدات',
      prompt: 'اكتب قاعدة CSS (داخل <style>) تجعل كل عناصر <h1> لونها أزرق (blue).',
      hint: 'h1 { color: blue; }',
      starter: '<style>\n\n</style>',
      solution: '<style>\n  h1 { color: blue; }\n</style>',
      check: (c) => /h1\s*\{[^}]*color\s*:\s*blue/i.test(c)
    },
    {
      topic: 'CSS نصوص',
      prompt: 'اكتب قاعدة CSS تجعل الفقرات <p> موسّطة (center) ولون نصّها أحمر (red).',
      hint: 'text-align: center و color: red.',
      starter: '<style>\n  p {\n\n  }\n</style>',
      solution: '<style>\n  p {\n    text-align: center;\n    color: red;\n  }\n</style>',
      check: (c) => /text-align\s*:\s*center/i.test(c) && /color\s*:\s*red\b/i.test(c)
    },
    {
      topic: 'CSS خلفيات',
      prompt: 'اكتب قاعدة CSS تعطي العنصر <body> خلفية لونها أحمر (red).',
      hint: 'background-color: red; داخل قاعدة body.',
      starter: '<style>\n  body {\n\n  }\n</style>',
      solution: '<style>\n  body {\n    background-color: red;\n  }\n</style>',
      check: (c) => /body\s*\{[^}]*background(-color)?\s*:\s*red\b/i.test(c)
    }
  ]
};
