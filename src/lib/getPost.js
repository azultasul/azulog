import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

function getMatterResult(id) {
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
  const contentHtml = matterResult.content

  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}
