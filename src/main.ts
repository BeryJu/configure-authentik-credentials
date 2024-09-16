import * as core from "@actions/core";
import { getAuthentikToken } from "./token";
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const authentikUrl: string = core.getInput("authentik_url");
    const clientId: string = core.getInput("client_id");

    core.info("Fetching GitHub Actions Token...");
    const idToken = await core.getIDToken();
    core.info("Got GitHub Actions token");

    core.info("Getting authentik token...");
    const token = await getAuthentikToken(authentikUrl, clientId, idToken);
    core.info("Got authentik token...");

    core.setOutput("token", token.access_token);
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}
