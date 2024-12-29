"use server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(
  process.cwd(),
  "src",
  "store",
  "documentation",
  "data.json"
);

const ensureDirectoryExistence = (filePath: string) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
};

export const getDocuments = async () => {
  ensureDirectoryExistence(dataFilePath);
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({}));
    console.log("สร้างไฟล์ข้อมูลที่", dataFilePath);
  }
  const data = fs.readFileSync(dataFilePath, "utf-8");
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing JSON data:", error);
    return {};
  }
};

export const writeDocuments = async (
  docs: Record<
    string,
    { titleEn: string; titleTh: string; contentEn: string; contentTh: string }
  >
) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(docs, null, 2));
  console.log("เขียนข้อมูลไปยัง", dataFilePath);
};

export const addDocument = async (newDoc: {
  titleEn: string;
  titleTh: string;
  contentEn: string;
  contentTh: string;
}) => {
  const docs = await getDocuments();
  const newId = `doc-${Object.keys(docs).length + 1}`;
  docs[newId] = newDoc;
  await writeDocuments(docs);
  return newId;
};

export const updateDocument = async (
  id: string,
  updatedDoc: {
    titleEn: string;
    titleTh: string;
    contentEn: string;
    contentTh: string;
  }
) => {
  const docs = await getDocuments();
  if (docs[id]) {
    docs[id] = updatedDoc;
    await writeDocuments(docs);
    return true;
  }
  return false;
};

export const deleteDocument = async (id: string) => {
  const docs = await getDocuments();
  if (docs[id]) {
    delete docs[id];
    await writeDocuments(docs);
    return true;
  }
  return false;
};
