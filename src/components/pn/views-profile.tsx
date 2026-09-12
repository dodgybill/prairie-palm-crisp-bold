import { useState } from "react";
import { toast } from "sonner";
import { updateMyProfile } from "@/lib/pn/api";
import { ROLE_LABEL, roleChipClass } from "@/lib/pn/roles";
import { UK_REGIONS } from "@/lib/pn/regions";
import type { Profile } from "@/lib/pn/types";
import { Avatar, Btn, Label } from "./ui";

export function ProfileView({
  me,
  onUpdated,
}: {
  me: Profile;
  onUpdated: (p: Profile) => void;
}) {
  const [display, setDisplay] = useState(me.display_name);
  const [bio, setBio] = useState(me.bio);
  const [contact, setContact] = useState(me.contact);
  const [region, setRegion] = useState(me.region);
  const [x, setX] = useState(me.social_x);
  const [tg, setTg] = useState(me.social_telegram);
  const [avatar, setAvatar] = useState<string | null>(me.avatar);
  const [busy, setBusy] = useState(false);

  function onFile(file?: File) {
    if (!file) return;
    if (file.size > 350_000) {
      toast.error("Image must be under 350KB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const size = 256;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const min = Math.min(img.width, img.height);
        const sx = (img.width - min) / 2;
        const sy = (img.height - min) / 2;
        ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
        setAvatar(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function save() {
    setBusy(true);
    try {
      const next = await updateMyProfile({
        data: {
          display_name: display,
          bio,
          contact,
          region,
          social_x: x,
          social_telegram: tg,
          avatar,
        },
      });
      if (next) {
        onUpdated(next);
        toast.success("Profile saved");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-[380px_1fr] gap-4">
      <div className="bg-surface border border-line p-5">
        <div className="mark text-2xs mb-4">Profile — stored on the desk</div>
        <div className="flex flex-col items-center">
          <Avatar src={avatar} name={display || me.display_name} size="lg" />
          <div className="mt-3 text-sm font-semibold">{display}</div>
          <div className="text-2xs font-mono text-subtle">
            @{me.username} — {ROLE_LABEL[me.role]}
          </div>
          <div className="mt-4 w-full">
            <Label>Avatar</Label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onFile(e.target.files?.[0])}
              className="mt-1 w-full text-micro font-mono text-subtle"
            />
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <div>
            <Label>Display name</Label>
            <input
              value={display}
              onChange={(e) => setDisplay(e.target.value)}
              className="field h-9"
            />
          </div>
          <div>
            <Label>Region</Label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="field h-9"
            >
              <option value="">Unassigned</option>
              {UK_REGIONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Bio</Label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="area min-h-20"
            />
          </div>
          <div>
            <Label>Contact</Label>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="field h-9"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>X / Twitter</Label>
              <input
                value={x}
                onChange={(e) => setX(e.target.value)}
                className="field h-9"
                placeholder="@handle"
              />
            </div>
            <div>
              <Label>Telegram</Label>
              <input
                value={tg}
                onChange={(e) => setTg(e.target.value)}
                className="field h-9"
                placeholder="@handle"
              />
            </div>
          </div>
          <Btn variant="paper" className="w-full mt-2" disabled={busy} onClick={() => void save()}>
            {busy ? "Saving…" : "Save profile"}
          </Btn>
        </div>
      </div>
      <div className="bg-bg border border-line p-5">
        <div className="mark text-2xs text-subtle mb-3">Account details</div>
        <div className="grid gap-3 text-xs font-mono">
          <Row k="Username" v={me.username} />
          <div className="flex justify-between border-b border-surface py-2">
            <span className="text-faint">Role</span>
            <span className={`px-2 py-0.5 text-micro ${roleChipClass(me.role)}`}>
              {ROLE_LABEL[me.role]}
            </span>
          </div>
          <Row k="Region" v={me.region || "—"} />
          <Row k="Status" v={me.status} />
          <Row k="Warnings" v={String(me.warnings)} />
          <Row k="Rooms" v="AES-256-GCM on device" />
        </div>
        <div className="mt-8 p-3 bg-surface border border-line text-2xs leading-relaxed text-muted font-mono">
          Profile data is scoped to your signed-in identity. Avatar is stored as a
          compressed JPEG on the desk. Contact info is visible to enrolled members.
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-surface py-2">
      <span className="text-faint">{k}</span>
      <span className="text-fg">{v}</span>
    </div>
  );
}
