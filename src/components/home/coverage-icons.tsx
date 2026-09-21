import type { ReactNode } from "react";
import type { services } from "@/lib/site";

type ServiceSlug = (typeof services)[number]["slug"];

type GlyphProps = {
  className?: string;
};

function Glyph({
  className,
  children,
  viewBox = "0 0 48 48",
}: GlyphProps & { children: ReactNode; viewBox?: string }) {
  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true" fill="none">
      {children}
    </svg>
  );
}

function FamilyShieldIcon({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path
        d="M24 3.8 41.5 11v12.2c0 9.2-6.8 16.4-17.5 20.6C10.3 39.6 3.5 32.4 3.5 23.2V11L24 3.8Z"
        stroke="currentColor"
        strokeWidth="2.15"
        strokeLinejoin="round"
      />
      <path
        fill="currentColor"
        d="m24 7.6 1.25 2.55 2.8.4-2.02 1.98.48 2.8L24 14.05l-2.51 1.28.48-2.8-2.02-1.98 2.8-.4L24 7.6Z"
      />
      <g fill="currentColor">
        <circle cx="13.2" cy="21.6" r="2.7" />
        <path d="M8.8 39.2V30.4c0-3.4 1.8-5.2 4.4-5.2s4.4 1.8 4.4 5.2v8.8H8.8Z" />
        <circle cx="34.8" cy="21.6" r="2.7" />
        <path d="M30.4 39.2V30.4c0-3.4 1.8-5.2 4.4-5.2s4.4 1.8 4.4 5.2v8.8H30.4Z" />
        <circle cx="24" cy="25.6" r="2.15" />
        <path d="M20.6 39.2v-6.6c0-2.6 1.4-4.2 3.4-4.2s3.4 1.6 3.4 4.2v6.6h-6.8Z" />
      </g>
    </Glyph>
  );
}

function MedicareCardIcon({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 86 54" className={className} aria-hidden="true">
      <rect
        width="86"
        height="54"
        rx="5"
        fill="#ffffff"
        stroke="#C5D4DE"
        strokeWidth="1.25"
      />
      <path d="M0 5a5 5 0 0 1 5-5h76a5 5 0 0 1 5 5v11H0V5Z" fill="#07557D" />
      <text
        x="43"
        y="11.2"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="4.7"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        letterSpacing="0.2"
      >
        MEDICARE HEALTH INSURANCE
      </text>
      <rect y="16" width="86" height="3.4" fill="#B42318" />
      <rect y="19.4" width="86" height="1.5" fill="#07557D" />
      <rect x="7" y="26" width="34" height="3.2" rx="1" fill="#D5E1E8" />
      <rect x="7" y="32.4" width="26" height="2.6" rx="1" fill="#E4EEF2" />
      <rect x="7" y="38" width="30" height="2.6" rx="1" fill="#E4EEF2" />
      <rect x="7" y="43.4" width="18" height="2.6" rx="1" fill="#E4EEF2" />
      <rect x="68" y="40" width="6" height="6" rx="1" fill="#07557D" />
      <rect x="74.5" y="40" width="4.5" height="6" rx="1" fill="#B42318" />
    </svg>
  );
}

function TexasIcon({ className }: GlyphProps) {
  return (
    <Glyph className={className} viewBox="10 0 290 340">
      <path
        fill="currentColor"
        d="M80 12h62v58h96l34 42-24 30 36 46-34 52-52 48-46 38-42-46-46-36-48-22 36-52 22-90V70H80V12Z"
      />
    </Glyph>
  );
}

function DentalVisionIcon({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path
        fill="currentColor"
        d="M4.8 17.5c0-3.2 1.4-5.2 3.6-5.2.6-2.6 2.5-3.8 4.2-2.2 1.7-1.6 3.6-.4 4.2 2.2 2.2 0 3.6 2 3.6 5.2 0 3.4-.4 5.6-1.1 7.6-.7 2.1-.6 4.6.3 6.2.45 1-.35 2.1-1.55 2.1-1.05 0-1.7-.9-1.95-2.15-.35-1.35-.7-1.25-1.05.05-.3 1.25-.95 2.1-2 2.1s-1.7-.85-2-2.1c-.35-1.3-.7-1.4-1.05-.05-.25 1.25-.9 2.15-1.95 2.15-1.2 0-2-.1-1.55-2.1.9-1.6 1-4.1.3-6.2-.7-2-1.1-4.2-1.1-7.6Z"
      />
      <path
        d="M28.2 22.6c2.6-4.6 9.8-4.6 12.4 0-2.6 4.6-9.8 4.6-12.4 0Z"
        stroke="currentColor"
        strokeWidth="2.15"
      />
      <circle cx="34.4" cy="22.6" r="1.7" fill="currentColor" />
    </Glyph>
  );
}

