const { findByProps } = require("@vendetta/metro");
const { before } = require("@vendetta/patcher");

const BADGE_DATABASE = {
  "1272058113171783691": [
    { id: "staff", description: "Discord Staff", icon: "staff" },
  ],
  "USER_ID_2": [
    { id: "early_supporter", description: "Early Supporter", icon: "early_supporter" },
  ],
  // Add more users here!
};

let unpatch;

module.exports = {
  onLoad() {
    const BadgeModule = findByProps("getBadgesForUser");
    if (!BadgeModule) return;

    unpatch = before("getBadgesForUser", BadgeModule, ([userId]) => {
      const badges = BADGE_DATABASE[userId];
      if (badges) return [badges];
    });
  },

  onUnload() {
    unpatch?.();
  }
};
