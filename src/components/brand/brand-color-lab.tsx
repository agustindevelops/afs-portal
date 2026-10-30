"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Copy, Palette, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Temporary: shows the brand color lab while the palette is being finalized. */
export const brandColorLab: boolean = true;

const STORAGE_KEY = "aegis-brand-palette-v2";
const HEX = /^#[0-9a-f]{6}$/i;

const groups = [
  {
    title: "Action",
    tokens: [
      ["role-cta", "Impact / CTA", "Main buttons and key actions"],
      ["role-cta-hover", "CTA hover", "CTA while hovered"],
      ["role-cta-pressed", "CTA pressed", "CTA while pressed"],
      ["role-link", "Link", "Text links and inline actions"],
    ],
  },
  {
    title: "Brand",
    tokens: [
      ["role-primary", "Primary", "Header, footer, dark sections"],
      ["role-primary-soft", "Primary soft", "Middle of dark gradients"],
      ["role-secondary", "Secondary", "Gradient end, icons, focus"],
      ["role-accent", "Accent", "Eyebrows and accents on dark"],
      ["role-accent-strong", "Accent (on light)", "Eyebrows on light backgrounds"],
    ],
  },
  {
    title: "Backgrounds",
    tokens: [
      ["role-background", "Background", "Page background"],
      ["role-background-accent", "Background accent", "Alternate sections and panels"],
      ["role-surface", "Surface", "Cards and forms"],
      ["role-border", "Border", "Card and divider lines"],
      ["role-input-border", "Input border", "Form field outlines"],
    ],
  },
  {
    title: "Text",
    tokens: [
      ["role-text", "Text", "Headings and body on light"],
      ["role-text-muted", "Text muted", "Supporting copy"],
      ["role-text-subtle", "Text subtle", "Hints and captions"],
      ["role-text-on-dark", "Text on dark", "Body copy on dark sections"],
      ["role-text-on-dark-muted", "Text on dark (muted)", "Supporting copy on dark"],
    ],
  },
] as const;

type Token = (typeof groups)[number]["tokens"][number][0];
type ColorMap = Partial<Record<Token, string>>;

const allTokens = groups.flatMap((group) => group.tokens.map(([token]) => token));

function cssVar(token: Token) {
  return `--color-${token}`;
}

function paletteCss(palette: ColorMap) {
  const body = groups
    .map((group) => {
      const lines = group.tokens.map(
        ([token, label]) => `  ${cssVar(token)}: ${palette[token]}; /* ${label} */`,
      );
      return [`  /* ${group.title} */`, ...lines].join("\n");
    })
    .join("\n\n");
  return `@theme static {\n${body}\n}\n`;
}

function applyPalette(palette: ColorMap) {
  const root = document.documentElement;
  for (const token of allTokens) {
    const value = palette[token];
    if (value && HEX.test(value)) root.style.setProperty(cssVar(token), value);
    else root.style.removeProperty(cssVar(token));
  }
}

function readDefaults(): ColorMap {
  if (typeof window === "undefined") return {};
  applyPalette({});
  const styles = getComputedStyle(document.documentElement);
  const base: ColorMap = {};
  for (const token of allTokens) {
    base[token] = expandHex(
      styles.getPropertyValue(cssVar(token)).trim().toLowerCase(),
    );
  }
  return base;
}