function LifeHeartIcon({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path
        d="M24 41.2S8 30.6 8 19.2C8 13.2 12.2 9 17.2 9c3.1 0 5.4 1.5 6.8 3.8C25.4 10.5 27.7 9 30.8 9 35.8 9 40 13.2 40 19.2 40 30.6 24 41.2 24 41.2Z"
        stroke="currentColor"
        strokeWidth="2.45"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 23.5H15l3.4-8.2 4.2 14.2 3.2-8.6H43.5"
        stroke="currentColor"
        strokeWidth="2.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Glyph>
  );
}

function FinalExpenseIcon({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M24 4.2 42.2 12.2V25c0 9.4-7 16.6-18.2 20.8C12.8 41.6 5.8 34.4 5.8 25V12.2L24 4.2ZM21.15 18.4h5.7v5.7h5.7v5.7h-5.7v5.7h-5.7v-5.7h-5.7v-5.7h5.7v-5.7Z"
      />
    </Glyph>
  );
}

function FuneralUrnIcon({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <circle cx="24" cy="4.6" r="2.3" fill="currentColor" />
      <path fill="currentColor" d="M22.5 6.6h3V9h-3z" />
      <path fill="currentColor" d="M12.5 8.6h23l-2.2 3.4H14.7L12.5 8.6Z" />
      <path fill="currentColor" d="M18.2 12h11.6v3.4H18.2z" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M16.2 15.2c-5.2 2.2-7.4 7.4-6.5 14.4C10.6 37.2 16 42 24 42s13.4-4.8 14.3-12.4c.9-7-1.3-12.2-6.5-14.4H16.2ZM24 22.4c3.4 1.8 4.4 6.4.2 9.4-4.2-3-3.2-7.6-.2-9.4Z"
      />
      <path fill="currentColor" d="M12 41.4h24v2.8c0 .5-.4.9-1 .9H13c-.6 0-1-.4-1-.9v-2.8Z" />
    </Glyph>
  );
}

function TravelPlaneIcon({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path
        fill="currentColor"
        transform="rotate(-38 24 24)"
        d="M43.5 24 31 21.2V14.2L26.8 11.2v8.6L12.5 16.2 10 19.6l13.2 3.6v7.4l-4.2 3.8 2.8 1.6 4.6-6.6h3.2l.2 6.2 3.6-2.4-2.2-6.8L43.5 24Z"
      />
    </Glyph>
  );
}

function RetirementChairIcon({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <g
        stroke="currentColor"
        strokeWidth="2.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 41c9-7.5 29-7.5 38 1.4" />
        <path d="M14 39.2 16.6 16.5" />
        <path d="M16.6 16.5h9" />
        <path d="M19.4 17.2V29" />
        <path d="M22.6 17.8V29" />
        <path d="M15.4 29h17.2" />
        <path d="M32.6 29 34.4 38.6" />
        <path d="M19 23.4h11" />
        <path d="M30 23.4 32.6 29" />
      </g>
    </Glyph>
  );
}

function MortgageHouseIcon({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path
        d="M5.5 23.2 20.5 9.2l15 14v19.2h-30V23.2Z"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
      <path
        d="M15.2 42.4V30.6h7.2v11.8"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
      <path
        d="M31.2 19.8 42.6 24.4v8.4c0 5.2-4.4 9-11.4 11.4-7-2.4-11.4-6.2-11.4-11.4v-8.4l11.4-4.6Z"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
    </Glyph>
  );
}

export const coverageIcons: Record<
  ServiceSlug,
  (props: GlyphProps) => ReactNode
> = {
  health: FamilyShieldIcon,
  medicare: MedicareCardIcon,
  "texas-medicare": TexasIcon,
  "dental-vision": DentalVisionIcon,
  life: LifeHeartIcon,
  "final-expense": FinalExpenseIcon,
  "funeral-plans": FuneralUrnIcon,
  travel: TravelPlaneIcon,
  retirement: RetirementChairIcon,
  mortgage: MortgageHouseIcon,
};
