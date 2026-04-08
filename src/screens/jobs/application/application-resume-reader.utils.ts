export type ResumeImportSource = {
  file?: File | null;
  name?: string;
  url?: string;
};

function decodePdfString(value: string) {
  return value
    .replace(/\\([\\()])/g, "$1")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "")
    .replace(/\\t/g, "\t");
}

function normalizeResumeText(value: string) {
  return value
    .replace(/\r/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[^\S\n]+/g, " ")
    .trim();
}

function extractPrintableText(value: string) {
  return value
    .split(/[^A-Za-z0-9@:/.,&()+\- \n]+/)
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 2)
    .join("\n");
}

export async function getResumeFile(source: ResumeImportSource) {
  if (source.file) {
    return source.file;
  }

  if (!source.url) {
    return undefined;
  }

  const response = await fetch(source.url);

  if (!response.ok) {
    throw new Error("We could not access the uploaded resume.");
  }

  const blob = await response.blob();

  return new File([blob], source.name || "resume", {
    type: blob.type || undefined,
  });
}

function extractPdfText(binary: string) {
  const pdfStrings = Array.from(
    binary.matchAll(/\(([^()]*(?:\\.[^()]*)*)\)/g),
    (match) => decodePdfString(match[1]),
  );
  const hexStrings = Array.from(
    binary.matchAll(/<([0-9A-Fa-f\s]+)>\s*Tj/g),
    (match) =>
      match[1]
        .replace(/\s+/g, "")
        .match(/.{1,2}/g)
        ?.map((pair) => String.fromCharCode(Number.parseInt(pair, 16)))
        .join("") || "",
  );

  return normalizeResumeText([...pdfStrings, ...hexStrings].join("\n"));
}

export async function extractTextFromResume(file: File) {
  const fileName = file.name.toLowerCase();

  if (file.type === "application/pdf" || fileName.endsWith(".pdf")) {
    const buffer = await file.arrayBuffer();
    const binary = new TextDecoder("latin1").decode(buffer);
    const extracted = extractPdfText(binary);

    if (extracted.length >= 80) {
      return extracted;
    }

    return normalizeResumeText(extractPrintableText(binary));
  }

  try {
    const text = normalizeResumeText(await file.text());

    if (text.length >= 80) {
      return text;
    }
  } catch {
    // Fall back to binary extraction for formats the browser cannot read directly.
  }

  const buffer = await file.arrayBuffer();
  const binary = new TextDecoder("latin1").decode(buffer);
  return normalizeResumeText(extractPrintableText(binary));
}
