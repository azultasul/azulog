import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm'
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

function getmatterResult(type, id) {
  // Use gray-matter to parse the post metadata section
  const fullPath = path.join(type, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return matterResult
}

export function getAllMetaData(type) {
  const fileNames = fs.readdirSync(path.join(type));

  const names = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const matterResult = getmatterResult(type, id)

    return {
      id,
      ...matterResult.data
    }
  })
  return names
}

export function getAllPostIds(type) {
  const fileNames = fs.readdirSync(path.join(type));

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(type, id) {
  const matterResult = getmatterResult(type, id)
  
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .use(remarkGfm)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}