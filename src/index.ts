import { App } from '@slack/bolt';
import * as dotenv from "dotenv"
import { changeIssuesIntoBlock, getIssues } from "./domain/issue";

dotenv.config()

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

if (process.env.DEBUG) {
  app.use(async (args: any) => {
    console.log(JSON.stringify(args));
    return await args.next();
  });
}

app.command('/find-issue', async ({ command, ack, say, respond }) => {
  // コマンドリクエストを確認
  await ack();

  if (command.text == null) {
    // TODO エラーハンドリング
  }

  const issues = await getIssues(command.text)
  console.log('issues', issues)

  const blocks = changeIssuesIntoBlock(issues, command.text)
  await respond({
    response_type: 'ephemeral',
    blocks
  })
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
