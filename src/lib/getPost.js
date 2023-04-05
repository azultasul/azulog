import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import remarkHeadingId from 'remark-heading-id'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

function getMatterResult(id) {
  // Use gray-matter to parse the post metadata section
  const fullPath = path.join('blog', `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  return matterResult
}

export function getAllMetaData() {
  const fileNames = fs.readdirSync(path.join('blog'))

  const names = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const matterResult = getMatterResult(id)

    return {
      id,
      ...matterResult.data,
    }
  })
  return names
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(path.join('blog'))

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id) {
  const matterResult = getMatterResult(id)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).use(remarkGfm).use(remarkHeadingId).process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}
