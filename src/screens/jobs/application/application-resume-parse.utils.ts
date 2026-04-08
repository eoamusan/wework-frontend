import type { JobApplicationFormValues } from "@wew/lib/schemas/job-application-form";

type ParsedResumeExperience = JobApplicationFormValues["jobExperience"]["experiences"][number];

export type ParsedResumeApplicationData = {
  personalInfo: Partial<JobApplicationFormValues["personalInfo"]>;
  jobExperience: Partial<JobApplicationFormValues["jobExperience"]>;
};

const monthMap: Record<string, string> = {
  jan: "01",
  january: "01",
  feb: "02",
  february: "02",
  mar: "03",
  march: "03",
  apr: "04",
  april: "04",
  may: "05",
  jun: "06",
  june: "06",
  jul: "07",
  july: "07",
  aug: "08",
  august: "08",
  sep: "09",
  sept: "09",
  september: "09",
  oct: "10",
  october: "10",
  nov: "11",
  november: "11",
  dec: "12",
  december: "12",
};

const sectionBoundaryPattern =
  /\b(education|skills|projects|certifications?|awards|languages|references)\b/i;

function extractContactValue(pattern: RegExp, text: string) {
  return text.match(pattern)?.[0]?.trim() || "";
}

function pickResumeName(text: string) {
  return (
    text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 8)
      .find((line) => {
        if (line.length < 5 || line.length > 60) {
          return false;
        }

        if (/\d|@|https?:\/\//i.test(line)) {
          return false;
        }

        if (line.split(/\s+/).length > 4) {
          return false;
        }

        return /^[A-Za-z][A-Za-z'. -]+$/.test(line);
      }) || ""
  );
}

function splitName(value: string) {
  const [firstName = "", ...rest] = value.trim().split(/\s+/);
  return { firstName, lastName: rest.join(" ") };
}

function extractSummary(text: string) {
  const summaryMatch = text.match(
    /\b(summary|profile|objective|about)\b([\s\S]*?)(?:\n[A-Z][A-Z ]{2,}|\n\w[\w ]{1,30}\n|$)/i,
  );

  if (!summaryMatch) {
    return "";
  }

  return summaryMatch[2]
    .split("\n")
    .map((line) => line.replace(/^[-\u2022]\s*/, "").trim())
    .filter(Boolean)
    .join(" ")
    .slice(0, 600);
}

function extractLocation(text: string) {
  return (
    text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 12)
      .find((line) => {
        if (/@|https?:\/\//i.test(line) || /\d{3,}/.test(line)) {
          return false;
        }

        return /^[A-Za-z .'-]+,\s*[A-Za-z .'-]+$/.test(line);
      }) || ""
  );
}

function parseDateToken(token: string) {
  const normalized = token.trim().toLowerCase();

  if (/present|current|now/.test(normalized)) {
    return "";
  }

  const monthYearMatch = normalized.match(
    /\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b[ ,/-]*(\d{4})/,
  );

  if (monthYearMatch) {
    return `${monthYearMatch[2]}-${monthMap[monthYearMatch[1]]}-01`;
  }

  const numericMonthYearMatch = normalized.match(/\b(\d{1,2})[/-](\d{4})\b/);

  if (numericMonthYearMatch) {
    return `${numericMonthYearMatch[2]}-${numericMonthYearMatch[1].padStart(2, "0")}-01`;
  }

  const yearMatch = normalized.match(/\b(19|20)\d{2}\b/);
  return yearMatch ? `${yearMatch[0]}-01-01` : "";
}

function extractDateRange(value: string) {
  const match = value.match(
    /((?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?|\d{1,2}\/\d{4}|\d{4})[\w\s,/-]*?)\s*(?:-|–|to)\s*((?:present|current|now|jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?|\d{1,2}\/\d{4}|\d{4})[\w\s,/-]*)/i,
  );

  if (!match) {
    return undefined;
  }

  const startDate = parseDateToken(match[1]);

  if (!startDate) {
    return undefined;
  }

  return {
    currentlyWorking: /present|current|now/i.test(match[2]),
    endDate: parseDateToken(match[2]),
    startDate,
  };
}

function parseExperienceBlock(block: string): ParsedResumeExperience | null {
  const lines = block
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    return null;
  }

  const dateLineIndex = lines.findIndex((line) => Boolean(extractDateRange(line)));
  const dateInfo = dateLineIndex >= 0 ? extractDateRange(lines[dateLineIndex]) : undefined;
  const headerLines =
    dateLineIndex >= 0 ? lines.filter((_, index) => index !== dateLineIndex) : lines;
  const [firstLine = "", secondLine = "", ...restLines] = headerLines;

  if (!firstLine || !secondLine || !dateInfo?.startDate) {
    return null;
  }

  const [jobTitle, companyName] = firstLine.includes(" at ")
    ? firstLine.split(/\s+at\s+/i)
    : [firstLine, secondLine];

  if (!jobTitle || !companyName) {
    return null;
  }

  return {
    companyName: companyName.trim(),
    currentlyWorking: dateInfo.currentlyWorking,
    description:
      restLines
        .map((line) => line.replace(/^[-\u2022]\s*/, "").trim())
        .filter(Boolean)
        .join(" ")
        .slice(0, 900) || "Experience imported from resume.",
    endDate: dateInfo.endDate,
    jobTitle: jobTitle.trim(),
    startDate: dateInfo.startDate,
  };
}

function extractExperiences(text: string) {
  const match = text.match(
    /\b(work experience|professional experience|employment history|experience)\b([\s\S]*)/i,
  );
  const sectionText = match?.[2]?.trim() || "";

  if (!sectionText) {
    return [];
  }

  const boundaryIndex = sectionText.match(sectionBoundaryPattern)?.index;
  const limitedSection =
    boundaryIndex === undefined ? sectionText : sectionText.slice(0, boundaryIndex);

  return limitedSection
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map(parseExperienceBlock)
    .filter((experience): experience is ParsedResumeExperience => Boolean(experience))
    .slice(0, 5);
}

export function parseResumeText(text: string): ParsedResumeApplicationData {
  const name = pickResumeName(text);
  const { firstName, lastName } = splitName(name);

  return {
    jobExperience: {
      experiences: extractExperiences(text),
      linkedinProfile: extractContactValue(
        /https?:\/\/(?:www\.)?linkedin\.com\/[^\s)]+/i,
        text,
      ),
      portfolioWebsite: extractContactValue(
        /https?:\/\/(?!(?:www\.)?linkedin\.com\/)[^\s)]+/i,
        text,
      ),
    },
    personalInfo: {
      bio: extractSummary(text),
      emailAddress: extractContactValue(
        /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
        text,
      ),
      firstName,
      lastName,
      location: extractLocation(text),
      phone: extractContactValue(
        /(?:\+\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)?\d{3}[\s-]?\d{3,4}(?:[\s-]?\d{2,4})?/,
        text,
      ).replace(/\s{2,}/g, " "),
    },
  };
}
