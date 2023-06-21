import * as podmanDesktopAPI from '@podman-desktop/api';

export async function activate(extensionContext: podmanDesktopAPI.ExtensionContext): Promise<void> {
  const checkReqsCommand = podmanDesktopAPI.commands.registerCommand('sample-podman-extension.onboarding.checkPodmanRequirements', async () => {

    // simulate long operation
    await sleep(2000); 

    return {
      status: "failed",
      body: {
        warningsMarkdown: `
        * item 1
        * item 2
        `
      }
    }
  });

  const recheckReqsCommand = podmanDesktopAPI.commands.registerCommand('sample-podman-extension.onboarding.recheckPodmanRequirements', async () => {

    // simulate long operation
    await sleep(2000); 

    return {
      status: "ok"
    };
  });

  const installPodmanCommand = podmanDesktopAPI.commands.registerCommand('sample-podman-extension.onboarding.installPodman', async () => {
    // simulate long operation
    await sleep(2000);

    return {
      status: "ok",
    }
  });

  const installK8sCommand = podmanDesktopAPI.commands.registerCommand('sample-podman-extension.onboarding.installKubernetes', async () => {
    // simulate long operation
    await sleep(2000);

    return {
      status: "ok",
    }
  });

  extensionContext.subscriptions.push(checkReqsCommand, recheckReqsCommand, installPodmanCommand, installK8sCommand);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
