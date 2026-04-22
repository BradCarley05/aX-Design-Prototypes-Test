import * as React from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button, IconButton } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { StatusChip } from "@/components/ui/status-chip"

// ─── Types ────────────────────────────────────────────────────────────────────

type UsiStatus = "verified" | "exempt" | null

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  city: string
  usi: UsiStatus
  avatarInitials: string
}

interface Session {
  date: string
  time: string
}

interface CourseInfo {
  title: string
  courseId: string
  thumbnailUrl?: string
  courseType: string
  coordination: string
  dateRange: string
  sessions: Session[]
  enrolmentCutoff: string
  locationName: string
  locationAddress: string
  availablePlaces: string
  trainers: { name: string; avatarInitials: string }[]
}

interface EnrolContactsPageProps {
  course?: CourseInfo
  contacts?: Contact[]
  totalCount?: number
  totalPages?: number
  currentPage?: number
  placesAvailable?: number
  onBack?: () => void
  onViewOutline?: () => void
  onViewMoreSessions?: () => void
  onViewMoreUnits?: () => void
  onAddFilter?: () => void
  onNewContact?: () => void
  onSelectAll?: () => void
  onPageChange?: (page: number) => void
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const DEFAULT_COURSE: CourseInfo = {
  title: "Tree Health Assessment and Diagnosis",
  courseId: "60918",
  courseType: "Workshop",
  coordination: "Private",
  dateRange: "17–20 Jan 2025",
  sessions: [
    { date: "17 Jan 2025", time: "8:00AM – 1:00PM" },
    { date: "18 January 2025", time: "8:00AM – 1:00PM" },
    { date: "19 January 2025", time: "8:00AM – 1:00PM" },
    { date: "20 January 2025", time: "8:00AM – 1:00PM" },
  ],
  enrolmentCutoff: "15 Dec 2025, 5:30 PM",
  locationName: "Nathan Campus",
  locationAddress: "33 Logan Road, Nathan, QLD, 4114",
  availablePlaces: "20/24 (4 of your learners enrolled)",
  trainers: [{ name: "Sally Rankin", avatarInitials: "SR" }],
}

const DEFAULT_CONTACTS: Contact[] = [
  { id: "1", name: "Abigail Nelson",  email: "abigail.nelson@yahoo.com",  phone: "0401 234 567", city: "Toowong, QLD", usi: null,       avatarInitials: "AN" },
  { id: "2", name: "Aiden Bell",      email: "aiden.bell@yahoo.com",      phone: "0412 345 678", city: "Toowong, QLD", usi: "verified",  avatarInitials: "AB" },
  { id: "3", name: "Chloe Edwards",   email: "chloe.edwards@yahoo.com",   phone: "0402 234 567", city: "Toowong, QLD", usi: "exempt",    avatarInitials: "CE" },
  { id: "4", name: "Eleanor Cook",    email: "eleanor.cook@yahoo.com",    phone: "0446 678 901", city: "Toowong, QLD", usi: null,        avatarInitials: "EC" },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ReadOnlyField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="ax-enrol-field">
      <span className="ax-enrol-field-label">{label}</span>
      <div className="ax-enrol-field-value">{children}</div>
    </div>
  )
}

function UsiStatusChip({ status }: { status: UsiStatus }) {
  if (!status) return null
  if (status === "verified") {
    return <StatusChip type="positive" size="medium" icon>Verified</StatusChip>
  }
  return <StatusChip type="interim" size="medium" icon>Exempt</StatusChip>
}

// ─── Main component ───────────────────────────────────────────────────────────

