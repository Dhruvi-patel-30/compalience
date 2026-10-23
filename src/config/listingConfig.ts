import {
  type LucideIcon,
  LayoutDashboard,
  Plus,
  List,
  Tags,
  Bell,
  Users,
  Funnel,
  Check,
  FileText,
  TriangleAlert,
  CircleX,
  RefreshCw,
  CircleCheckBig,
} from "lucide-react";

export interface TableColumn {
  id: string;
  label: string;
  type?: "text" | "badge" | "date" | "owner" | "actions";
  width?: string;
}

export interface TableRow {
  id: string;
  [key: string]: string;
}

export interface TableAction {
  label: string;
  action: string;
}

export interface TableConfig {
  name: string;
  type: "table";
  pageSize: number;
  columns: TableColumn[];
  rows: TableRow[];
  actions: TableAction[];
  options?: DropdownOption[];
}
export interface IconInterface {
  src: string;
  alt: string;
}

export interface MenuItemInterface {
  label: string;
  active?: boolean;
  icon: LucideIcon;
}

export interface MenuSectionInterface {
  title: string;
  items?: MenuItemInterface[];
}

export interface DropdownOption {
  label: string;
  value: string;
}

export interface ComplianceDataField {
  id: string;
  type:
    | "title"
    | "dropdown"
    | "string"
    | "search"
    | "date"
    | "button"
    | "text"
    | "metric";
  heading1?: string;
  heading2?: string;
  placeholder?: string;
  label?: string;
  icon?: LucideIcon;
  options?: DropdownOption[];
  action?: "apply" | "clear" | "close";
  value?: string | number;
  color?: string;
  active?: boolean;
  activeColor?: string;
  activeBg?: string;
}

export interface ComplianceSubSectionInterface {
  name: string;
  data: ComplianceDataField[];
}

export interface ComplianceInterface {
  name: string;
  type?: string;
  heading1?: string;
  heading2?: string;
  icons?: IconInterface[];
  menuSections?: MenuSectionInterface[];
  data?: ComplianceDataField[] | ComplianceSubSectionInterface[];
  table?: TableConfig;
}

