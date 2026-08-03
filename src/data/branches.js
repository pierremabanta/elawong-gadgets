export const branches = [
  {
    id: "ayala-marikina",
    name: "Ayala Marikina Branch",
    address: "Ayala Malls Marikina, Marikina City",
  },
  {
    id: "commonwealth",
    name: "Commonwealth Branch",
    address: "Commonwealth Ave, Quezon City",
  },
  {
    id: "cainta",
    name: "Cainta Branch",
    address: "Cainta, Rizal",
  },
  {
    id: "montalban",
    name: "Montalban Branch",
    address: "Rodriguez (Montalban), Rizal",
  },
  {
    id: "riverbanks",
    name: "Riverbanks Branch",
    address: "Riverbanks Center, Marikina City",
  },
  {
    id: "tanay",
    name: "Tanay Branch",
    address: "Tanay, Rizal",
  },
  {
    id: "pasay",
    name: "Pasay Branch",
    address: "Pasay City",
  },
];

export const DEFAULT_BRANCH_ID = "ayala-marikina";

export const getBranchById = (id) => branches.find((b) => b.id === id) || branches[0];
