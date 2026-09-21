"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { IntakeWizard } from "@/components/intake/intake-wizard";
import type { IntakeFlowPayload } from "@/lib/intake";

type QuoteDialogContextValue = {
  openQuote: (coverageKey?: string) => void;
  closeQuote: () => void;
};

const QuoteDialogContext = createContext<QuoteDialogContextValue | null>(null);

export function useQuoteDialog() {
  const context = useContext(QuoteDialogContext);
  if (!context) {
    throw new Error("useQuoteDialog must be used within QuoteDialogProvider");
  }
  return context;
}

export function QuoteDialogProvider({
  flow,
  children,
}: {
  flow: IntakeFlowPayload | null;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [coverageKey, setCoverageKey] = useState<string | undefined>();
  const [instance, setInstance] = useState(0);

  const openQuote = useCallback((nextCoverageKey?: string) => {
    setCoverageKey(nextCoverageKey);
    setInstance((value) => value + 1);
    setOpen(true);
  }, []);

  const closeQuote = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ openQuote, closeQuote }),
    [openQuote, closeQuote],
  );

  return (
    <QuoteDialogContext.Provider value={value}>
      {children}
      <Dialog.Root
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
        }}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-brand-navy-950/60 backdrop-blur-[2px]" />
          <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 max-h-[min(90vh,52rem)] w-[min(100%-1.5rem,36rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl outline-none">
            <div className="relative">
              <Dialog.Close
                className="absolute top-4 right-4 z-10 inline-flex size-10 items-center justify-center rounded-lg text-brand-navy-950 hover:bg-white/80 focus-visible:ring-[3px] focus-visible:ring-brand-gold-200 focus-visible:outline-none"
                aria-label="Close quote dialog"
              >
                <X className="size-5" />
              </Dialog.Close>
              <Dialog.Title className="sr-only">Request a free quote</Dialog.Title>
              <Dialog.Description className="sr-only">
                Answer a few questions so we can route your coverage request.
              </Dialog.Description>
              {flow ? (
                <IntakeWizard
                  key={instance}
                  flow={flow}
                  initialCoverageKey={coverageKey}
                  onComplete={closeQuote}
                  reserveCloseSpace
                  className="border-border-subtle shadow-[0_24px_60px_rgba(3,37,61,0.35)]"
                />
              ) : (
                <div className="rounded-2xl bg-white p-8 text-brand-navy-950">
                  <p className="font-medium">Quote form unavailable</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    We could not load the intake questions right now. Please try
                    again shortly.
                  </p>
                </div>
              )}
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </QuoteDialogContext.Provider>
  );
}
