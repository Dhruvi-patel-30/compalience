import { time } from "console";
import {
  type LucideIcon,
  Tag,
  Users,
  IdCard,
  House,
  Calendar,
  TextAlignStart,
  DollarSign,
  Activity,
  Wrench,
  MapPin,
  Plus,
  FileText,
  Bell,
  Clipboard,
  AlertTriangle,
  RefreshCw,
  Mail,
} from "lucide-react";

interface DynamicField {
  id: string | number;
  image: string;
  labels: string;
  subtitle: string;
}

export const ProfileConfig = [
  {
    name: "profileData",
    data: [
      // HEADER
      {
        name: "header",
        data: [
          {
            id: "title",
            type: "title",
            heading1: "Fire Safety AMC",
            heading2: "Compliance / Compliance Listing / Profile",
          },
          {
            id: "client",
            type: "dropdown",
            placeholder: "Choose a country",
            options: [
              { label: "client", value: "client" },
              { label: "cluster", value: "cluster" },
              { label: "site", value: "site" },
            ],
          },
          {
            id: "cluster",
            type: "dropdown",
            placeholder: "Choose a country",
            options: [
              { label: "client", value: "client" },
              { label: "cluster", value: "cluster" },
              { label: "site", value: "site" },
            ],
          },
          {
            id: "site",
            type: "dropdown",
            placeholder: "Choose a country",
            options: [
              { label: "client", value: "client" },
              { label: "cluster", value: "cluster" },
              { label: "site", value: "site" },
            ],
          },
        ],
      },
      // 2. DYNAMIC SUMMARY BANNER SECTION
      {
        name: "summaryBanner",
        meta: {
          title: "Fire Safety AMC",
          code: "COM-2025-MLD-041",
          category: "Mall / Retail",
          expiryWarning: "Expires in 23 days — 12 Jan 2026",
          badges: [
            { label: "Nearing Expiry", variant: "warning" },
            { label: "Critical", variant: "danger" },
            { label: "AMC", variant: "info" },
            { label: "Malad Site", variant: "neutral" },
          ],
        },
        data: [
          {
            id: "status",
            label: "STATUS",
            value: "Nearing Expiry",
            subtext: "Active compliance",
            variant: "warning",
          },
          {
            id: "issueDate",
            label: "ISSUE DATE",
            value: "12 Jan 2025",
            subtext: "1 year ago",
          },
          {
            id: "expiryDate",
            label: "EXPIRY DATE",
            value: "12 Jan 2026",
            subtext: "in 23 days",
            variant: "warning",
          },
          {
            id: "nextAudit",
            label: "NEXT AUDIT",
            value: "24 Mar 2026",
            subtext: "Yearly audit",
          },
          {
            id: "totalCost",
            label: "TOTAL COST",
            value: "₹4,94,292",
            subtext: "License + Consultant",
          },
        ],
      },
    ],
  },
];

