import { App } from "@slack/bolt";
import { getIssues } from "../../domain/issue";
import { changeIssuesIntoBlock } from "../../presenter/issue";

export const findIssueCommand = (app: App) => {
  app.command("/find-issue", async ({ ack, body, context, command , respond}) => {
    await ack();
    if (command.text === null) {
      // TODO エラーハンドリング
    }

    const issues = await getIssues(command.text)
    console.log('issues', issues)

    const blocks = changeIssuesIntoBlock(issues, command.text)
    await respond({
      response_type: 'ephemeral',
      blocks,
    })
  });

};
