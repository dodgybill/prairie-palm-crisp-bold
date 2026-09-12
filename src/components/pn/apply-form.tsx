import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { submitApplication } from "@/lib/pn/api";
import { UK_REGIONS } from "@/lib/pn/regions";
import type { Profile } from "@/lib/pn/types";
import { Btn, Label } from "./ui";

export function ApplyForm({
  onDone,
}: {
  onDone: (profile: Profile | null) => void;
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("South East");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const profile = await submitApplication({
        data: { name, contact, location, reason },
      });
      toast.success("Application received. Vetting within 24–48h.");
      onDone(profile);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submit failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-lg">
      <p className="text-sm text-muted leading-relaxed">
        Alias permitted. Data is handled confidentially. Senior staff review every
        application. No automatic approval.
      </p>
      <div>
        <Label>Name / alias</Label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="field"
          placeholder="e.g. Essex Observer"
        />
      </div>
      <div>
        <Label>Contact — mobile / Signal</Label>
        <input
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="field"
          placeholder="Number or handle"
        />
      </div>
      <div>
        <Label>Region</Label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="field"
        >
          {UK_REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Reason for joining</Label>
        <textarea
          required
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="area"
          placeholder="What you can contribute — local knowledge, research, logistics…"
        />
      </div>
      <Btn type="submit" variant="paper" disabled={busy}>
        {busy ? "Submitting…" : "Submit application"}
      </Btn>
    </form>
  );
}
