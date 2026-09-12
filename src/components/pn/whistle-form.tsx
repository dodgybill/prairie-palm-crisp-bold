import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { submitCase } from "@/lib/pn/api";
import { Btn, Label, Modal } from "./ui";

export function WhistleForm({
  open,
  onClose,
  submitterId,
}: {
  open: boolean;
  onClose: () => void;
  submitterId?: string | null;
}) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [contact, setContact] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);

  function reset() {
    setTitle("");
    setDetails("");
    setContact("");
    setFileName("");
    setFileData(null);
    setConsent(false);
  }

  async function onFile(file?: File) {
    if (!file) {
      setFileName("");
      setFileData(null);
      return;
    }
    if (file.size > 400_000) {
      toast.error("Attachment must be under 400KB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFileName(file.name);
      setFileData(String(reader.result));
    };
    reader.readAsDataURL(file);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!consent) {
      toast.error("Confirm confidentiality understanding");
      return;
    }
    setBusy(true);
    try {
      await submitCase({
        data: {
          title,
          details,
          contact,
          file_name: fileName,
          file_data: fileData,
          submitter_id: submitterId ?? null,
        },
      });
      toast.success("Submission received. Source protection in force.");
      reset();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submit failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Secure whistleblow — confidential"
      accent
      wide
    >
      <div className="bg-bg border border-accent/20 p-4 mb-5">
        <div className="mark text-2xs text-accent mb-2">Confidentiality assurance</div>
        <p className="text-xs leading-relaxed text-fg">
          Treated in the strictest confidence. Visible only to vetted intelligence
          handlers (admin+). Source identity is protected. No disclosure without
          explicit consent. You may remain anonymous.
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label>Title / subject</Label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="field"
            placeholder="Brief title"
          />
        </div>
        <div>
          <Label>Details</Label>
          <textarea
            required
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="area min-h-28"
            placeholder="What you have observed — dates, locations, evidence…"
          />
        </div>
        <div>
          <Label>Contact (optional — Proton / Signal preferred)</Label>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="field"
            placeholder="Leave blank to remain anonymous"
          />
        </div>
        <div>
          <Label>Attach file (optional, under 400KB)</Label>
          <input
            type="file"
            onChange={(e) => void onFile(e.target.files?.[0])}
            className="mt-1 text-2xs font-mono text-subtle w-full"
          />
          {fileName ? (
            <div className="mt-1 text-micro font-mono text-muted">{fileName}</div>
          ) : null}
        </div>
        <label className="flex gap-3 items-start bg-bg border border-line p-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
          />
          <span className="text-2xs leading-relaxed text-muted">
            I understand this is treated in strictest confidence and only visible
            to vetted intelligence handlers. Source protection applies.
          </span>
        </label>
        <div className="flex flex-wrap gap-2 pt-1">
          <Btn type="submit" variant="accent" disabled={busy}>
            {busy ? "Submitting…" : "Submit securely"}
          </Btn>
          <Btn variant="ghost" onClick={onClose}>
            Cancel
          </Btn>
        </div>
      </form>
    </Modal>
  );
}