/** Fallback for browsers or embedded views that deny the async clipboard API. */
function copyWithTextarea(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

/** The CSS build shortens hex values (#ffffff becomes #fff). */
function expandHex(value: string) {
  const short = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(value);
  return short ? `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}` : value;
}

function readSaved(): ColorMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

/** Initial state differs between server and client, but nothing it drives renders until the panel opens. */
export function BrandColorLabTrigger({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [defaults] = useState(readDefaults);
  const [overrides, setOverrides] = useState(readSaved);
  const [drafts, setDrafts] = useState<ColorMap>({});
  const [copied, setCopied] = useState<"copied" | "failed" | null>(null);
  const [manualCopy, setManualCopy] = useState<string | null>(null);

  useEffect(() => {
    applyPalette(overrides);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      /* ignore storage failures */
    }
  }, [overrides]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function setColor(token: Token, value: string) {
    setDrafts((current) => ({ ...current, [token]: value }));
    if (!HEX.test(value)) return;
    setOverrides((current) => {
      const next = { ...current };
      if (value.toLowerCase() === defaults[token]) delete next[token];
      else next[token] = value.toLowerCase();
      return next;
    });
  }

  function resetColor(token: Token) {
    setDrafts((current) => ({ ...current, [token]: undefined }));
    setOverrides((current) => {
      const next = { ...current };
      delete next[token];
      return next;
    });
  }

  function resetAll() {
    setDrafts({});
    setOverrides({});
  }

  async function copyPalette() {
    const text = paletteCss({ ...defaults, ...overrides });
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      ok = copyWithTextarea(text);
    }
    setCopied(ok ? "copied" : "failed");
    setManualCopy(ok ? null : text);
    if (ok) window.setTimeout(() => setCopied(null), 2000);
  }

  const changedCount = Object.keys(overrides).length;

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={className}
        aria-expanded={open}
        aria-controls="brand-color-lab"
        onClick={() => setOpen((value) => !value)}
      >
        <Palette aria-hidden />
        <span className="sr-only sm:not-sr-only">Test colors</span>
      </Button>

      {open
        ? createPortal(
            <div
              id="brand-color-lab"
              role="dialog"
              aria-label="Test brand colors"
              className="print:hidden fixed top-20 right-4 z-50 flex max-h-[calc(100vh-6rem)] w-[min(100vw-2rem,22rem)] flex-col rounded-2xl border border-border-subtle bg-white text-brand-navy-950 shadow-[0_16px_40px_rgba(3,37,61,0.18)]"
            >
              <div className="flex items-start justify-between gap-3 border-b border-border-subtle p-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-brand-blue-700 uppercase">
                    Brand lab
                  </p>
                  <h2 className="mt-1 text-lg font-semibold">
                    Test brand colors
                  </h2>
                  <p className="mt-1 text-xs text-text-secondary">
                    Changes apply live and are saved in this browser only.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close brand color lab"
                  onClick={() => setOpen(false)}
                >
                  <X />
                </Button>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto p-4">
                {groups.map((group) => (
                  <section key={group.title}>
                    <h3 className="mb-2 text-xs font-semibold tracking-wide text-text-muted uppercase">
                      {group.title}
                    </h3>
                    <ul className="grid gap-2">
                      {group.tokens.map(([token, label, usage]) => {
                        const value = overrides[token] ?? defaults[token] ?? "";
                        const draft = drafts[token] ?? value;
                        const changed = Boolean(overrides[token]);
                        return (
                          <li key={token} className="flex items-center gap-2">
                            <input
                              type="color"
                              aria-label={`${label} color`}
                              value={HEX.test(value) ? value : "#000000"}
                              onChange={(event) =>
                                setColor(token, event.target.value)
                              }
                              className="size-8 shrink-0 cursor-pointer rounded-md border border-border-subtle bg-transparent p-0.5"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">
                                {label}
                              </p>
                              <p className="truncate text-[0.7rem] text-text-muted">
                                {usage}
                              </p>
                            </div>
                            <input
                              aria-label={`${label} hex value`}
                              value={draft}
                              spellCheck={false}
                              onChange={(event) =>
                                setColor(token, event.target.value.trim())
                              }
                              onBlur={() =>
                                setDrafts((current) => ({
                                  ...current,
                                  [token]: undefined,
                                }))
                              }
                              className={cn(
                                "h-8 w-[5.5rem] rounded-md border bg-white px-2 font-mono text-xs outline-none focus-visible:border-brand-blue-600 focus-visible:ring-[3px] focus-visible:ring-brand-gold-200",
                                HEX.test(draft)
                                  ? "border-border-control"
                                  : "border-error",
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-xs"
                              aria-label={`Reset ${label}`}
                              disabled={!changed}
                              onClick={() => resetColor(token)}
                            >
                              <RotateCcw />
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ))}
              </div>

              <div className="flex gap-2 border-t border-border-subtle p-4">
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1"
                  disabled={changedCount === 0}
                  onClick={resetAll}
                >
                  Reset all
                </Button>
                <Button type="button" className="flex-1" onClick={copyPalette}>
                  {copied === "copied" ? (
                    <Check aria-hidden />
                  ) : (
                    <Copy aria-hidden />
                  )}
                  {copied === "copied" ? "Copied" : "Copy colors"}
                </Button>
              </div>
              {manualCopy ? (
                <div className="space-y-2 border-t border-border-subtle p-4">
                  <p className="text-xs text-text-secondary" role="status">
                    This browser blocked the clipboard. The colors are selected
                    below; press Cmd/Ctrl + C to copy them.
                  </p>
                  <textarea
                    readOnly
                    autoFocus
                    wrap="off"
                    aria-label="Palette CSS"
                    value={manualCopy}
                    onFocus={(event) => event.currentTarget.select()}
                    className="h-28 w-full resize-none rounded-md border border-border-control bg-surface-subtle p-2 font-mono text-[0.7rem] outline-none focus-visible:ring-[3px] focus-visible:ring-brand-gold-200"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setManualCopy(null);
                      setCopied(null);
                    }}
                  >
                    Done
                  </Button>
                </div>
              ) : null}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
