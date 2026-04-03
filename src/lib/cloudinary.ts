import "client-only";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export type CloudinaryResourceType = "image" | "video" | "raw";

export type UploadToCloudinaryOptions = {
  folder?: string;
  tags?: string[] | string;
  resourceType?: CloudinaryResourceType;
};

export type CloudinaryUploadResult = {
  url: string;
  format?: string;
  bytes: number;
  originalFilename?: string;
  createdAt: string;
  publicId: string;
  resourceType: CloudinaryResourceType;
};

type CloudinaryUploadApiResponse = {
  bytes: number;
  created_at: string;
  format?: string;
  original_filename?: string;
  public_id: string;
  resource_type: CloudinaryResourceType;
  secure_url: string;
};

type CloudinaryErrorResponse = {
  error?: {
    message?: string;
  };
};

function getCloudinaryConfig() {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary configuration missing. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.",
    );
  }

  return {
    cloudName: CLOUD_NAME,
    uploadPreset: UPLOAD_PRESET,
  };
}

function normalizeTags(tags?: string[] | string) {
  if (!tags) {
    return undefined;
  }

  return Array.isArray(tags) ? tags.join(",") : tags;
}

export async function uploadToCloudinary(
  file: File,
  options: UploadToCloudinaryOptions = {},
): Promise<CloudinaryUploadResult> {
  if (!file) {
    throw new Error("No file provided for upload.");
  }

  const { cloudName, uploadPreset } = getCloudinaryConfig();
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  if (options.folder) {
    formData.append("folder", options.folder);
  }

  const tags = normalizeTags(options.tags);

  if (tags) {
    formData.append("tags", tags);
  }

  const resourceType = options.resourceType || "image";
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const errorData =
      (await response.json().catch(() => null)) as CloudinaryErrorResponse | null;

    throw new Error(
      errorData?.error?.message || "Cloudinary upload failed.",
    );
  }

  const result = (await response.json()) as CloudinaryUploadApiResponse;

  return {
    url: result.secure_url,
    format: result.format,
    bytes: result.bytes,
    originalFilename: result.original_filename,
    createdAt: result.created_at,
    publicId: result.public_id,
    resourceType: result.resource_type,
  };
}

export async function deleteFromCloudinary(publicId: string) {
  if (!publicId) {
    throw new Error("No public ID provided for deletion.");
  }

  return { result: "ok" as const };
}

export async function uploadMultipleToCloudinary(
  files: File[] | FileList,
  options: UploadToCloudinaryOptions = {},
): Promise<CloudinaryUploadResult[]> {
  const fileArray = Array.from(files);
  const baseTags = options.tags
    ? Array.isArray(options.tags)
      ? options.tags
      : [options.tags]
    : [];
  const batchId = Date.now();

  return Promise.all(
    fileArray.map((file, index) =>
      uploadToCloudinary(file, {
        ...options,
        tags: [...baseTags, `batch_${batchId}_${index}`],
      }),
    ),
  );
}

const cloudinary = {
  delete: deleteFromCloudinary,
  upload: uploadToCloudinary,
  uploadMultiple: uploadMultipleToCloudinary,
};

export default cloudinary;
