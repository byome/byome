module.exports = (process) => {
  const webhookURL = process.env.SLACK_NOTIFICATION_HOOK;
  const channel = "#ember-deploys";
  const username = "DeployBot";
  const iconURL = "https://newstechnica.com/wp-content/uploads/2014/05/rational-story-bro-robot.jpg";

  return {
    webhookURL: webhookURL,
    channel: channel,
    username: username,
    iconURL: iconURL,
    willDeploy(context) {
      const env = context.deployTarget;
      const version = context.project.pkg.version;
      const startTime = new Date();
      return (slack) => {
        return slack.notify({
          attachments: [
            {
              fallback: `*Deploy started*:\nEnvironment: ${env}\nVersion: ${version}\nTimestamp: ${startTime.toLocaleString()}`,
              text: `Deploy Started`,
              color: "#563D7C",
              footer: "My name is Kunta Kinte - DeployBot",
              fields: [
                { title: "Environment", value: env, short: true },
                { title: "Version", value: `<https://github.com/byome/byome/releases/tag/v${version}|v${version}>`, short: true },
                { title: "Timestamp", value: startTime.toLocaleString(), short: true },
              ]
            }
          ],
          startTime: startTime
        });
      }
    },
    didDeploy(context) {
      const env = context.deployTarget;
      const version = context.project.pkg.version;
      const endTime = new Date();
      const deployTime = (context) => (endTime - context.startTime) / 60000;
      return (slack) => {
        return slack.notify({
          attachments: [
            {
              fallback: `${env} deploy of v${version} finished at ${endTime.toLocaleString()}, and took ${deployTime} minutes`,
              text: `Deploy Successful`,
              color: "good",
              footer: "Your name is Tobeh - Some fuckin asshole",
              fields: [
                { title: "Environment", value: env, short: true },
                { title: "Version", value: `<https://github.com/byome/byome/releases/tag/v${version}|v${version}>`, short: true },
                { title: "Timestamp", value: endTime.toLocaleString(), short: true },
                { title: "Deploy Time", value: `${deployTime} minutes`, short: true },
              ]
            }
          ]
        });
      }
    },
    didFail(context) {
      const env = context.deployTarget;
      const version = context.project.pkg.version;
      const endTime = new Date();
      const deployTime = function(context) { return (endTime - context.startTime) / 60000; };
      return (slack) => {
        return slack.notify({
          attachments: [
            {
              fallback: `miles: ${env} deploy of v${version} failed! You dun goofed.`,
              text: `Deploy Failed`,
              color: "danger",
              footer: "Miles are you retarded or something",
              fields: [
                { title: "Environment", value: env, short: true },
                { title: "Version", value: `<https://github.com/byome/byome/releases/tag/v${version}|v${version}>`, short: true },
                { title: "Timestamp", value: endTime.toLocaleString(), short: true },
                { title: "Deploy Time", value: `${deployTime} minutes`, short: true },
              ]
            }
          ]
        });
      }
    }
  };
}
