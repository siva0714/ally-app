import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const MEMOS = [
  {
    id: "memo1",
    title: "India-UK Cross-Border Acquisition",
    subtitle: "Arjun Technologies / Meridian SaaS Ltd",
    tag: "M&A",
    client: "Arjun Technologies Limited",
    commandersBrief: {
      decision: "Whether to proceed with the acquisition of Meridian SaaS Ltd and in what sequence — NSI Act clearance must be obtained before closing, ODI/UIN must be filed before remittance, and SEBI disclosure infrastructure must be in place before the board meeting approves the deal.",
      deadline: "Three hard clocks running simultaneously: 30 minutes post-board-meeting for SEBI exchange filing, 24 hours post-signing for Regulation 30 disclosure, and a minimum 8-week buffer required for NSI Act clearance after signing. The board meeting date triggers all three.",
      worstCase: "Completion without NSI Act clearance is a criminal offence under Section 33 of the NSI Act — unlimited fines and up to five years imprisonment for individuals. SEBI non-compliance on the 30-minute disclosure window attracts adjudication proceedings. ODI breach triggers compounding liability under FEMA."
    },
    stakeholders: [
      { id: "ceo", label: "CEO", implicated: true, channel: "email", tier: 1, gcAssessment: "The CEO requires a decision brief. Board approval is needed before the acquisition can proceed. Two conditions precedent must be built into the SPA before signing.", output: { heading: "Acquisition of Meridian SaaS Ltd — Decision Required", body: "External counsel has completed the regulatory risk analysis on the proposed acquisition of Meridian SaaS Ltd (UK) for GBP 4.2 million.\n\nThe deal is legally executable. Two high-priority conditions must be met before we can close. First, UK government clearance under the National Security and Investment Act is mandatory — without it, completion is void and constitutes a criminal offence. We must build a minimum 8-week buffer after signing for this clearance. Second, our SEBI disclosure obligations are live the moment the board approves — exchange filings must go out within 30 minutes of the board meeting concluding. I am coordinating with the Company Secretary to have all filings ready before we sit down.\n\nI recommend we proceed. Board approval is required at the next scheduled meeting. I will circulate the board pack with the full regulatory matrix and SPA conditions precedent in advance." } },
      { id: "cfo", label: "CFO / Finance", implicated: true, channel: "email", tier: 2, gcAssessment: "Finance has three action items: ODI net worth cap verification, contingent liability provisioning, and financial exposure quantification.", output: { heading: "Meridian SaaS Acquisition — Finance Actions and Exposure Flags", body: "External counsel has completed the regulatory analysis. Three items require Finance's immediate attention.\n\n1. ODI Net Worth Cap — Total ODI/OPI commitments must not exceed 400% of net worth under RBI rules. Obtain ODI exposure certificate from AD bank and net worth certificate from statutory auditors before signing.\n\n2. Contingent Liability — Counsel has identified potential regulatory exposure under NSI Act and FEMA if filings are delayed or conditions are breached. Flag as contingent liability in current quarter accounts pending deal closure.\n\n3. Consideration GBP 4.2M — Remittance must flow through banking channels via SWIFT with AD bank certification on closing. Confirm treasury is ready for GBP remittance on closing date.\n\nPlease confirm the ODI exposure certificate can be obtained within 3 weeks. This is on the critical path before signing." } },
      { id: "dealowner", label: "Deal Owner", implicated: true, channel: "email", tier: 2, gcAssessment: "The Deal Owner needs to know that the deal timeline has changed materially due to NSI Act requirements and that two conditions precedent are non-negotiable in the SPA.", output: { heading: "Meridian SaaS — Deal Timeline and SPA Conditions Update", body: "Regulatory analysis is complete. Two things you need to build into the deal structure immediately.\n\nFirst, the SPA must include two conditions precedent to closing — UK NSI Act government approval, and RBI UIN issuance. Neither can be waived. Without NSI Act clearance, completion is a criminal offence.\n\nSecond, the timeline needs a realistic buffer:\n• Sign SPA\n• File NSI Act notification within 5 business days of signing\n• NSI Act review: minimum 8 weeks, potentially longer if national security assessment is triggered\n• Only then can we close\n\nDo not commit to a closing date without building this buffer in. Any long-stop date in the SPA should be set at a minimum of 14 weeks from signing. If the Seller is pushing for a shorter timeline, flag to me immediately." } },
      { id: "hr", label: "HR / People", implicated: true, channel: "slack", tier: 2, gcAssessment: "HR needs to audit Meridian's employment contracts for change-of-control triggers and begin planning for post-acquisition retention of key personnel.", output: { heading: "Meridian SaaS Acquisition — HR Actions", body: "Why this matters to HR: We are acquiring Meridian SaaS Ltd via a share purchase. Their employees stay employed by Meridian post-closing — TUPE does not directly apply to the ownership change itself. But there are employment contract risks we need to assess now.\n\nYour actions before signing:\n• Review all Meridian senior employee contracts for change-of-control clauses — these may entitle key staff to treat the acquisition as a constructive dismissal trigger\n• Identify the top 5–10 critical personnel whose departure post-closing would materially affect deal value\n• Advise on retention budget — we will likely need retention arrangements for critical personnel as a deal cost\n• Check if any Meridian employee is on a PIP or in an active disciplinary process — these become our liability on closing\n\nPost-closing:\n• If we plan any redundancies, we must comply with UK statutory collective consultation obligations if 20+ employees are affected\n\nOwner: HR Director | Deadline: Assessment to Legal before SPA signing" } },
      { id: "technology", label: "Technology / CTO", implicated: true, channel: "slack", tier: 2, gcAssessment: "Technology needs to assess Meridian's data architecture for UK GDPR compliance and plan the post-closing data governance integration within 90 days.", output: { heading: "Meridian SaaS Acquisition — Technology & Data Actions", body: "The data problem: Meridian SaaS processes personal data of UK and EU customers under UK GDPR. When we acquire them, we become the ultimate controller. Two things could go wrong: their customer contracts may restrict transfer of data outside the UK, and their data processing systems may not be compatible with our Indian infrastructure.\n\nYour actions before signing:\n• Commission a data mapping exercise — what personal data does Meridian hold, in what systems, and where is it stored?\n• Review Meridian's customer contracts for data residency and transfer restrictions\n• Assess feasibility of post-closing data integration with our systems without triggering those restrictions\n• Confirm whether Meridian holds any special category data — higher compliance bar applies\n\nPost-closing — 90-day obligation:\n• Implement a post-closing data governance integration plan aligned to UK GDPR\n• Ensure any data transfer to India uses an approved mechanism — Standard Contractual Clauses or adequacy reliance\n\nOwner: CTO + Data Protection Officer | Deadline: Feasibility report to Legal before SPA signing" } },
      { id: "ir", label: "Investor Relations", implicated: true, channel: "email", tier: 2, gcAssessment: "IR must prepare exchange filing drafts and investor communications in advance of the board meeting — the 30-minute SEBI window leaves no room for drafting on the day.", output: { heading: "Meridian SaaS Acquisition — SEBI Disclosure Preparation", body: "The acquisition triggers mandatory SEBI disclosure obligations under the LODR Regulations. IR must prepare all filings and communications before the board meeting date is set — not after.\n\n• Board meeting notice — 2 working days before: Intimation of agenda to BSE/NSE — draft now\n• Board resolution — Within 30 minutes of conclusion: Corporate action filing via XBRL/BSE portal — draft and pre-load now\n• SPA signing — Within 24 hours: Regulation 30 material event disclosure — draft now\n• NSI Act approval received — Within 24 hours: Update on material event — prepare template\n• Closing — Within 24 hours: Final material event update — prepare template\n\nThe 30-minute post-board-meeting window is the most critical. Exchange filing infrastructure must be live and ready before the board sits down.\n\nPlease also prepare a press release and investor Q&A document for release simultaneously with the Regulation 30 filing on signing." } },
      { id: "compliance", label: "Compliance / Co. Sec.", implicated: true, channel: "slack", tier: 2, gcAssessment: "Company Secretary has the most operationally complex role — UPSI window, RPT analysis, board meeting coordination, and exchange filing execution all land here.", output: { heading: "Meridian SaaS Acquisition — Compliance & Secretarial Actions", body: "UPSI Trading Window — activate immediately:\n• The acquisition constitutes UPSI under SEBI PIT Regulations 2015\n• Trading window must be closed now for all persons briefed on the acquisition\n• Maintain a digital paper trail of who was briefed and when\n• Pre-clearance logs must be maintained until public disclosure is made\n\nRPT check — before board meeting:\n• Check whether any director, promoter, or KMP of Arjun Technologies has any interest in Meridian SaaS Ltd\n• If RPT confirmed: audit committee approval required + possible shareholder approval if material\n• Confirm RPT status with me before the board pack is circulated\n\nBoard meeting preparation:\n• Schedule a dedicated board meeting for acquisition approval\n• Prepare all exchange filing drafts in advance\n• Ensure BSE/NSE XBRL filing portal access is live and tested before the meeting\n• 30-minute clock starts the moment the meeting concludes — zero margin for technical issues\n\nOwner: Company Secretary | UPSI window: immediate. RPT analysis: before board pack circulation." } },
      { id: "board", label: "Board", implicated: true, channel: "email", tier: 1, gcAssessment: "The Board must formally approve the acquisition. Two material risks require board-level awareness before the vote.", output: { heading: "Proposed Acquisition of Meridian SaaS Ltd — Board Risk Assessment", body: "Matter: Proposed acquisition of Meridian SaaS Ltd (UK) | Consideration: GBP 4,200,000\nRecommendation: Proceed, subject to conditions below.\n\nMaterial Risks for Board Awareness:\n\n• UK National Security & Investment Act — HIGH: Mandatory government prior approval required. Completion without clearance is void and constitutes a criminal offence. SPA must include NSI Act approval as a condition precedent. Minimum 8-week review period.\n\n• SEBI Disclosure — 30-minute window — HIGH: Exchange filing must be made within 30 minutes of this board resolution. Filing infrastructure must be confirmed operational before this meeting commences.\n\n• FEMA/ODI — Net worth cap — MEDIUM: RBI 400% net worth cap on ODI commitments must be verified before signing.\n\n• UK GDPR — Customer data restrictions — MEDIUM: Meridian's enterprise customer contracts may contain data residency restrictions that limit post-acquisition integration.\n\n• Employment — Change of control — MEDIUM: Key technical and sales personnel may have change-of-control provisions in their contracts.\n\nConditions Precedent: The SPA will include two non-waivable conditions precedent to closing: (1) NSI Act government approval; (2) RBI UIN issuance.\n\nRelated Party Transaction Status: To be confirmed by Company Secretary before this meeting.\nUPSI Status: Trading window is currently closed for all persons in receipt of this communication." } },
      { id: "auditcommittee", label: "Audit Committee", implicated: true, channel: "email", tier: 2, gcAssessment: "The Audit Committee needs to consider RPT status and financial risk provisioning. Their sign-off may be required before the board votes if an RPT is confirmed.", output: { heading: "Meridian SaaS Acquisition — Audit Committee Note", body: "This note is provided to the Audit Committee in advance of the board meeting to approve the proposed acquisition of Meridian SaaS Ltd.\n\nRelated Party Transaction Analysis: The Company Secretary is confirming whether any director, promoter, or KMP of Arjun Technologies has any interest in Meridian SaaS Ltd. If an RPT is confirmed, Audit Committee approval is required as a prerequisite to the board vote under Regulation 23 of the LODR Regulations.\n\nFinancial Risk Flags for Audit Committee Awareness:\n\n• NSI Act compliance cost — estimated GBP 15,000–30,000 — Deal cost, expense immediately\n• Contingent regulatory liability — FEMA compounding if ODI cap breach confirmed — Flag in notes to accounts\n• UK GDPR remediation — Technology cost TBD — Capital expenditure, to be quantified by CTO\n• Key personnel retention — Retention arrangements — Deal cost, to be budgeted by HR\n\nAudit Committee's Immediate Action: Confirm RPT status with Company Secretary. If RPT confirmed, convene Audit Committee meeting before board meeting date." } },
      { id: "marketing", label: "Marketing & Comms", implicated: false, channel: "slack", tier: 3, gcAssessment: "Marketing & Communications has no required inputs or actions under this memo.", output: { heading: "Meridian SaaS Acquisition — Marketing & Communications", body: "Based on this memo, Marketing & Communications has no required inputs or actions at this stage. The regulatory analysis does not engage any disclosure restrictions, public communications obligations, or brand considerations that require Marketing's involvement. No communication to Marketing & Communications is necessary at this time.\n\nNote: Once the Regulation 30 SEBI disclosure is filed on signing, a press release will be issued by IR. Marketing may be looped in at that stage for brand and communications alignment." } },
      { id: "procurement", label: "Procurement", implicated: false, channel: "slack", tier: 3, gcAssessment: "Procurement has no required inputs or actions under this memo.", output: { heading: "Meridian SaaS Acquisition — Procurement", body: "Based on this memo, Procurement has no required inputs or actions at this stage. The acquisition is structured as a share purchase — the Target's existing vendor and supplier contracts transfer by operation of law with no novation or consent obligations that require Procurement's involvement at this point. No communication to Procurement is necessary." } },
      { id: "tax", label: "Tax", implicated: false, channel: "email", tier: 3, gcAssessment: "Tax has no required inputs or actions under this memo. Note that this memo explicitly does not cover tax advice — a separate tax due diligence exercise is needed.", output: { heading: "Meridian SaaS Acquisition — Tax", body: "Based on this memo, Tax has no required inputs or actions arising from the regulatory risk analysis at this stage.\n\nImportant note for the record: Counsel has explicitly flagged that this regulatory memo does not constitute tax advice — direct tax, indirect tax, or withholding tax implications of the acquisition have not been addressed. A separate tax due diligence exercise should be commissioned from tax advisers running parallel to the regulatory workstream. Please confirm whether this has been initiated and flag to me if not." } },
    ]
  },
  {
    id: "memo2",
    title: "Cloud Vendor Contract Review",
    subtitle: "Harwick Group Ltd — GDPR & Auto-Renewal Risk",
    tag: "Compliance",
    client: "Harwick Group Ltd",
    commandersBrief: {
      decision: "No board or executive decision required. This is an operational compliance matter. The GC must coordinate immediate action across Procurement, Technology, HR and Legal to remediate seven non-compliant vendor contracts and address four imminent auto-renewal windows — one of which expires in 19 days.",
      deadline: "CloudBase Pro non-renewal notice must be served by 3 June 2026 — 19 days from today. Sub-processor disclosure requests must be issued within 7 days. DPA remediation requests must go out within 14 days. All auto-renewal dates must be logged in the contract management system immediately.",
      worstCase: "Failure to serve CloudBase Pro notice by 3 June 2026 locks Harwick into a further 24-month commitment at GBP 186,000 per annum. Continued processing of employee health data under an expired DPA is a live UK GDPR Article 9 breach. The SupportDesk Cloud offshore processing arrangement is a live Article 28 breach — if a data incident occurs, Harwick bears full regulatory liability."
    },
    stakeholders: [
      { id: "ceo", label: "CEO", implicated: false, channel: "email", tier: 1, gcAssessment: "The CEO is not required to take any action on this matter. However, given the live GDPR breach and financial exposure on the CloudBase Pro auto-renewal, an awareness note is appropriate.", output: { heading: "For Awareness — Vendor Contract Compliance Review", body: "This is for your awareness only. No action is required from you at this stage.\n\nExternal counsel has completed a review of our cloud infrastructure vendor contracts. The review has identified a number of operational compliance issues being managed by Procurement, Technology, HR and Legal. The key items you should be aware of:\n\nFirst, we have a 19-day window to serve notice on our CloudBase Pro hosting contract. If we miss that window, we are automatically locked into a further 24-month commitment worth GBP 186,000 per annum. Technology is assessing whether to renew or replace. I will update you on the outcome.\n\nSecond, several vendor contracts do not have compliant data processing agreements in place under UK GDPR. One of these involves our HR Portal, which is processing employee health data without a valid agreement — this is a live compliance breach that we are remediating urgently.\n\nNo board decision or executive sign-off is required. I am managing this operationally and will flag to you immediately if the situation escalates." } },
      { id: "cfo", label: "CFO / Finance", implicated: false, channel: "email", tier: 3, gcAssessment: "CFO has no required inputs or actions under this memo. There is a potential financial exposure note worth flagging — the CloudBase Pro auto-renewal risk.", output: { heading: "Harwick Vendor Review — CFO", body: "Based on this memo, Finance has no required inputs or actions at this stage. This is an operational procurement and compliance matter being managed by Procurement, Technology, HR and Legal.\n\nOne financial exposure note for awareness: if Procurement does not serve non-renewal notice on CloudBase Pro by 3 June 2026, Harwick will be automatically committed to a further 24-month term at GBP 186,000 per annum. Procurement is managing this and I will confirm the outcome by 30 May 2026. No Finance action is needed unless I advise otherwise." } },
      { id: "dealowner", label: "Deal Owner", implicated: false, channel: "email", tier: 3, gcAssessment: "Deal Owner has no required inputs or actions under this memo. This is not a transaction matter.", output: { heading: "Harwick Vendor Review — Deal Owner", body: "Based on this memo, the Deal Owner has no required inputs or actions at this stage. This is an internal vendor contract compliance matter with no transaction or commercial negotiation dimension requiring Deal Owner involvement. No communication necessary." } },
      { id: "hr", label: "HR / People", implicated: true, channel: "slack", tier: 2, gcAssessment: "HR has two urgent actions — confirming special category data held by the HR Portal vendor and supporting the DPA renewal process. The expired DPA is a live GDPR breach.", output: { heading: "Vendor Contract Review — HR Actions Required", body: "The issue: Our HR Portal vendor is processing employee personal data — including health data, salary records, performance records and disciplinary records — under a DPA that expired in March 2024. This is a live UK GDPR breach. Health data is special category data under Article 9 and carries higher ICO enforcement risk.\n\nYour actions — this week:\n• Contact the HR Portal vendor and request a full list of all personal data categories they currently hold on our employees\n• Confirm whether any health data, occupational health referrals or reasonable adjustment records are held by the vendor\n• Flag to Legal immediately if the vendor is unresponsive\n\nWhat Legal is doing in parallel:\n• Issuing an urgent DPA renewal request to the HR Portal vendor with a 14-day deadline\n• If the vendor does not respond within 14 days, we will begin a vendor replacement assessment — HR should begin identifying alternative HR systems as a contingency\n\nAlso be aware: Employees have the right to make Subject Access Requests for their personal data. If any SAR comes in relating to HR Portal data before the DPA is renewed, escalate to Legal immediately.\n\nOwner: HR Director | Deadline: Data category confirmation to Legal by 22 May 2026" } },
      { id: "technology", label: "Technology / CTO", implicated: true, channel: "slack", tier: 2, gcAssessment: "Technology is the most operationally critical stakeholder in this memo. The CloudBase Pro renewal decision, SupportDesk Cloud suspension assessment, and data portability review all require CTO input urgently.", output: { heading: "Vendor Contract Review — Technology Actions Required", body: "Most urgent — CloudBase Pro (19-day window):\n• We must serve non-renewal notice on CloudBase Pro by 3 June 2026 or we are locked in for a further 24 months at GBP 186,000 per annum\n• Technology needs to decide: renew CloudBase Pro or begin migration to an alternative provider?\n• Communicate your decision to Legal by 30 May 2026 — no later\n\nSupportDesk Cloud — possible suspension:\n• SupportDesk Cloud is a reseller of an offshore Philippine ticketing platform processing our customer support data without our knowledge or a compliant sub-processor agreement\n• This is a live GDPR breach. Legal is issuing a disclosure request within 7 days\n• Assess whether SupportDesk Cloud can be suspended or its data isolated pending their response\n\nSub-processor issues:\n• CloudBase Pro is using three unnamed US-based sub-processors — we have not authorised these\n• MailStream UK is using a US-based delivery infrastructure provider with no confirmed transfer mechanism\n\nData portability audit:\n• Four vendors have no express data return obligation on termination — Harwick HR Portal and SupportDesk Cloud are HIGH risk\n• Assess practical data extraction feasibility from each HIGH-rated vendor before their next renewal date\n\nOwner: CTO + Head of IT | CloudBase Pro decision: 30 May 2026 | SupportDesk assessment: 22 May 2026" } },
      { id: "ir", label: "Investor Relations", implicated: false, channel: "email", tier: 3, gcAssessment: "Investor Relations has no required inputs or actions under this memo.", output: { heading: "Harwick Vendor Review — Investor Relations", body: "Based on this memo, Investor Relations has no required inputs or actions at this stage. This is an internal operational compliance matter with no market disclosure, shareholder communication or investor relations dimension. No communication to IR is necessary." } },
      { id: "compliance", label: "Compliance / Co. Sec.", implicated: true, channel: "slack", tier: 2, gcAssessment: "Compliance is the coordinating owner for the DPA remediation programme and must track all vendor responses and deadlines across the remediation plan.", output: { heading: "Vendor Contract Review — Compliance Actions Required", body: "Your role in this remediation: Compliance owns the DPA remediation programme. Legal is issuing the formal requests — you are tracking responses, chasing overdue vendors, and escalating non-responders.\n\nDPA remediation requests — 5 vendors (issue by 29 May 2026):\n• CloudBase Pro — pre-2021 DPA, does not reference UK GDPR\n• SalesForce CRM reseller — no standalone DPA\n• Harwick HR Portal — DPA expired March 2024 (priority — special category data)\n• MailStream UK — no DPA, vendor claiming T&Cs are sufficient (they are not)\n• SupportDesk Cloud — no DPA, vendor offshore\n\nSub-processor disclosure requests — 3 vendors (issue by 22 May 2026):\n• CloudBase Pro — unnamed US sub-processors\n• SupportDesk Cloud — offshore Philippine platform\n• MailStream UK — US delivery infrastructure, no transfer mechanism confirmed\n\nTracking: Log all vendor responses with dates received. Any vendor that does not respond within 14 days to be escalated to Legal for contract termination assessment.\n\nOngoing: Enter all auto-renewal dates into the contract management system by 22 May 2026.\n\nOwner: Head of Compliance | Remediation tracker live by: 22 May 2026" } },
      { id: "board", label: "Board", implicated: false, channel: "email", tier: 1, gcAssessment: "The Board is not required to take any action. However given the live GDPR breach, a brief awareness note is appropriate.", output: { heading: "For Awareness — Vendor Contract Compliance Review", body: "This is for your awareness only. No board decision or action is required.\n\nWe have conducted a review of our cloud infrastructure and SaaS vendor contracts against our UK GDPR obligations. The review has identified a number of operational compliance gaps being managed by our internal teams under Legal's coordination.\n\nTwo items of which the Board should be aware:\n\nFirst, our HR Portal vendor is currently processing employee health data under a data processing agreement that expired in March 2024. This is a breach of UK GDPR Article 9. We are issuing an urgent remediation request to the vendor with a 14-day deadline. If the vendor does not cooperate, we will initiate a vendor replacement process.\n\nSecond, we have identified an offshore sub-processor arrangement through our customer support ticketing vendor that we were not aware of and had not authorised. This is also a live GDPR breach. We are issuing a formal disclosure request and assessing whether the vendor relationship needs to be suspended.\n\nBoth matters are being managed operationally. I will update the Board if either situation escalates. No action needed from the Board at this stage." } },
      { id: "auditcommittee", label: "Audit Committee", implicated: false, channel: "email", tier: 3, gcAssessment: "The Audit Committee has no required inputs or actions under this memo.", output: { heading: "Harwick Vendor Review — Audit Committee", body: "Based on this memo, the Audit Committee has no required inputs or actions at this stage. The vendor contract compliance review is an operational matter being managed by Procurement, Technology, HR and Legal. It does not currently reach the threshold for Audit Committee involvement.\n\nFor the record: the potential financial exposure from the CloudBase Pro auto-renewal (GBP 186,000 per annum for 24 months if notice is missed) has been flagged to Finance for monitoring. No action required at this stage." } },
      { id: "marketing", label: "Marketing & Comms", implicated: false, channel: "slack", tier: 3, gcAssessment: "Marketing & Communications has no required inputs or actions under this memo.", output: { heading: "Harwick Vendor Review — Marketing & Communications", body: "Based on this memo, Marketing & Communications has no required inputs or actions at this stage. The vendor contract compliance review does not engage any public communications, brand or marketing obligations.\n\nNote: MailStream UK — the marketing email platform — is one of the non-compliant vendors being remediated for a missing DPA. This does not require any action from Marketing at this point, but if the vendor relationship is terminated as a result of remediation failure, Marketing will need to be looped in to identify an alternative email platform. I will flag if that becomes necessary." } },
      { id: "procurement", label: "Procurement", implicated: true, channel: "slack", tier: 2, gcAssessment: "Procurement is the primary operational owner of this entire remediation. The CloudBase Pro renewal decision, vendor DPA chase, auto-renewal calendar, and future contract template obligations all sit here.", output: { heading: "Vendor Contract Review — Procurement Actions Required", body: "This is your workstream. Here is the full action list.\n\nCRITICAL — CloudBase Pro (deadline: 30 May 2026):\n• Non-renewal notice must be served by 3 June 2026 or we auto-renew for 24 months at GBP 186,000 per annum\n• Convene an emergency meeting with Technology this week to decide: renew or replace?\n• Communicate the decision to Legal by 30 May 2026 so notice can be drafted and served in time\n\nHIGH — DPA remediation requests (deadline: 29 May 2026):\n• Issue DPA remediation requests to: CloudBase Pro, SalesForce CRM reseller, Harwick HR Portal, MailStream UK, SupportDesk Cloud\n• Legal will provide the DPA request letters — Procurement to send and track responses\n• Vendors who do not respond within 14 days to be escalated to Legal for termination assessment\n\nHIGH — Auto-renewal calendar (deadline: 22 May 2026):\n• Enter all auto-renewal dates and notice deadlines into the contract management system immediately\n• Four contracts have imminent windows — CloudBase Pro (19 days), SupportDesk Cloud (48 days), SalesForce CRM (79 days), MailStream UK (139 days)\n\nMEDIUM — Future contract template (deadline: 12 June 2026):\n• Legal will draft standard data return and sub-processor disclosure clauses by 12 June 2026\n• These must be included as non-negotiable standard terms in all future and renewed vendor contracts\n\nOwner: Head of Procurement" } },
      { id: "tax", label: "Tax", implicated: false, channel: "email", tier: 3, gcAssessment: "Tax has no required inputs or actions under this memo.", output: { heading: "Harwick Vendor Review — Tax", body: "Based on this memo, Tax has no required inputs or actions at this stage. The vendor contract compliance review is a GDPR and procurement matter with no direct tax implications. No communication to Tax is necessary." } },
    ]
  },
  {
    id: "memo3",
    title: "Multi-Jurisdiction Influencer Compliance",
    subtitle: "Velvet Collective Agency Ltd — Ten Countries",
    tag: "Regulatory",
    client: "Velvet Collective Agency Ltd",
    commandersBrief: {
      decision: "Whether the agency has the compliance infrastructure in place to operate a ten-country influencer roster legally. The answer is currently no across multiple jurisdictions. Three workstreams need to start immediately: an FTC warning letter audit across the full roster, a minor influencer compliance audit across France, US, Germany and UAE, and a UAE NMC licence check for all UAE-resident creators.",
      deadline: "No single hard deadline — but the risk is live and continuous. Every piece of sponsored content published without correct jurisdiction-specific disclosure is a potential violation. The FTC audit and UAE licence check should be completed before the next brand campaign activates. The minor influencer audit is urgent — France can trigger platform takedowns without warning.",
      worstCase: "France can force platform removal of content by minor Influencers without warning if trust account and consent requirements are not met. FTC civil penalties of up to USD 51,744 per violation apply to any Influencer who has previously received an FTC warning letter. UAE operation without an NMC Influencer Licence is a criminal offence — fines from AED 5,000 to AED 20,000 per violation with custodial risk for repeat offences."
    },
    stakeholders: [
      { id: "ceo", label: "CEO", implicated: true, channel: "email", tier: 1, gcAssessment: "The CEO needs a decision brief. The agency is currently operating with material compliance gaps across ten jurisdictions. Three areas carry criminal or platform-level enforcement risk. Executive awareness and resource sign-off is needed.", output: { heading: "Influencer Compliance Review — Executive Summary and Decision Required", body: "External counsel has completed a regulatory review of our ten-jurisdiction influencer representation framework. The short version: we have real exposure in three areas that require immediate resource and attention.\n\nFirst, our UAE-resident creators may be operating without an NMC Influencer Licence. Operating commercially in the UAE without this licence is a criminal offence. I need authority to commission an immediate licence audit of all UAE-resident talent and budget to obtain licences where missing.\n\nSecond, we have minor influencers on the roster. France's 2020 legislation allows platforms to remove content by minor influencers without warning if trust account and consent requirements are not met. I need HR and Legal to conduct a minor compliance audit before the next campaign activates.\n\nThird, our standard Influencer contracts do not currently include binding disclosure compliance obligations with agency indemnities. This means if an Influencer publishes non-compliant sponsored content, the agency has no contractual protection. I need authority to update all standard contract templates immediately.\n\nNone of this requires board approval. But it does require your sign-off on the compliance budget and the instruction to Marketing to pause any new UAE or minor influencer campaign activations until audits are complete. I recommend we move on all three this week." } },
      { id: "cfo", label: "CFO / Finance", implicated: true, channel: "email", tier: 2, gcAssessment: "Finance has a specific and overlooked exposure — gifted product arrangements may constitute taxable benefits in kind, triggering retrospective PAYE liability.", output: { heading: "Influencer Compliance Review — Finance Exposure Flags", body: "External counsel has identified a tax compliance issue that sits squarely with Finance and requires immediate attention.\n\nGifted Product — PAYE Exposure: HMRC's position is that gifted products provided to UK-resident Influencers in exchange for content are taxable benefits in kind. Where Velvet arranges these gifts through its commercial contracts, the Agency may have PAYE reporting obligations on the value of gifts. Action: Audit all gifted product arrangements for UK-resident Influencers. Quantify the cumulative value of gifts arranged in the last three tax years. Assess PAYE exposure and whether a voluntary disclosure to HMRC is appropriate.\n\nIR35 — PSC Arrangements: Where UK-based Influencers operate through personal service companies, IR35 off-payroll working rules may apply if Velvet is deemed an end-client. Action: Obtain CEST determinations for all UK PSC-structured Influencers.\n\nAppearance Fee Withholding: Appearance fees paid to Influencers in non-UK jurisdictions may attract local withholding tax obligations on Velvet as the paying entity. Action: Tax counsel to confirm withholding position in each of the ten jurisdictions before next payment cycle.\n\nThe gifted product audit is the most time-sensitive. Please initiate within the next two weeks." } },
      { id: "dealowner", label: "Deal Owner", implicated: false, channel: "email", tier: 3, gcAssessment: "Deal Owner has no required inputs or actions under this memo.", output: { heading: "Velvet Collective Compliance Review — Deal Owner", body: "Based on this memo, the Deal Owner has no required inputs or actions at this stage. The influencer regulatory compliance review is an operational matter with no transaction, acquisition or commercial negotiation dimension requiring Deal Owner involvement. No communication necessary." } },
      { id: "hr", label: "HR / People", implicated: true, channel: "slack", tier: 2, gcAssessment: "HR must lead the minor influencer compliance audit and manage the employment classification review across the roster. Both are urgent.", output: { heading: "Influencer Compliance Review — HR Actions Required", body: "Minor influencer audit — urgent:\n• Identify every Influencer on the Velvet roster who is under 18 years of age\n• For each minor, confirm which jurisdictions they operate in and which brands they are activated with\n• France: under the 2020 Loi enfants influenceurs, all commercial content by minors requires a trust account and documented parental consent. Platforms can remove content without warning if non-compliant\n• Germany: all commercial activities by minors require parental consent — confirm this is documented for all German-resident minors\n• UAE: content involving minors requires additional NMC approval — flag any UAE-facing minor content to Legal immediately\n• US: confirm whether any minor Influencer is California-resident — Coogan Law requires 15% of earnings to be held in a blocked trust account\n\nEmployment classification review:\n• Review all UK-resident Influencer arrangements for employment vs worker vs self-employed classification\n• Key tests: does Velvet control working hours? Equipment? Is there exclusivity? If yes to any, worker or employee status is likely\n• Misclassification exposes Velvet to retrospective NIC liability, holiday pay claims and Employment Tribunal proceedings\n\nOwner: HR Director | Minor audit completion: before next campaign activation | Classification review: within 30 days" } },
      { id: "technology", label: "Technology / CTO", implicated: true, channel: "slack", tier: 2, gcAssessment: "Technology must implement the ten-jurisdiction data governance framework and build the compliance infrastructure for cross-border audience data transfers.", output: { heading: "Influencer Compliance Review — Technology Actions Required", body: "The data problem: Velvet collects and processes significant audience analytics data across ten jurisdictions — follower demographics, engagement metrics, brand partnership performance data. Each jurisdiction has its own data protection framework.\n\nWhat we need from Technology:\n\nData governance framework — ten jurisdictions:\n• Build or implement jurisdiction-specific privacy notices for each of the ten operating countries\n• Implement data processor agreements with all brand partners who receive audience analytics data\n• Establish a cross-border transfer mechanism for audience data shared between jurisdictions\n• Build a data subject rights response procedure covering all ten frameworks\n\nPlatform data access audit:\n• Document what personal data Velvet receives from Instagram, TikTok and YouTube APIs\n• Confirm what data is stored, where, and for how long\n• Assess whether any data received from platform APIs includes data of minors\n\nCompliance monitoring:\n• Build or source a platform policy change monitoring tool — platform terms of service change frequently and without notice\n\nOwner: CTO + Data Protection Officer | Data governance framework: within 60 days | Platform data audit: within 30 days" } },
      { id: "ir", label: "Investor Relations", implicated: false, channel: "email", tier: 3, gcAssessment: "Investor Relations has no required inputs or actions under this memo.", output: { heading: "Velvet Collective Compliance Review — Investor Relations", body: "Based on this memo, Investor Relations has no required inputs or actions at this stage. The influencer regulatory compliance review is an operational matter with no market disclosure or investor relations dimension. No communication to IR is necessary." } },
      { id: "compliance", label: "Compliance / Co. Sec.", implicated: true, channel: "slack", tier: 2, gcAssessment: "Compliance owns the FTC warning letter audit, the UAE NMC licence check, and the disclosure compliance monitoring programme across all ten jurisdictions.", output: { heading: "Influencer Compliance Review — Compliance Actions Required", body: "FTC warning letter audit — full roster (US):\n• Pull the full Velvet roster and check every Influencer against the FTC's published list of warning letter recipients\n• Any Influencer who has previously received an FTC warning letter — any future non-disclosure may attract civil penalties of up to USD 51,744 per violation\n• Flag all identified Influencers to Legal immediately\n• Complete before the next US brand campaign activates\n\nUAE NMC Influencer Licence audit:\n• Identify all UAE-resident Influencers on the Velvet roster\n• Confirm whether each holds a valid NMC electronic media licence\n• Operating commercially in the UAE without a licence is a criminal offence — fines from AED 5,000 to AED 20,000 per violation; custodial risk for repeat offences\n• Any unlicensed UAE-resident Influencer must be suspended from UAE-facing brand activations until licence is obtained\n\nJurisdiction-specific disclosure checklist:\n• UK: #ad at the start of post\n• US: FTC clear and conspicuous; platform Paid Partnership label acceptable\n• France: #Publicite or #Collaboration — criminal liability for non-disclosure up to EUR 300,000\n• Germany: #Werbung required\n• UAE: NMC licence + category-specific prior approval\n• Australia: Australian Influencer Marketing Code 2021\n• India: ASCI #Ad label mandatory\n• Japan: stealth marketing prohibited since October 2023\n• Brazil: disclosure of paid relationships required\n• Canada: Ad Standards Canada + provincial consumer protection overlay\n\nOwner: Head of Compliance | FTC audit and UAE licence check: before next campaign activation | Disclosure checklist live: within 14 days" } },
      { id: "board", label: "Board", implicated: true, channel: "email", tier: 1, gcAssessment: "The Board should be aware of the criminal exposure in UAE and the France minor influencer risk. No board decision required but awareness is appropriate given the severity of the enforcement consequences.", output: { heading: "Influencer Compliance Review — Board Awareness Note", body: "This note is for your awareness. No board decision or action is required at this stage.\n\nWe have completed a regulatory review of our ten-jurisdiction influencer representation framework. The review has identified compliance gaps that are being managed operationally. Two items warrant board awareness given their potential severity.\n\nFirst, UAE criminal exposure. Any Velvet-represented Influencer who is UAE-resident and operating commercially without an NMC Influencer Licence is committing a criminal offence under UAE law. We are conducting an immediate licence audit of all UAE-resident talent. Any unlicensed Influencer has been suspended from UAE-facing brand activations pending the audit outcome.\n\nSecond, minor influencer risk in France. French law allows platforms to remove content by minor Influencers without warning where trust account and parental consent requirements are not met. We are conducting an urgent audit of all minor Influencer arrangements. No new minor Influencer content is being activated until the audit is complete.\n\nBoth matters are being managed under my oversight. I will update the Board if either situation results in a regulatory investigation, enforcement action, or material financial exposure. No board action is needed at this time." } },
      { id: "auditcommittee", label: "Audit Committee", implicated: false, channel: "email", tier: 3, gcAssessment: "The Audit Committee has no required inputs or actions under this memo.", output: { heading: "Velvet Collective Compliance Review — Audit Committee", body: "Based on this memo, the Audit Committee has no required inputs or actions at this stage. The influencer regulatory compliance review is an operational matter being managed by Compliance, HR, Marketing and Legal. It does not currently reach the threshold for Audit Committee involvement.\n\nFor the record: a potential PAYE exposure from gifted product arrangements has been flagged to Finance for audit. If the audit reveals material retrospective liability, the Audit Committee will be notified. No action required at this stage." } },
      { id: "marketing", label: "Marketing & Comms", implicated: true, channel: "slack", tier: 2, gcAssessment: "Marketing owns the pre-publication compliance gate and must implement the jurisdiction-specific disclosure checklist as a mandatory step before any content goes live.", output: { heading: "Influencer Compliance Review — Marketing & Communications Actions Required", body: "You are the last gate before content goes live. This is critical.\n\nExternal counsel has confirmed that our sponsored content disclosure obligations vary significantly across ten jurisdictions — and that non-compliance in some jurisdictions carries criminal liability (France, UAE) and significant financial penalties (US FTC).\n\nImmediate actions:\n\nPause UAE and minor influencer campaign activations:\n• Do not activate any new UAE-facing campaigns until Compliance completes the NMC licence audit\n• Do not activate any campaigns involving minor Influencers until HR completes the minor compliance audit\n• This is not optional — the legal risk of activating non-compliant campaigns is criminal in the UAE and platform-removal in France\n\nImplement pre-publication disclosure checklist:\n• No sponsored content to be approved for publication without written confirmation from the Influencer that correct labels are applied\n• Key rules to brief talent on now:\n  - UK: #ad must appear at the start of the post, not buried in hashtags\n  - US: platform Paid Partnership label must be toggled on and must not be removed post-publication\n  - France: #Publicite or #Collaboration required — non-disclosure is a criminal offence\n  - Germany: #Werbung required\n  - Japan: stealth marketing is prohibited since October 2023\n\nBrand partner briefing:\n• Brief all brand partners that Velvet's standard disclosure protocols are non-negotiable\n• Brands cannot instruct Influencers to remove or obscure disclosure labels\n\nOwner: Head of Marketing | UAE and minor campaign pause: immediate | Disclosure checklist implementation: within 14 days" } },
      { id: "procurement", label: "Procurement", implicated: false, channel: "slack", tier: 3, gcAssessment: "Procurement has no required inputs or actions under this memo.", output: { heading: "Velvet Collective Compliance Review — Procurement", body: "Based on this memo, Procurement has no required inputs or actions at this stage. The influencer regulatory compliance review does not engage any supply chain, vendor management or procurement obligations. No communication to Procurement is necessary." } },
      { id: "tax", label: "Tax", implicated: false, channel: "email", tier: 3, gcAssessment: "Tax has no required inputs or actions under this memo directly. Note that the gifted product PAYE issue flagged to Finance may need tax counsel input once the audit is complete.", output: { heading: "Velvet Collective Compliance Review — Tax", body: "Based on this memo, Tax has no required inputs or actions arising from the regulatory compliance review at this stage.\n\nOne note for awareness: external counsel has flagged a potential PAYE exposure on gifted product arrangements for UK-resident Influencers. Finance is conducting an audit. Once complete, Tax input may be needed to assess whether a voluntary disclosure to HMRC is appropriate. I will loop Tax in at that stage. No action needed from Tax now." } },
    ]
  }
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const styles = {
  app: { minHeight: "100vh", background: "#f0f1f5", fontFamily: "'Segoe UI', system-ui, sans-serif" },
  topBar: { background: "#fff", borderBottom: "1px solid #e2e4ea", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  logo: { display: "flex", alignItems: "center", gap: 10 },
  logoMark: { width: 32, height: 32, background: "linear-gradient(135deg, #4f46e5, #6366f1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 },
  logoText: { fontSize: 18, fontWeight: 700, color: "#1a1a2e", letterSpacing: "-0.3px" },
  logoSub: { fontSize: 12, color: "#6b7280", marginLeft: 4, fontWeight: 400 },
  clientBadge: { background: "#eef2ff", color: "#4f46e5", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, letterSpacing: "0.2px" },
  main: { maxWidth: 960, margin: "0 auto", padding: "40px 24px" },
  screenTitle: { fontSize: 24, fontWeight: 700, color: "#1a1a2e", marginBottom: 8, letterSpacing: "-0.4px" },
  screenSub: { fontSize: 14, color: "#6b7280", marginBottom: 32 },
  memoGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 },
  memoCard: { background: "#fff", border: "2px solid #e2e4ea", borderRadius: 12, padding: 24, cursor: "pointer", transition: "all 0.18s", position: "relative", overflow: "hidden" },
  memoCardHover: { borderColor: "#4f46e5", boxShadow: "0 4px 20px rgba(79,70,229,0.12)", transform: "translateY(-2px)" },
  memoTag: { display: "inline-block", background: "#eef2ff", color: "#4f46e5", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4, marginBottom: 12, letterSpacing: "0.5px", textTransform: "uppercase" },
  memoCardTitle: { fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 6, lineHeight: 1.3 },
  memoCardSub: { fontSize: 12, color: "#6b7280", lineHeight: 1.4 },
  memoArrow: { position: "absolute", bottom: 16, right: 16, color: "#4f46e5", fontSize: 18, opacity: 0.5 },
  briefCard: { background: "#fff", borderRadius: 12, border: "1px solid #e2e4ea", padding: 28, marginBottom: 24 },
  briefTitle: { fontSize: 11, fontWeight: 700, color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 16 },
  briefGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 },
  briefItem: { padding: "16px", background: "#f8f9ff", borderRadius: 8, borderLeft: "3px solid #4f46e5" },
  briefItemTitle: { fontSize: 10, fontWeight: 700, color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 },
  briefItemText: { fontSize: 13, color: "#374151", lineHeight: 1.6 },
  worstCaseItem: { borderLeft: "3px solid #ef4444", background: "#fff8f8" },
  worstCaseTitle: { color: "#ef4444" },
  sectionTitle: { fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 },
  chip: { display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", border: "none" },
  chipActive: { background: "#4f46e5", color: "#fff" },
  chipAdd: { background: "#f3f4f6", color: "#374151", border: "1.5px dashed #d1d5db" },
  chipRemove: { background: "#fff", color: "#4b5563", fontSize: 14, lineHeight: 1, marginLeft: 2, opacity: 0.7, cursor: "pointer", border: "none", padding: 0 },
  divider: { height: 1, background: "#e2e4ea", margin: "20px 0" },
  generateBtn: { background: "linear-gradient(135deg, #4f46e5, #6366f1)", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 8, letterSpacing: "0.2px", boxShadow: "0 2px 8px rgba(79,70,229,0.3)", transition: "all 0.15s" },
  backBtn: { background: "none", border: "none", color: "#4f46e5", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, marginBottom: 24, padding: 0 },
  tabRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 },
  tab: { padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1.5px solid #e2e4ea", background: "#fff", color: "#6b7280", transition: "all 0.15s" },
  tabActive: { background: "#4f46e5", color: "#fff", borderColor: "#4f46e5" },
  tabImplicated: { borderColor: "#4f46e5", color: "#4f46e5" },
  outputCard: { background: "#fff", borderRadius: 12, border: "1px solid #e2e4ea", padding: 32 },
  outputMeta: { display: "flex", alignItems: "center", gap: 12, marginBottom: 20 },
  outputBadge: { padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" },
  badgeEmail: { background: "#fef3c7", color: "#92400e" },
  badgeSlack: { background: "#ecfdf5", color: "#065f46" },
  gcAssessment: { background: "#f8f9ff", border: "1px solid #e0e4ff", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#4f46e5", lineHeight: 1.6 },
  gcAssessmentLabel: { fontSize: 10, fontWeight: 700, color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 },
  outputHeading: { fontSize: 18, fontWeight: 700, color: "#1a1a2e", marginBottom: 16, letterSpacing: "-0.3px" },
  outputBody: { fontSize: 14, color: "#374151", lineHeight: 1.8, whiteSpace: "pre-wrap" },
  outputFooter: { marginTop: 28, paddingTop: 20, borderTop: "1px solid #e2e4ea", display: "flex", justifyContent: "flex-end" },
  sendBtn: { padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s" },
  sendEmail: { background: "#fef3c7", color: "#92400e" },
  sendSlack: { background: "#ecfdf5", color: "#065f46" },
  notImplicatedBanner: { background: "#fff8f0", border: "1px solid #fed7aa", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#9a3412", lineHeight: 1.6 },
  stakeholderCard: { background: "#fff", borderRadius: 12, border: "1px solid #e2e4ea", padding: 24, marginBottom: 16 },
};

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("select"); // select | map | output
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [activeStakeholders, setActiveStakeholders] = useState([]);
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const [hoveredMemo, setHoveredMemo] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(false);

  const handleSelectMemo = (memo) => {
    setSelectedMemo(memo);
    setActiveStakeholders(memo.stakeholders.filter(s => s.implicated).map(s => s.id));
    setSelectedStakeholder(null);
    setScreen("map");
  };

  const handleGenerate = () => {
    const first = selectedMemo.stakeholders.find(s => activeStakeholders.includes(s.id));
    setSelectedStakeholder(first?.id || null);
    setScreen("output");
  };

  const toggleStakeholder = (id) => {
    setActiveStakeholders(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleBack = () => {
    if (screen === "output") { setScreen("map"); }
    else if (screen === "map") { setScreen("select"); setSelectedMemo(null); }
  };

  const activeList = selectedMemo
    ? selectedMemo.stakeholders.filter(s => activeStakeholders.includes(s.id))
    : [];

  const inactiveList = selectedMemo
    ? selectedMemo.stakeholders.filter(s => !activeStakeholders.includes(s.id))
    : [];

  const currentStakeholder = selectedMemo
    ? selectedMemo.stakeholders.find(s => s.id === selectedStakeholder)
    : null;

  return (
    <div style={styles.app}>
      {/* TOP BAR */}
      <div style={styles.topBar}>
        <div style={styles.logo}>
          <div style={styles.logoMark}>A</div>
          <span style={styles.logoText}>Ally</span>
          <span style={styles.logoSub}>Legal Intelligence for In-House Teams</span>
        </div>
        {selectedMemo && (
          <div style={styles.clientBadge}>
            {selectedMemo.client}
          </div>
        )}
      </div>

      <div style={styles.main}>

        {/* ── SCREEN 1: SELECT ── */}
        {screen === "select" && (
          <>
            <div style={styles.screenTitle}>Select a Memo</div>
            <div style={styles.screenSub}>Choose a legal memo to analyse and orchestrate the workflow it triggers.</div>
            <div style={styles.memoGrid}>
              {MEMOS.map(memo => (
                <div
                  key={memo.id}
                  style={{ ...styles.memoCard, ...(hoveredMemo === memo.id ? styles.memoCardHover : {}) }}
                  onClick={() => handleSelectMemo(memo)}
                  onMouseEnter={() => setHoveredMemo(memo.id)}
                  onMouseLeave={() => setHoveredMemo(null)}
                >
                  <div style={styles.memoTag}>{memo.tag}</div>
                  <div style={styles.memoCardTitle}>{memo.title}</div>
                  <div style={styles.memoCardSub}>{memo.subtitle}</div>
                  <div style={styles.memoArrow}>→</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── SCREEN 2: MAP ── */}
        {screen === "map" && selectedMemo && (
          <>
            <button style={styles.backBtn} onClick={handleBack}>← Back to memo selection</button>
            <div style={styles.screenTitle}>{selectedMemo.title}</div>
            <div style={styles.screenSub} style={{ marginBottom: 24 }}>{selectedMemo.subtitle}</div>

            {/* Ingestion Banner */}
            <div style={{ background: "#eef2ff", border: "1px solid #c7d2fe", borderLeft: "4px solid #4f46e5", borderRadius: 8, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ fontSize: 16, marginTop: 1 }}>✓</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#4f46e5", marginBottom: 3 }}>Memo ingested</div>
                <div style={{ fontSize: 13, color: "#3730a3", lineHeight: 1.5 }}>Ally has analysed the memo received from <strong>Calloway Reed LLP</strong> dated <strong>15 May 2026</strong> and identified the workflow triggers below. The original memo remains in your inbox.</div>
              </div>
            </div>

            {/* Commander's Brief */}
            <div style={styles.briefCard}>
              <div style={styles.briefTitle}>Commander's Brief</div>
              <div style={styles.briefGrid}>
                <div style={styles.briefItem}>
                  <div style={styles.briefItemTitle}>Decision</div>
                  <div style={styles.briefItemText}>{selectedMemo.commandersBrief.decision}</div>
                </div>
                <div style={styles.briefItem}>
                  <div style={styles.briefItemTitle}>Deadline</div>
                  <div style={styles.briefItemText}>{selectedMemo.commandersBrief.deadline}</div>
                </div>
                <div style={{ ...styles.briefItem, ...styles.worstCaseItem }}>
                  <div style={{ ...styles.briefItemTitle, ...styles.worstCaseTitle }}>Worst Case</div>
                  <div style={styles.briefItemText}>{selectedMemo.commandersBrief.worstCase}</div>
                </div>
              </div>
            </div>

            {/* Stakeholder Map */}
            <div style={styles.briefCard}>
              <div style={styles.briefTitle}>Stakeholder Map</div>
              <div style={styles.sectionTitle}>Implicated — click × to remove</div>
              <div style={styles.chipRow}>
                {activeList.map(s => (
                  <div key={s.id} style={{ ...styles.chip, ...styles.chipActive }}>
                    {s.label}
                    <span
                      style={styles.chipRemove}
                      onClick={(e) => { e.stopPropagation(); toggleStakeholder(s.id); }}
                    >×</span>
                  </div>
                ))}
                {activeList.length === 0 && <span style={{ fontSize: 13, color: "#9ca3af" }}>No stakeholders selected</span>}
              </div>

              {inactiveList.length > 0 && (
                <>
                  <div style={styles.divider} />
                  <div style={styles.sectionTitle}>Not implicated — click + to add</div>
                  <div style={styles.chipRow}>
                    {inactiveList.map(s => (
                      <div
                        key={s.id}
                        style={{ ...styles.chip, ...styles.chipAdd }}
                        onClick={() => toggleStakeholder(s.id)}
                      >
                        + {s.label}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div style={{ marginTop: 24 }}>
                <button
                  style={{ ...styles.generateBtn, ...(hoveredBtn ? { opacity: 0.9, transform: "translateY(-1px)" } : {}) }}
                  onClick={handleGenerate}
                  onMouseEnter={() => setHoveredBtn(true)}
                  onMouseLeave={() => setHoveredBtn(false)}
                  disabled={activeList.length === 0}
                >
                  Generate Stakeholder Outputs →
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── SCREEN 3: OUTPUT ── */}
        {screen === "output" && selectedMemo && (
          <>
            <button style={styles.backBtn} onClick={handleBack}>← Back to stakeholder map</button>
            <div style={styles.screenTitle}>Stakeholder Outputs</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>{activeList.length} stakeholders selected — click any tab to view output</div>

            {/* Tabs */}
            <div style={styles.tabRow}>
              {activeList.map(s => (
                <div
                  key={s.id}
                  style={{
                    ...styles.tab,
                    ...(selectedStakeholder === s.id ? styles.tabActive : s.implicated ? styles.tabImplicated : {})
                  }}
                  onClick={() => setSelectedStakeholder(s.id)}
                >
                  {s.label}
                </div>
              ))}
            </div>

            {/* Output */}
            {currentStakeholder && (
              <div style={styles.outputCard}>
                <div style={styles.outputMeta}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e" }}>{currentStakeholder.label}</span>
                  <span style={{ ...styles.outputBadge, ...(currentStakeholder.channel === "email" ? styles.badgeEmail : styles.badgeSlack) }}>
                    {currentStakeholder.channel === "email" ? "📧 Email" : "💬 Slack"}
                  </span>
                  {!currentStakeholder.implicated && (
                    <span style={{ ...styles.outputBadge, background: "#f3f4f6", color: "#6b7280" }}>Not implicated</span>
                  )}
                </div>

                {/* GC Assessment */}
                <div style={styles.gcAssessment}>
                  <div style={styles.gcAssessmentLabel}>GC Assessment</div>
                  {currentStakeholder.gcAssessment}
                </div>

                {/* Output */}
                <div style={{ borderTop: "1px solid #e2e4ea", paddingTop: 20 }}>
                  <div style={styles.outputHeading}>{currentStakeholder.output.heading}</div>
                  <div style={styles.outputBody}>{currentStakeholder.output.body}</div>
                </div>

                {/* Send Button */}
                <div style={styles.outputFooter}>
                  <button
                    style={{ ...styles.sendBtn, ...(currentStakeholder.channel === "email" ? styles.sendEmail : styles.sendSlack) }}
                  >
                    {currentStakeholder.channel === "email" ? "📧 Send via Email" : "💬 Send via Slack"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
