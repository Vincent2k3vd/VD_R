export const recommendTables = (tablesDataRaw, guestCount) => {
  // Bảo vệ đầu vào
  
  if (!Array.isArray(tablesDataRaw) || typeof guestCount !== "number") {
    return { single: [], combinations: [] };
  }

  const tablesData = tablesDataRaw.filter(
    (t) => t.status === "available"
  );
  const single = [];
  const combinations = [];

  const hasBigOutdoorTable = tablesData.some(
    (t) =>
      t.capacity >= 8 &&
      (t.table_type?.toLowerCase().includes("standard") ||
        t.table_type?.toLowerCase().includes("outdoor"))
  );

  for (const table of tablesData) {
    if (table.capacity >= guestCount) {
      const efficiency = guestCount / table.capacity;
      single.push({
        ...table,
        efficiency,
        recommended: efficiency >= 0.6,
        type: "single",
      });
    }
  }

  single.sort((a, b) => b.efficiency - a.efficiency);

  const shouldSuggestCombination =
    (
      guestCount >= 5 && guestCount <= 7 && !hasBigOutdoorTable
    ) ||
    (
      guestCount > 8
    );
  if (shouldSuggestCombination) {
  const groupedByType = {
    standard: tablesData.filter(t => t.table_type === "standard"),
    private: tablesData.filter(t => t.table_type === "private"),
    outdoor: tablesData.filter(t => t.table_type === "outdoor"),
  };

  Object.values(groupedByType).forEach((group) => {
    // 2 bàn
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        createCombination([group[i], group[j]]);
        break;
      }
    }

    // 3 bàn
    if (guestCount > 8) {
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          for (let k = j + 1; k < group.length; k++) {
            createCombination([group[i], group[j], group[k]]);
          }
        }
      }
    }
  });

  combinations.sort((a, b) => b.efficiency - a.efficiency);
}


  return { single, combinations };

  function createCombination(tables) {
    const totalCapacity = tables.reduce((sum, t) => sum + t.capacity, 0);
    const maxExcess = tables.length === 2 ? 3 : 3;

    if (
      totalCapacity >= guestCount &&
      totalCapacity <= guestCount + maxExcess
    ) {
      const efficiency = guestCount / totalCapacity;
      combinations.push({
        tables,
        totalCapacity,
        efficiency,
        recommended: efficiency >= 0.6,
        type: "combination",
        id: tables.map((t) => t.table_id).join("-"),
      });
    }
  }
};
