import {
  Baby,
  Building2,
  CalendarClock,
  CircleHelp,
  Clock3,
  DollarSign,
  Eye,
  FileText,
  HeartHandshake,
  Headphones,
  Hospital,
  IdCard,
  Mail,
  MapPin,
  Phone,
  Pill,
  Plane,
  Shield,
  Smile,
  Stethoscope,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

const CHOICE_ICONS: Record<string, LucideIcon> = {
  under_65: Users,
  turning_65: CalendarClock,
  on_medicare: IdCard,
  dental_vision: Smile,
  life: HeartHandshake,
  travel: Plane,
  monthly_cost: DollarSign,
  doctors: Stethoscope,
  prescriptions: Pill,
  hospital_bill: Hospital,
  family: Users,
  dentist: Smile,
  eye_doctor: Eye,
  waiting_period: Clock3,
  family_left: Baby,
  term_or_permanent: FileText,
  how_much: Shield,
  agent: Headphones,
  self_enroll: Building2,
  morning: Clock3,
  afternoon: Clock3,
  evening_weekend: CalendarClock,
};

const FIELD_ICONS: Record<string, LucideIcon> = {
  firstName: User,
  lastName: User,
  email: Mail,
  phone: Phone,
  zip: MapPin,
  message: CircleHelp,
};

export function choiceIcon(choiceKey: string): LucideIcon {
  return CHOICE_ICONS[choiceKey] ?? CircleHelp;
}

export function fieldIcon(mapsToLeadField: string | null): LucideIcon {
  if (!mapsToLeadField) return CircleHelp;
  return FIELD_ICONS[mapsToLeadField] ?? CircleHelp;
}

export const IMG_TRAVEL_URL = "https://www.imglobal.com/travel-insurance";

export function selfEnrollPresentation(coverageKey: string | undefined) {
  if (coverageKey === "travel") {
    return {
      label: "See travel plans and buy",
      description: "Opens IMG in a new tab so you can compare and purchase.",
      redirectUrl: IMG_TRAVEL_URL,
    };
  }

  return {
    label: "Buy it yourself",
    description: "Continue on your own — nothing is submitted to an agent.",
    redirectUrl: null as string | null,
  };
}
