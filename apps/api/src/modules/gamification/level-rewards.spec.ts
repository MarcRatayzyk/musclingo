import {
  getRewardsForLevel,
  listLevelRewardEntries,
} from "@muscle-mind/types";

describe("level rewards catalog", () => {
  it("has no rewards for level 1", () => {
    expect(getRewardsForLevel(1)).toEqual([]);
  });

  it("grants neuroCoins at level 2", () => {
    expect(getRewardsForLevel(2)).toEqual([
      { kind: "neuroCoins", amount: 25 },
    ]);
  });

  it("lists entries from level 2 upward", () => {
    const entries = listLevelRewardEntries();
    expect(entries[0]?.level).toBe(2);
    expect(entries.some((e) => e.level === 20)).toBe(true);
  });
});
