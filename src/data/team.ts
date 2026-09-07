export interface TeamMember {
  initials: string;
  roleTe: string;
  roleEn: string;
}

// Names intentionally omitted — add real members here.
export const team: TeamMember[] = [
  { initials: "01", roleTe: "నిర్వాహకుడు", roleEn: "Organizer" },
  { initials: "02", roleTe: "అలంకరణ బృందం", roleEn: "Decoration Team" },
  { initials: "03", roleTe: "పూజ బృందం", roleEn: "Pooja Team" },
  { initials: "04", roleTe: "ఆహార బృందం", roleEn: "Food & Annadanam" },
  { initials: "05", roleTe: "ఆర్థిక బృందం", roleEn: "Finance Team" },
  { initials: "06", roleTe: "ఫోటోగ్రఫీ", roleEn: "Photography" },
  { initials: "07", roleTe: "వీడియోగ్రఫీ", roleEn: "Videography" },
  { initials: "08", roleTe: "వాలంటీర్", roleEn: "Volunteer Lead" },
];
