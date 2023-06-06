export const mockConferenceTalk = (overrides = {}) => ({
  id: "any-id",
  title: "Any Title",
  speaker: "Any Speaker",
  category: "any category",
  ...overrides,
});

export const mockConferenceTalkProposal = (overrides = {}) => ({
  id: "any-id",
  title: "Any Title",
  speaker: "Any Speaker",
  category: "any category",
  status: "accepted",
  ...overrides,
});

export const mockConferenceTalkDetails = (overrides = {}) => ({
  id: "any-id",
  title: "Any Title",
  speaker: "Any Speaker",
  category: "any category",
  description: "any description",
  ...overrides,
});

export const mockCallForPapers = (overrides = { byTalkId: {} }) => overrides;
