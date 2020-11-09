import * as functions from "firebase-functions";
import { App, ExpressReceiver } from "@slack/bolt";
import { findIssueCommand } from "./commands/issue";

const config = functions.config();

export const expressReceiver = new ExpressReceiver({
  signingSecret: config.slack.signing_secret,
  endpoints: "/events",
  processBeforeResponse: true,
});

const app = new App({
  receiver: expressReceiver,
  token: config.slack.bot_token,
  processBeforeResponse: true,
});

findIssueCommand(app);
