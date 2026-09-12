import type { Sql } from "@/lib/db";
import { REGION_ROOMS } from "./regions";

export async function seedIfNeeded(sql: Sql): Promise<void> {
  const existing = await sql<{ n: number }>`select count(*)::int as n from news`;
  if ((existing[0]?.n ?? 0) > 0) return;

  await sql`
    insert into news (title, category, source, summary, published_at) values
    (
      'Channel crossings — weekend total 312 across 6 vessels',
      'Crossings',
      'Home Office',
      'Official weekend release: 312 arrivals in 6 small boats. French authorities intercepted 3 vessels. Figures taken from the Home Office daily statistical notice; not seasonally adjusted.',
      now() - interval '5 hours'
    ),
    (
      'FOI: 14 councils spent over £8m on hotel contracts in Q1',
      'Accommodation',
      'FOI / local authorities',
      'Compiled FOI returns show fourteen English local authorities spent a combined £8.1m on contracted hotel rooms in Q1. Highest spenders: Kent, Essex, Lincolnshire. Independent verification against published budgets recommended.',
      now() - interval '11 hours'
    ),
    (
      'ONS: net migration 685,000 in year to December',
      'Statistics',
      'ONS',
      'Office for National Statistics long-term international migration estimate: +685,000. Humanitarian routes and work visas remain the largest inflows. Asylum grants were 68% of Q1 initial decisions per Home Office tables.',
      now() - interval '18 hours'
    ),
    (
      'Wethersfield — variation of conditions lodged on planning portal',
      'Accommodation',
      'Planning portal',
      'A variation of conditions has been submitted for the former RAF Wethersfield site. Public footpath around the perimeter remains open. No decision notice at time of writing.',
      now() - interval '26 hours'
    ),
    (
      'Police.uk extract: incidents within 1 mile of three contracted hotels',
      'Crime',
      'Police.uk',
      'Rolling 90-day open-data extract for three postcodes matching contracted hotels. Category mix is predominantly anti-social behaviour and public order. This is recorded crime, not charged crime. Cross-check against force dashboards before citing.',
      now() - interval '32 hours'
    ),
    (
      'Asylum decision backlog: 89,000 cases awaiting initial decision',
      'Government',
      'Home Office',
      'Latest transparency data: 89,000 cases in the initial-decision queue. Mean wait 61 weeks. The National Audit Office previously flagged cost overruns on accommodation contracts tied to the backlog.',
      now() - interval '40 hours'
    ),
    (
      'Birmingham — police-facilitated counter-demonstration registered',
      'Extremism',
      'West Midlands Police',
      'A counter-demonstration has been registered against a booked speakers event. S14 conditions are expected. Lawful observation only; do not enter private venues. Confirm the force statement before travel.',
      now() - interval '48 hours'
    ),
    (
      'Scampton parish council — public gallery for site handover',
      'Accommodation',
      'Parish council',
      'RAF Scampton handover remains on the parish agenda. Public gallery. Documents on the council site suggest a Q3 window; MOD statement still pending.',
      now() - interval '56 hours'
    ),
    (
      'NAO: asylum accommodation contracts flagged for cost overrun',
      'Government',
      'National Audit Office',
      'Value-for-money briefing notes material cost variance on hotel and large-site contracts. Full report on NAO publications. Treat contractor names as unconfirmed until the published PDF is checked.',
      now() - interval '70 hours'
    ),
    (
      'Dover — RNLI callouts logged against weekend Channel attempts',
      'Crossings',
      'MCA / RNLI',
      'Maritime and Coastguard Agency logs show multiple RNLI launches over the weekend window. Vessel counts should be reconciled to the Home Office statistical notice, not social media tallies.',
      now() - interval '84 hours'
    )
  `;

  for (const room of REGION_ROOMS) {
    await sql`insert into rooms (title, region) values (${room.title}, ${room.region})`;
  }

  const general = await sql<{ id: number }>`select id from rooms where title = 'GENERAL' limit 1`;
  const se = await sql<{ id: number }>`select id from rooms where title = 'SOUTH EAST' limit 1`;
  const gId = general[0]?.id ?? 1;
  const seId = se[0]?.id ?? gId;

  await sql`
    insert into messages (room_id, user_id, username, content_enc, created_at) values
    (${gId}, 'system', 'net_ops', 'Channel is live. Factual, source-attributed posts only. UK law applies in this room.', now() - interval '6 hours'),
    (${gId}, 'system', 'south_desk', 'Reminder: public assembly is subject to S12/S14 conditions. Document, do not disrupt.', now() - interval '4 hours'),
    (${seId}, 'system', 'essex_observer', 'Essex — no activity reported today. Wethersfield planning portal is being watched.', now() - interval '2 hours')
  `;

  await sql`
    insert into events (event_date, type, location, description, status) values
    (
      now() + interval '4 days',
      'Community meeting',
      'Rotherham — Town Hall annex',
      'Public meeting on local accommodation use. Council Q&A. Peaceful attendance only. Check the council site for conditions.',
      'confirmed'
    ),
    (
      now() + interval '26 days',
      'Lawful protest',
      'Dover — seafront (TBC)',
      'Planned lawful protest. Police liaison confirmed. Remain inside the designated area. No face coverings where S14 prohibits them.',
      'reported'
    ),
    (
      now() + interval '50 days',
      'Counter SUTR',
      'London — Whitehall',
      'Counter demonstration opposite a SUTR march. Police facilitation expected. Maintain distance. No engagement.',
      'confirmed'
    ),
    (
      now() + interval '78 days',
      'Counter Islamist extremism',
      'Birmingham — city centre',
      'Response to a booked extremist speakers event. Lawful observation. Do not enter the private venue.',
      'monitoring'
    ),
    (
      now() + interval '120 days',
      'Community meeting',
      'Scampton — village hall',
      'RAF Scampton closure discussion. Parish council. Public gallery.',
      'confirmed'
    ),
    (
      now() - interval '10 days',
      'Community meeting',
      'Essex — closed',
      'Past event retained for audit only. Filtered from the live board.',
      'closed'
    )
  `;

  await sql`
    insert into feeds (source, title, excerpt, url, published_at) values
    (
      'Urban Scoop',
      'Urban Scoop: FOI reveals hotel costs by region',
      'Analysis of FOI data shows regional variation in accommodation contracting. Full breakdown requires ONS cross-reference.',
      '#',
      now() - interval '6 hours'
    ),
    (
      'Urban Scoop',
      'Urban Scoop: crossing data — weekend summary',
      'Weekend total 312 across 6 vessels. French interceptions: 3 vessels. Drawn from official releases, not eyewitness tallies.',
      '#',
      now() - interval '22 hours'
    ),
    (
      'Urban Scoop',
      'Urban Scoop: council tax impact analysis',
      'Local authority spending review identifies accommodation pressure in 12 districts. Source: published council budgets.',
      '#',
      now() - interval '3 days'
    ),
    (
      'UTK',
      'UTK: independent report on Wethersfield site conditions',
      'Footage and notes from the public footpath on the perimeter. Planning conditions reviewed against the portal.',
      '#',
      now() - interval '14 hours'
    ),
    (
      'UTK',
      'UTK: Scampton handover timeline',
      'Documents suggest a Q3 handover. MOD statement still pending confirmation.',
      '#',
      now() - interval '4 days'
    ),
    (
      'Independent',
      'Home Office stats — Q1 asylum decisions',
      'Q1: 12,400 decisions, 68% grant rate. Appeal-rate tables still pending.',
      '#',
      now() - interval '35 hours'
    )
  `;

  await sql`
    insert into cases (title, details, contact, file_name, status, created_at) values
    (
      'Hotel contract — staff accommodation block',
      'Source at a former hotel near Ashford reports the staff block is still in overflow use. Has delivery-log photos. Wants to remain anonymous. Contact via Proton only.',
      'ashford.source@proton.me',
      'delivery-log.jpg',
      'new',
      now() - interval '3 hours'
    ),
    (
      'RAF base — security contractor note',
      'Contractor states perimeter patrols reduced at Wethersfield. No internal documents. Concerned about public safety on the footpath.',
      '',
      '',
      'under_investigation',
      now() - interval '18 hours'
    )
  `;

  const c1 = await sql<{ id: number }>`select id from cases order by id asc limit 1`;
  if (c1[0]) {
    await sql`
      insert into case_log (case_id, actor_id, actor_name, action, note, created_at) values
      (${c1[0].id}, 'system', 'intake', 'submitted', 'Anonymous intake received.', now() - interval '3 hours')
    `;
  }
}
