import { access, readFile } from "fs/promises";

export async function readJSONFromFile(filePath: string): Promise<object> {
  if (!filePath.endsWith(".json")) {
    throw new Error(`File '${filePath}' is not a JSON file.`);
  }

  const fileExists = await checkIfFileExists(filePath);
  if (!fileExists) {
    throw new Error(`File '${filePath}' does not exist.`);
  }

  try {
    const fileData = await readFile(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch {
    throw new Error(`Error reading file '${filePath}'. Check if the file has valid JSON content.`);
  }
}

async function checkIfFileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}