export const complianceConfig = [
  //  details
  {
    label: "Details",
    id: "details",
    sections: [
      // 1. Identification
      {
        id: "identification",
        title: "Identification",
        description: "Core identifiers, names, and reference numbers",
        icon: IdCard,
        type: "Edit",
        action: "Edit",
        fields: [
          {
            id: "compliance-code",
            label: "COMPLIANCE CODE",
            value: "COM-2024-MDL-041",
            type: "link",
          },
          {
            id: "reference-license",
            label: "REFERENCE / LICENSE NO.",
            value: "PNO-2025-MDL-041",
          },
          {
            id: "compliance-category",
            label: "COMPLIANCE NAME",
            value: "Fire Safety AMC",
          },
          {
            id: "compliance-name",
            label: "LICENSE / CERTIFICATE NAME",
            value: "Fire Safety Annual Maintenance Certificate 2025",
          },
          {
            id: "compliance-type",
            label: "TYPE",
            value: "AMC",
            type: "badge",
            color: "blue",
          },
          {
            id: "compliance-scope",
            label: "SCOPE",
            value: "Fire Detection & Suppression",
          },
        ],
      },

      // 2. Classification
      {
        id: "classification",
        title: "Classification",
        description: "Site, location, criticality, and regulatory mapping",
        icon: Tag,
        type: "Edit",
        action: "Edit",
        fields: [
          { id: "site", label: "SITE", value: "Malad" },
          { id: "building", label: "BUILDING", value: "Tower A" },
          {
            id: "criticality",
            label: "CRITICALITY",
            value: "Critical",
            type: "badge",
            color: "red",
          },
          {
            id: "rules",
            label: "RULES & REGULATIONS",
            value: "Maharashtra Fire Prevention Act",
          },
          {
            id: "certificate-standard",
            label: "CERTIFICATE / STANDARD",
            value: "IS 2189, NBC 2016 Part 4",
          },
          {
            id: "renewal-frequency",
            label: "RENEWAL FREQUENCY",
            value: "Annual",
          },
          {
            id: "APPLICABILITY",
            label: "APPLICABILITY",
            value: ["Fire Safety", "Electrical", "Structure", "HVAC"],
            type: "multi-badge",
          },
        ],
      },

      // 3. Description
      {
        id: "description",
        title: "Description",
        description: "Scope, services, and remarks",
        icon: TextAlignStart,
        type: "Edit",
        action: "Edit",
        content: [
          {
            heading: "LICENSE DESCRIPTION",
            value:
              "Annual maintenance contract for fire detection, suppression, and safety equipment. Covers panels, extinguishers, sprinklers, hydrants, and related systems across the Tower A facility.",
          },
          {
            heading: "SERVICE DESCRIPTION",
            value:
              "Comprehensive annual maintenance service for fire safety systems including preventive inspection, testing, calibration, and corrective maintenance.",
          },
          {
            heading: "REMARKS / INSTRUCTIONS",
            value:
              "Annual inspection by licensed contractor required. Ensure all fire-fighting equipment is accessible during inspection. Coordinate with the facility team and submit the inspection report after each visit.",
          },
        ],
      },

      // 4. Ownership & Responsibility
      {
        id: "ownership",
        title: "Ownership & Responsibility",
        description: "Ownership and responsible teams",
        icon: Users,
        type: "Edit",
        action: "Edit",
        fields: [
          {
            id: "activity-owner",
            label: "ACTIVITY OWNER",
            type: "user-profile",
            value: "Arnab Banerjee",
            subtitle: "Facility Manager",
            initials: "AB",
            bgClass: "bg-blue-50 text-blue-600 border-blue-100",
          },
          {
            id: "first-escalation",
            label: "FIRST ESCALATION",
            type: "user-profile",
            value: "Yuvraj Thakur",
            subtitle: "Compliance Head",
            initials: "YT",
            bgClass: "bg-amber-50 text-amber-600 border-amber-100",
          },
          {
            id: "created-by",
            label: "CREATED BY",
            type: "user-profile",
            value: "Nayanish Damania",
            subtitle: "Facility Manager",
            initials: "ND",
            bgClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
          },
          {
            id: "activity-type",
            label: "ACTIVITY TYPE",
            value: "Annual Maintenance",
          },
          {
            id: "auditor",
            label: "AUDITOR / ISSUING OFFICER",
            value: "Fire Officer - Ward A",
          },
          {
            id: "approval-workflow",
            label: "APPROVAL WORKFLOW",
            value: "Owner → Manager → Admin",
          },
        ],
      },

      // 5. Vendor & Authority
      {
        id: "vendor",
        title: "Vendor & Authority",
        description: "Vendor, system authority, and issuing details",
        icon: House,
        type: "Edit",
        action: "Edit",
        fields: [
          {
            id: "vendor-name",
            label: "VENDOR / AGENCY NAME",
            value: "ABC Fire Systems Pvt. Ltd.",
          },
          {
            id: "system-authority",
            label: "SYSTEM AUTHORITY",
            value: "SFSO",
          },
          {
            id: "issuing-authority",
            label: "ISSUING AUTHORITY",
            value: "Mumbai Fire Brigade",
          },
        ],
      },

      // 6. Dates & Schedule
      {
        id: "schedule",
        title: "Dates & Schedule",
        description: "Validity, renewal, and assessment dates",
        icon: Calendar,
        action: "Edit",
        type: "Edit",
        fields: [
          { id: "issue-date", label: "ISSUE DATE", value: "12 Jan 2025" },
          { id: "valid-from", label: "VALID FROM", value: "12 Jan 2025" },
          { id: "expiry-date", label: "EXPIRY DATE", value: "12 Jan 2026" },
          {
            id: "days-to-expire",
            label: "DAYS TO EXPIRE",
            value: "23 Days",
          },
          {
            id: "renewal-frequency-date",
            label: "RENEWAL FREQUENCY",
            value: "Annual",
          },
          {
            id: "assessment-frequency",
            label: "ASSESSMENT FREQUENCY",
            value: "Quarterly",
          },
          {
            id: "audit-frequency",
            label: "AUDIT FREQUENCY",
            value: "Yearly",
          },
          {
            id: "next-audit-date",
            label: "NEXT AUDIT DATE",
            value: "24 Mar 2026",
          },
          {
            id: "is-renewable",
            label: "IS RENEWABLE?",
            value: "Yes",
            type: "badge",
            color: "green",
          },
          {
            id: "previous-compliance",
            label: "PREVIOUS COMPLIANCE",
            value: "COM-2024-MDL-018",
          },
        ],
      },
    ],

    sidebar: [
      {
        id: "costSummary",
        title: "Cost Summary",
        description: "See Costs tab for full slab breakdown",
        icon: DollarSign,
        type: "View Slabs",
        action: "View Slabs",

        costSummary: [
          {
            label: "Unplanned Fees",
            value: "₹2,20,150",
          },
          {
            label: "Consultant Fees",
            value: "₹2,92,102",
          },
          {
            label: "Other Fees",
            value: "₹30",
          },
          {
            label: "Grand Total",
            value: "₹4,94,292",
            isTotal: true,
          },
        ],
      },
      {
        id: "timeline",
        title: "Compliance Timeline",
        icon: Activity,
        timeline: [
          {
            id: "compliance-created",
            title: "Compliance Created",
            description: "By Nikhil Deshmukh",
            date: "12 Jan 2025",
            status: "completed",
          },
          {
            id: "documents-uploaded",
            title: "Documents Uploaded",
            description: "3 documents attached",
            date: "14 Jan 2025",
            status: "completed",
          },
          {
            id: "approved",
            title: "Approved by Compliance Manager",
            description: "All required approvals completed",
            date: "16 Jan 2025",
            status: "completed",
          },
          {
            id: "expiry-alert",
            title: "30 Day Expiry Alert Sent",
            description: "Alert triggered before expiry",
            date: "12 Dec 2025",
            status: "warning",
          },
          {
            id: "renewal",
            title: "Renewal Initiated",
            description: "Renewal request submitted",
            date: "20 Dec 2025",
            status: "upcoming",
          },
          {
            id: "expiry",
            title: "Expiry",
            description: "Compliance certificate expires",
            date: "12 Jan 2026",
            status: "pending",
          },
        ],
      },
    ],
  },
  // assects & location
  {
    label: "Assets & Locations",
    id: "Assets & Locations",
    sections: [
      {
        id: "Linked Assets",
        title: "Linked Assets",
        description: "3 assets linked to this compliance",
        icon: Wrench,
        icons: Plus,
        action: "Link Assets",
        type: "add",
        assets: [
          {
            id: "A001",
            name: "Fire Control Panel – Main",
            subtitle: "Notifier NFS2-3030",
            type: "Fire Safety",
            location: "Block A, Ground Floor",
            status: "Active",
          },
          {
            id: "A002",
            name: "Sprinkler System – Zone 1",
            subtitle: "Tyco TY325",
            type: "Fire Safety",
            location: "Block A, All Floors",
            status: "Active",
          },
          {
            id: "A003",
            name: "Sprinkler System – Zone 2",
            subtitle: "Tyco TY325",
            type: "Fire Safety",
            location: "Block B, All Floors",
            status: "Maintenance Due",
          },
        ],
      },
      {
        id: "Linked Locations",
        title: "Linked Locations",
        description: "2 locations this compliance covers",
        icon: MapPin,
        type: "add",
        icons: Plus,
        action: "Link Location",
        locations: [
          {
            id: "tower-a",
            icon: "🏢",
            name: "Tower A",
            type: "Building",
          },
          {
            id: "north-wing",
            icon: "🏛️",
            name: "North Wing",
            type: "Wing · Tower A",
          },
        ],
        coverage:
          "Covers: All floors of Tower A – North Wing including Ground, Level 1–3, and Basement plant room",
      },
    ],
  },

  {
    label: "Approvals",
    id: "approvals",

    approval: {
      workflow: [
        {
          id: "approver-1",
          name: "Arnab Banerjee",
          role: "Facility Manager",
          status: "approved",
          date: "18 Oct 2026",
          description: "Verified compliance details",
          initials: "AB",
        },
        {
          id: "approver-2",
          name: "Yuvraj Thakur",
          role: "Compliance Head",
          status: "pending",
          date: "Awaiting review",
          description: "Pending final verification",
          initials: "YT",
        },
        {
          id: "approver-3",
          name: "Nayanish Damania",
          role: "Admin",
          status: "upcoming",
          date: "Not started",
          description: "Final approval",
          initials: "ND",
        },
      ],

      history: [
        {
          id: "history-1",
          name: "Arnab Banerjee",
          role: "Facility Manager",
          status: "Approved",
          date: "18 Oct 2026",
          comment: "All compliance documents verified.",
        },
        {
          id: "history-2",
          name: "Yuvraj Thakur",
          role: "Compliance Head",
          status: "Pending",
          date: "22 Oct 2026",
          comment: "Awaiting final document review.",
        },
      ],

      actionRequired: {
        title: "Your Action Required",
        status: "Awaiting Approval",
        description:
          "Review the compliance details and supporting documents before making a decision.",
        currentStage: "Stage 2",
        stageDescription: "Compliance Manager Sign-off",
        alertText: "Awaiting your review since 20 Dec 2025 (5 days)",

        documents: [
          { id: 1, name: "Fire_NOC_Certificate_2025.pdf" },
          { id: 2, name: "Inspection_Report_Nov2025.pdf" },
        ],

        conditions: [
          "Verify all compliance documents",
          "Confirm linked assets and locations",
          "Check validity and expiry dates",
        ],

        actions: [
          { label: "Approve — Stage 2", value: "approve" },
          { label: "Return for Revision", value: "revision" },
          { label: "Reject", value: "reject" },
        ],

        otherActions: [
          { label: "Edit Compliance", value: "edit", icon: "📝" },
          { label: "Reassign", value: "reassign", icon: "👥" },
        ],
      },
    },
  },
  // renewal
  {
    label: "Renewal",
    id: "Renewal",
    sections: [
      {
        id: "Renewal History",
        title: "Renewal History",
        type: "add",
        icons: Plus,
        action: "Start New Renewal",
        historyItems: [
          {
            id: "renewal-2026",
            title: "Renewal 2026",
            status: "In Progress",
            variant: "warning",
            startedDate: "20 Dec 2025",
            targetDate: "12 Jan 2026",
            handler: "Arnab Banerjee",
            currentStage: 2,
            totalStages: 4,
            stages: [
              {
                id: "stage-1",
                label: "Documents Submitted",
                date: "22 Dec 2025",
                status: "completed",
              },
              {
                id: "stage-2",
                label: "Under Review",
                subtext: "Pending authority",
                status: "active",
              },
              {
                id: "stage-3",
                label: "Approval",
                subtext: "Awaiting",
                status: "upcoming",
              },
              {
                id: "stage-4",
                label: "Certificate",
                subtext: "Not issued",
                status: "upcoming",
              },
            ],
          },
          {
            id: "renewal-2025",
            title: "Renewal 2025",
            status: "Completed",
            variant: "success",
            completedDate: "12 Jan 2025",
            duration: "18 days",
            handler: "Arnab Banerjee",
          },
        ],
      },
    ],
  },
  // documents
  {
    label: "Documents",
    id: "documents",
    sections: [
      {
        id: "sec-docs",
        title: "Documents",
        icon: FileText,
        displayLayout: "document-list-layout",
        fields: [
          {
            id: "doc-1",
            labels: "Fire_NOC_Certificate_2025.pdf",
            subtitle:
              "Original NOC • 2.4 MB • Uploaded 14 Jan 2025 by Arnab Banerjee",
            type: "file-row",
            image: "images/pdf.png",
          },
          {
            id: "doc-2",
            labels: "AMC_Agreement_FY2025.pdf",
            subtitle:
              "AMC Contract • 1.8 MB • Uploaded 14 Jan 2025 by Nayanish Damania",
            type: "file-row",
            image: "images/pdf.png",
          },
          {
            id: "doc-3",
            labels: "Inspection_Report_Nov2025.jpg",
            subtitle:
              "Inspection report scan • 840 KB • Uploaded 10 Nov 2025 by Arnab Banerjee",
            type: "file-row",
            image: "images/inspection.png",
          },
        ],
      },
    ],
  },
  // alerts
  {
    label: "Alerts",
    id: "alerts",
    sections: [
      {
        id: "sec-alert-rules",
        title: "Active Alert Rules",
        type: "alert",
        action: "Manage all alerts →",
        icon: AlertTriangle,
        displayLayout: "toggle-grid-layout",
        fields: [
          {
            id: "rule-1",
            labels: "30-day Pre-Expiry Reminder",
            subtitle: "Repeat every 7 days • Activity Owner + First Escalation",
            type: "toggle-input",
            values: true,
            image: "images/clock.png",
            color: "#FEF3C7",
          },
          {
            id: "rule-2",
            labels: "Post-Expiry Escalation",
            subtitle: "Day 0 onwards every 3 days • All Stakeholders",
            type: "toggle-input",
            image: "images/alert.png",
            color: "#FEE2E2",
            values: true,
          },
          {
            id: "rule-3",
            labels: "Renewal Stage Update",
            subtitle: "On status stage change • Compliance Manager",
            type: "toggle-input",
            values: true,
            image: "images/update.png",
            color: "#CFFAFE",
          },
        ],
      },
      {
        id: "sec-alert-history",
        title: "Recent Alerts Sent",
        displayLayout: "timeline-history-layout",
        fields: [
          {
            id: "log-1",
            labels: "Pre-Expiry reminder sent",
            subtitle: "To: Arnab Banerjee, Yuvraj Thakur",
            values: "20 Dec 2025",
            type: "badge-row",
            bgColor: "#FEF3C7",
            expiryDate: "20 Dec 2025",
          },
          {
            id: "log-2",
            labels: "Pre-Expiry reminder sent",
            subtitle: "To: Arnab Banerjee, Yuvraj Thakur",
            values: "12 Dec 2025",
            type: "badge-row",
            bgColor: "#FEF3C7",
            expiryDate: "12 Dec 2025",
          },
          {
            id: "log-3",
            labels: "Renewal stage update",
            subtitle: "To: Compliance Manager",
            values: "22 Dec 2025",
            type: "badge-row",

            bgColor: "##EEF2FF",
            expiryDate: "22 Dec 2025",
          },
        ],
      },
    ],
  },
  // logs
  {
    label: "Logs",
    id: "Logs",
    sections: [
      {
        id: "Active Alert Rules",
        title: "Active Alert Rules",
        type: "View Slabs",
        action: "12 cycle",
        icon: Clipboard,
        description: "Track all changes and updates",
        logs: [
          {
            id: "log_001",
            user: "Nayanish Damania created this compliance",
            timestamp: "12 Jan 2025 - 10:24 AM",
            status: {
              text: "Created",
              type: "created",
            },
          },
          {
            id: "log_002",
            user: "Arnab Banerjee uploaded 3 documents ",
            target: "",
            timestamp: "14 Jan 2025 - 10:24 AM",
            status: {
              text: "Docs",
              type: "docs",
            },
          },
          {
            id: "log_003",
            user: "Arnab Banerjee approved Stage 1  ",
            timestamp: "15 Jan 2025 · 10:24 AM",
            status: {
              text: "Approved",
              type: "approved",
            },
          },
          {
            id: "log_004",
            user: "Yuvraj Thakur returned for revision   ",
            timestamp: "18 Jan 2025 · 2:10 PM",
            status: {
              text: "Returned",
              type: "returned",
            },
          },
          {
            id: "log_005",
            user: "Yuvraj Thakur approved Stage 2 ",
            timestamp: "20 Jan 2025 · 11:05 AM",
            status: {
              text: "Approved",
              type: "approved",
            },
          },
          {
            id: "log_006",
            user: "Nayanish Damania gave final admin approval ",
            timestamp: "22 Jan 2025 · 3:00 PM",
            status: {
              text: "Approved",
              type: "approved",
            },
          },
          {
            id: "log_007",
            user: "Nayanish Damania gave final admin approval ",
            timestamp: "22 Jan 2025 · 3:00 PM",
            status: {
              text: "Edited",
              type: "edited",
            },
          },
          {
            id: "log_008",
            user: "Nayanish Damania gave final admin approval ",
            timestamp: "22 Jan 2025 · 3:00 PM",
            status: {
              text: "Alert",
              type: "alert",
            },
          },

          {
            id: "log_009",
            user: "Nayanish Damania gave final admin approval ",
            timestamp: "22 Jan 2025 · 3:00 PM",
            status: {
              text: "Renewal",
              type: "renewal",
            },
          },
        ],
      },
    ],
    sidebar: [
      {
        id: "Renewal History",
        title: "Renewal History",
        description: "All issuance and renewal cycles",
        icon: RefreshCw,
        type: "View Slabs",
        action: "3 cycles",

        config: {
          in_progress: {
            border: "border-cyan-400 shadow-sm shadow-cyan-50",
            headerBg: "bg-[#EAFBFF]",
            titleColor: "text-[#0891B2]",
            badge:
              "bg-[#EAFBFF] text-[#0891B2] font-semibold border border-cyan-100",
            iconName: "RefreshCw",
          },
          issued: {
            border: "border-[#BBF7D0]",
            headerBg: "bg-[#F8FAFC]",
            titleColor: "text-slate-950",
            badge:
              "bg-[#EFFAF3] text-[#16A34A] font-semibold border border-emerald-100",
            iconName: "Check",
          },

          cycles: [
            {
              id: "c3",
              title: "Cycle 3",
              subtitle: "2026",
              statusType: "in_progress",
              statusText: "In Progress",
              fields: [
                { label: "Started", value: "20 Dec 2025", iconType: "start" },
                { label: "Target", value: "12 Jan 2026", iconType: "target" },
                { label: "By", value: "Arnab Banerjee", iconType: "user" },
              ],
            },
            {
              id: "c2",
              title: "Cycle 2",
              subtitle: "2025",
              statusType: "issued",
              statusText: "Issued",
              fields: [
                { label: "Issued", value: "12 Jan 2025", iconType: "issued" },
                { label: "Expires", value: "12 Jan 2026", iconType: "expires" },
                { label: "By", value: "Arnab Banerjee", iconType: "user" },
              ],
            },
            {
              id: "c1",
              title: "Cycle 1",
              subtitle: "2024",
              statusType: "issued",
              statusText: "Issued",
              fields: [
                { label: "Issued", value: "14 Jan 2024", iconType: "issued" },
                { label: "Expired", value: "12 Jan 2025", iconType: "expired" },
                { label: "By", value: "Nayanish Damania", iconType: "user" },
              ],
            },
          ],
        },
      },
      {
        id: "Renewal Reminders Sent",
        title: "Renewal Reminders Sent",
        icon: Mail,
        description: "Scheduled and sent reminder history",
        type: "View Slabs",
        action: "4 Reminders",
        themes: {
          sent: {
            border: "border-slate-100",
            dotColor: "bg-emerald-500",
            badge:
              "bg-emerald-50 text-emerald-600 font-semibold text-xs border border-emerald-100",
            metaBadge: "bg-slate-50 text-slate-600 border border-slate-100",
          },
          expired: {
            border: "border-rose-200 bg-rose-50/10",
            dotColor: "bg-rose-500",
            badge:
              "bg-rose-50 text-rose-600 font-semibold text-xs border border-rose-100",
            metaBadge: "bg-slate-100/70 text-slate-600 border border-slate-200",
          },
        },
        notifications: [
          {
            id: "notif_001",
            title: "Verification reminder sent",
            statusType: "sent",
            statusText: "Sent",
            countdownText: "69 days before",
            dateText: "07 Jul 2026",
            recipientsCountText: "1 recipient",
            emails: ["arnab.b@facility.com"],
          },
          {
            id: "notif_002",
            title: "Verification reminder sent",
            statusType: "sent",
            statusText: "Sent",
            countdownText: "69 days before",
            dateText: "07 Jul 2026",
            recipientsCountText: "2 recipients",
            emails: ["arnab.b@facility.com", "yuvraj.t@facility.com"],
          },
          {
            id: "notif_003",
            title: "Post-expiry escalation",
            statusType: "expired",
            statusText: "Expired",
            countdownText: "Day 0",
            dateText: "12 Jan 2026",
            recipientsCountText: "3 recipients",
            emails: [
              "arnab.b@facility.com",
              "yuvraj.t@facility.com",
              "nd@vouch.digital",
            ],
          },
        ],
      },
    ],
  },
];