export const complianceConfig: ComplianceInterface[] = [
  {
    name: "sidebar",
    icons: [
      { src: "/icons/sidebarIcons/module10.png", alt: "Icon 1" },
      { src: "/icons/sidebarIcons/module3.png", alt: "Icon 2" },
      { src: "/icons/sidebarIcons/module2.png", alt: "Icon 3" },
      { src: "/icons/sidebarIcons/module1.png", alt: "Icon 4" },
      { src: "/icons/sidebarIcons/module4.png", alt: "Icon 5" },
      { src: "/icons/sidebarIcons/module6.png", alt: "Icon 6" },
      { src: "/icons/sidebarIcons/module5.png", alt: "Icon 7" },
      { src: "/icons/sidebarIcons/module11.png", alt: "Icon 8" },
      { src: "/icons/sidebarIcons/module7.png", alt: "Icon 9" },
      { src: "/icons/sidebarIcons/module6.png", alt: "Icon 10" },
      { src: "/icons/sidebarIcons/module8.png", alt: "Icon 11" },
    ],
    menuSections: [
      {
        title: "COMPLIANCE",
        items: [
          { label: "Dashboard", icon: LayoutDashboard },
          { label: "Create New", icon: Plus },
          { label: "Compliance Listing", icon: List, active: true },
        ],
      },
      {
        title: "CONFIGURATION",
        items: [
          { label: "Type Master", icon: Tags },
          { label: "Alert Configuration", icon: Bell },
          { label: "User Configuration", icon: Users },
        ],
      },
    ],
  },

  {
    name: "ComplianceListing",
    data: [
      // HEADER
      {
        name: "header",
        data: [
          {
            id: "title",
            type: "title",
            heading1: "Compliance Listing",
            heading2: "Compliance / Compliance Listing",
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

      // FILTER BAR
      {
        name: "filter_bar",
        data: [
          {
            id: "search",
            type: "text",
            placeholder: "Search name, code, site...",
          },
          {
            id: "start_date",
            type: "date",
            placeholder: "dd/mm/yyyy",
          },
          {
            id: "end_date",
            type: "date",
            placeholder: "dd/mm/yyyy",
          },
          {
            id: "all_sites",
            type: "dropdown",
            placeholder: "All Sites",
            options: [
              { label: "Site 1", value: "site_1" },
              { label: "Site 2", value: "site_2" },
            ],
          },
          {
            id: "all_categories",
            type: "dropdown",
            placeholder: "All Categories",
            options: [
              { label: "Category 1", value: "cat_1" },
              { label: "Category 2", value: "cat_2" },
            ],
          },
          {
            id: "more_filters",
            type: "button",
            label: "More Filters",
            icon: Funnel,
          },
        ],
      },

      // METRICS CARDS
      {
        name: "metrics_cards",
        data: [
          {
            id: "total",
            type: "metric",
            value: 16,
            heading1: "Total",
            active: true,
            heading2: "All compliances",
            color: "#7C3AED",
            activeColor: "#153AC7",
            activeBg: "#E8EBF9",
            icon: FileText,
          },
          {
            id: "valid",
            type: "metric",
            value: 8,
            heading1: "Valid",
            heading2: "Active & compliant",
            color: "#16A34A",
            activeColor: "#153AC7",
            activeBg: "#DCFCE7",
            icon: Check,
          },
          {
            id: "nearing_expiry",
            type: "metric",
            value: 4,
            heading1: "Nearing Expiry",
            heading2: "within 30 days",
            color: "#D97706",
            activeColor: "#153AC7",
            activeBg: "#FEF3C7",

            icon: TriangleAlert,
          },
          {
            id: "expired",
            type: "metric",
            value: 7,

            heading1: "Expired",
            heading2: "Needs Action",
            color: "#DC2626",
            activeColor: "#153AC7",
            activeBg: "#FEE2E2",
            icon: CircleX,
          },
          {
            id: "renewal_progress",
            type: "metric",
            value: 8,

            heading1: "Renewal Progress",
            heading2: "In Process",
            color: "#0891B2",
            activeColor: "#153AC7",
            activeBg: "#CFFAFE",
            icon: RefreshCw,
          },
          {
            id: "closed",
            type: "metric",
            value: 9,

            heading1: "Closed",
            heading2: "Archived",
            color: "#686687",
            activeColor: "#153AC7",
            activeBg: "#E5E7EB",
            icon: CircleCheckBig,
          },
        ],
      },
    ],
    table: {
      name: "compliance_table",
      type: "table",
      pageSize: 8,

      options: [
        { label: "Expiry (soonest)", value: "1" },
        { label: "Expiry (soonest1)", value: "2" },
      ],

      columns: [
        { id: "name", label: "COMPLIANCE", type: "text" },
        { id: "status", label: "STATUS", type: "badge" },
        { id: "site", label: "SITE", type: "text" },
        { id: "category", label: "CATEGORY", type: "text" },
        { id: "criticality", label: "CRITICALITY", type: "badge" },
        { id: "expiryDate", label: "EXPIRY DATE", type: "date" },
        { id: "renewal", label: "RENEWAL", type: "text" },
        { id: "owner", label: "OWNER", type: "owner" },
        { id: "actions", label: "ACTIONS", type: "actions" },
      ],
      rows: [
        {
          id: "1",
          name: "Plumbing Compliance Check",
          status: "Closed",
          site: "Powai",
          category: "Plumbing",
          criticality: "High",
          expiryDate: "01 Nov 2025",
          renewal: "Annual",
          owner: "Yuvraj",
          img: "/images/colplience/2.png",
        },
        {
          id: "2",
          name: "Fire Safety Inspection",
          status: "Nearing Expiry",
          site: "Ahmedabad",
          category: "Fire Safety",
          criticality: "Low",
          expiryDate: "20 Feb 2026",
          renewal: "Annual",
          owner: "Rahul",
          img: "/images/colplience/7.png",
        },
        {
          id: "3",
          name: "Lift Maintenance AMC",
          status: "Expired",
          site: "Worli",
          category: "Lift Maint.",
          criticality: "Critical",
          expiryDate: "10 Dec 2025",
          renewal: "Quarterly",
          owner: "Priya",
          img: "/images/colplience/1.png",
        },
      ],

      actions: [
        { label: "View Details", action: "view" },
        { label: "View Activity Log", action: "activity" },
        { label: "Duplicate", action: "duplicate" },
        { label: "Manage Alerts", action: "alerts" },
        { label: "Close Compliance", action: "close" },
        { label: "Delete", action: "delete" },
      ],
    },
  },

  // ADVANCED FILTERS
  {
    name: "advanced_filters",
    data: [
      {
        id: "criticality",
        type: "dropdown",
        label: "CRITICALITY",
        placeholder: "All",
        options: [
          { label: "All", value: "all" },
          { label: "High", value: "high" },
          { label: "Medium", value: "medium" },
          { label: "Low", value: "low" },
        ],
      },
      {
        id: "compliance_type",
        type: "dropdown",
        label: "TYPE",
        placeholder: "All Types",
        options: [
          { label: "All Types", value: "all" },
          { label: "Fire Safety", value: "fire_safety" },
          { label: "Electrical", value: "electrical" },
          { label: "Plumbing", value: "plumbing" },
        ],
      },
      {
        id: "activity_owner",
        type: "dropdown",
        label: "ACTIVITY OWNER",
        placeholder: "All Owners",
        options: [
          { label: "All Owners", value: "all" },
          { label: "Rahul", value: "rahul" },
          { label: "Priya", value: "priya" },
        ],
      },
      {
        id: "vendor",
        type: "dropdown",
        label: "VENDOR",
        placeholder: "All Vendors",
        options: [
          { label: "All Vendors", value: "all" },
          { label: "Vendor 1", value: "vendor_1" },
          { label: "Vendor 2", value: "vendor_2" },
        ],
      },
      {
        id: "renewal_frequency",
        type: "dropdown",
        label: "RENEWAL FREQUENCY",
        placeholder: "All",
        options: [
          { label: "All", value: "all" },
          { label: "Monthly", value: "monthly" },
          { label: "Quarterly", value: "quarterly" },
          { label: "Half-Yearly", value: "half_yearly" },
          { label: "Annual", value: "annual" },
        ],
      },
      {
        id: "expiry_window",
        type: "dropdown",
        label: "EXPIRY WINDOW",
        placeholder: "Any",
        options: [
          { label: "Any", value: "any" },
          { label: "7 Days", value: "7_days" },
          { label: "30 Days", value: "30_days" },
          { label: "60 Days", value: "60_days" },
        ],
      },
      {
        id: "linked_assets",
        type: "dropdown",
        label: "HAS LINKED ASSETS",
        placeholder: "All",
        options: [
          { label: "All", value: "all" },
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        id: "alert_rules",
        type: "dropdown",
        label: "ALERT RULES",
        placeholder: "All",
        options: [
          { label: "All", value: "all" },
          { label: "Enabled", value: "enabled" },
          { label: "Disabled", value: "disabled" },
        ],
      },
      {
        id: "clear_filters",
        type: "button",
        label: "Clear all",
        action: "clear",
      },
      {
        id: "apply_filters",
        type: "button",
        label: "Apply and show",
        icon: Check,
        action: "apply",
      },
    ],
  },
];