export function EnrolContactsPage({
  course = DEFAULT_COURSE,
  contacts = DEFAULT_CONTACTS,
  totalCount = 15,
  totalPages = 5,
  currentPage = 1,
  placesAvailable = 20,
  onBack,
  onViewOutline,
  onViewMoreSessions,
  onNewContact,
  onSelectAll,
  onPageChange,
}: EnrolContactsPageProps) {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [search, setSearch] = React.useState("")

  function toggleRow(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const allSelected = contacts.length > 0 && contacts.every(c => selectedIds.has(c.id))

  function toggleAll() {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(contacts.map(c => c.id)))
    }
  }

  return (
    <div className="ax-enrol-page">

      {/* ── Left panel ────────────────────────────────────────────────────── */}
      <aside className="ax-enrol-panel">
        <div className="ax-enrol-panel-back">
          <IconButton
            icon="icon-arrow-left"
            size={24}
            buttonStyle={false}
            tooltip="Back"
            onClick={onBack}
          />
        </div>

        {/* Course thumbnail */}
        <div className="ax-enrol-panel-thumbnail">
          {course.thumbnailUrl ? (
            <img src={course.thumbnailUrl} alt={course.title} />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #4a7c59 0%, #2d5a3d 50%, #1a3a28 100%)" }} />
          )}
          <div className="ax-enrol-panel-thumbnail-overlay" />
          <div className="ax-enrol-panel-thumbnail-content">
            <span className="ax-enrol-panel-thumbnail-title">{course.title}</span>
            <div className="ax-enrol-panel-thumbnail-meta">
              <span className="ax-enrol-thumb-chip">
                <i className="ax-icon icon-radio-button-unchecked" style={{ fontSize: 12 }} aria-hidden="true" />
                Active
              </span>
              <span className="ax-enrol-panel-thumbnail-id">{course.courseId}</span>
            </div>
          </div>
        </div>

        {/* Panel body */}
        <div className="ax-enrol-panel-body">
          <button className="ax-enrol-panel-link" type="button" onClick={onViewOutline}>
            View course outline
          </button>

          <div className="ax-enrol-panel-fields">
            <ReadOnlyField label="Course type">
              {course.courseType}
            </ReadOnlyField>

            <ReadOnlyField label="Coordination">
              {course.coordination}
            </ReadOnlyField>

            <ReadOnlyField label="Dates">
              {course.dateRange}
            </ReadOnlyField>

            <ReadOnlyField label="Sessions">
              <div className="ax-enrol-sessions">
                {course.sessions.map((s, i) => (
                  <div key={i} className="ax-enrol-session">
                    <span className="ax-enrol-session-date">{s.date}</span>
                    <span className="ax-enrol-session-time">{s.time}</span>
                  </div>
                ))}
                <button className="ax-enrol-panel-link" type="button" onClick={onViewMoreSessions}>
                  View more
                </button>
              </div>
            </ReadOnlyField>

            <ReadOnlyField label="Enrolment cutoff date">
              {course.enrolmentCutoff}
            </ReadOnlyField>

            <ReadOnlyField label="Location">
              <>
                {course.locationName}
                <br />
                <span style={{ fontWeight: "var(--font-weight-regular)" as React.CSSProperties["fontWeight"], color: "var(--text-light)" }}>
                  {course.locationAddress}
                </span>
              </>
            </ReadOnlyField>

            <ReadOnlyField label="Available places">
              {course.availablePlaces}
            </ReadOnlyField>

            <ReadOnlyField label="Trainers">
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-100)" }}>
                {course.trainers.map((t, i) => (
                  <div key={i} className="ax-enrol-trainer-row">
                    <Avatar mode="initials" shape="circle" initials={t.avatarInitials} />
                    <span className="ax-enrol-field-value">{t.name}</span>
                  </div>
                ))}
              </div>
            </ReadOnlyField>
          </div>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="ax-enrol-main">

        {/* Top bar */}
        <div className="ax-enrol-topbar">
          <div className="ax-enrol-topbar-icon">
            <i className="ax-icon icon-person" style={{ fontSize: 20, color: "var(--primary-700)" }} aria-hidden="true" />
          </div>
          <h1 className="ax-enrol-topbar-title">Select contacts to enrol</h1>
        </div>

        {/* Controls */}
        <div className="ax-enrol-controls">
          <div className="ax-enrol-controls-search">
            <Input
              leftIcon={<i className="ax-icon icon-search" style={{ fontSize: 20 }} aria-hidden="true" />}
              placeholder="Search by name"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="ax-enrol-controls-actions">
            <Button variant="outline" onClick={onNewContact} leftIcon={<i className="ax-icon icon-add-person" aria-hidden="true" />}>
              New contact
            </Button>
          </div>
        </div>

        {/* Filter row */}
        <div className="ax-enrol-filter-row">
          <Button variant="tertiary" size="default">
            Columns
          </Button>
          <Button
            variant="tertiary"
            leftIcon={<i className="ax-icon icon-add" aria-hidden="true" />}
          >
            Add filter
          </Button>
        </div>

        {/* Table */}
        <div className="ax-enrol-table-wrap">
          <table className="ax-enrol-table">
            <thead>
              <tr>
                <th className="ax-enrol-table-th ax-enrol-table-th--checkbox">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={toggleAll}
                    aria-label="Select all contacts"
                  />
                </th>
                <th className="ax-enrol-table-th ax-enrol-table-th--name">Name</th>
                <th className="ax-enrol-table-th ax-enrol-table-th--phone">Mobile phone</th>
                <th className="ax-enrol-table-th ax-enrol-table-th--city">City</th>
                <th className="ax-enrol-table-th ax-enrol-table-th--usi">USI</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id} className="ax-enrol-table-row">
                  <td className="ax-enrol-td ax-enrol-td--checkbox">
                    <Checkbox
                      checked={selectedIds.has(contact.id)}
                      onCheckedChange={() => toggleRow(contact.id)}
                      aria-label={`Select ${contact.name}`}
                    />
                  </td>
                  <td className="ax-enrol-td ax-enrol-td--name">
                    <div className="ax-enrol-contact-cell">
                      <Avatar mode="initials" shape="circle" initials={contact.avatarInitials} />
                      <div className="ax-enrol-contact-text">
                        <span className="ax-enrol-contact-name">{contact.name}</span>
                        <span className="ax-enrol-contact-email">{contact.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="ax-enrol-td">
                    <span className="ax-enrol-td-text">{contact.phone}</span>
                  </td>
                  <td className="ax-enrol-td">
                    <span className="ax-enrol-td-text">{contact.city}</span>
                  </td>
                  <td className="ax-enrol-td">
                    <UsiStatusChip status={contact.usi} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="ax-enrol-footer-area">
          <div className="ax-enrol-selection-bar">
            <span className="ax-enrol-selection-msg">
              Select contacts to continue ({placesAvailable} places available)
            </span>
            <Button variant="outline" onClick={onSelectAll}>
              Select all
            </Button>
          </div>

          <div className="ax-enrol-pagination">
            <div className="ax-enrol-per-page">
              <Button variant="tertiary" rightIcon={<i className="ax-icon icon-chevron-down" style={{ fontSize: 16 }} aria-hidden="true" />}>
                20 per page
              </Button>
            </div>

            <button
              className="ax-enrol-page-btn ax-enrol-page-btn--nav"
              disabled={currentPage <= 1}
              onClick={() => onPageChange?.(currentPage - 1)}
            >
              <i className="ax-icon icon-chevron-left" style={{ fontSize: 16 }} aria-hidden="true" />
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`ax-enrol-page-btn${page === currentPage ? " ax-enrol-page-btn--active" : ""}`}
                onClick={() => onPageChange?.(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="ax-enrol-page-btn ax-enrol-page-btn--nav"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange?.(currentPage + 1)}
            >
              Next
              <i className="ax-icon icon-chevron-right" style={{ fontSize: 16 }} aria-hidden="true" />
            </button>

            <span className="ax-enrol-page-count">1-{totalCount} of {totalCount}</span>
          </div>
        </div>

      </main>
    </div>
  )
}
