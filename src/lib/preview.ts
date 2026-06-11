/**
 * Wrap learner code into a full document for the live-preview iframe.
 * Mirrors the legacy `renderPreview`: code is injected into <body>, so a
 * `<style>` block inside it applies. Used by both the Editor and Quiz.
 */
export function previewDocument(code: string): string {
  return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">
  <style>
    body{font-family:"Tajawal","Segoe UI",Tahoma,sans-serif;
         padding:14px;color:#161A30;background:#F0ECE5;line-height:1.7;}
    table{border-collapse:collapse;}
    th,td{padding:6px 10px;border:1px solid #B6BBC4;}
    a{color:#31304D;}
  </style></head><body>${code}</body></html>`;
}
