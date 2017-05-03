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
      return (slack) => {
        return slack.notify({
          text: `<@B57SUCLCB|channel>: Deploy started at ${new Date()}`
        });
      }
    },
    didDeploy(context) {
      return (slack) => {
        return slack.notify({
          text: `<@B57SUCLCB|channel>: Deploy finished at ${new Date()}`
        });
      }
    },
    didFail(context) {
      return (slack) => {
        return slack.notify({
          text: `<@B57SUCLCB|channel> & miles: Deploy failed! You dun goofed.`
        });
      }
    }
  };
}
