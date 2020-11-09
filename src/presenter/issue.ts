export const changeIssuesIntoBlock = (issues: any[], keyword: string) => {
  const blocks = []
  blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `Showing search results for "${ keyword }". *<https://github.com/issues?q=org%3A${ process.env.GITHUB_ORG }+${ keyword }|View all results>*`
    }
  })
  issues.forEach(issue => {
    let type = 'issue'
    if (!!issue.url.match('pull')) {
      type = 'pull'
    }
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*<${ issue.url }|${ issue.title }> (${ issue.author.login })* \n\n Repository: ${ issue.repository.name } (${type})`
      }
    })
    blocks.push({
      "type": "divider"
    })
  })
  return blocks
}
