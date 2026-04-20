import { useState, type ReactNode } from 'react'

type Screen = 1 | 2 | 3 | 4 | 5 | 6

const ITEMS = [
  { id: 1, text: 'Confirm food production requirements from standard recipes', section: 0 },
  { id: 2, text: 'Calculate ingredient amounts according to requirements', section: 0 },
  { id: 3, text: 'Select type and size of equipment suitable to requirements', section: 1 },
  { id: 4, text: 'Use equipment safely and hygienically according to manufacturer instructions', section: 1 },
  { id: 5, text: 'Safely assemble and ensure cleanliness of equipment before use', section: 1 },
  { id: 6, text: 'Season and prepare ingredients using appropriate flavourings', section: 2 },
  { id: 7, text: 'Weigh and measure ingredients and create portions according to recipe', section: 2 },
  { id: 8, text: 'Prepare, cut and portion ingredients according to recipe and cooking style', section: 2 },
]

const SECTIONS = [
  'Select ingredients',
  'Select, prepare and use equipment',
  'Portion and prepare ingredients',
]

// Items already achieved before the current session (for item detail screens)
const PRE_ACHIEVED = new Set([3, 5, 6, 7, 8])

function Dot() {
  return <span className="ax-mobile-dot" />
}

function MobileHeader({
  plain,
  title,
  subtitle,
  onBack,
}: {
  plain?: boolean
  title: string
  subtitle?: ReactNode
  onBack?: () => void
}) {
  return (
    <div className={`ax-mobile-header${plain ? ' ax-mobile-header--plain' : ''}`}>
      {onBack && (
        <button className="ax-mobile-back-btn" aria-label="Go back" onClick={onBack}>
          <i className="icon-arrow-right-short ax-mobile-back-icon" />
        </button>
      )}
      <div className="ax-mobile-header-text">
        <span className="ax-mobile-header-title">{title}</span>
        {subtitle && <div className="ax-mobile-header-subtitle">{subtitle}</div>}
      </div>
    </div>
  )
}

function ItemStrip({
  achievedItems,
  currentItem,
}: {
  achievedItems: Set<number>
  currentItem: number
}) {
  return (
    <div className="ax-mobile-item-strip">
      {ITEMS.map(item => {
        const achieved = achievedItems.has(item.id)
        const isCurrent = item.id === currentItem
        return (
          <div
            key={item.id}
            className={`ax-mobile-strip-cell${isCurrent ? ' ax-mobile-strip-cell--current' : ''}`}
          >
            <span className={`ax-mobile-strip-num${achieved ? ' ax-mobile-strip-num--achieved' : ''}`}>
              {item.id}
            </span>
            {achieved && <i className="icon-checkbox-checked ax-mobile-strip-tick" />}
          </div>
        )
      })}
    </div>
  )
}

function ItemActionBar({
  nyaActive,
  achievedActive,
  onAchieved,
}: {
  nyaActive?: boolean
  achievedActive?: boolean
  onAchieved?: () => void
}) {
  return (
    <div className="ax-mobile-action-bar">
      <div className="ax-mobile-action-icons">
        <button className="ax-mobile-action-icon-btn" aria-label="Add attachment">
          <i className="icon-note-outline" />
        </button>
        <button className="ax-mobile-action-icon-btn" aria-label="Add photo">
          <i className="icon-image" />
        </button>
        <button className="ax-mobile-action-icon-btn" aria-label="Add comment">
          <i className="icon-text" />
        </button>
      </div>
      <div className="ax-mobile-assess-btns">
        <button className={`ax-mobile-assess-btn${nyaActive ? ' ax-mobile-assess-btn--nya' : ''}`}>
          <i className="icon-radio-button-checked" />
          Not yet achieved
        </button>
        <button
          className={`ax-mobile-assess-btn${achievedActive ? ' ax-mobile-assess-btn--achieved' : ''}`}
          onClick={onAchieved}
        >
          <i className="icon-checkbox-checked" />
          Achieved
        </button>
      </div>
    </div>
  )
}

// ─── Screen 1: Milestone Overview ────────────────────────────────────────────

function ScreenOverview({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <>
      <MobileHeader
        title="Milestone 3 - Japanese Cuisine"
        subtitle={<><span>In progress</span><Dot /><span>2 units</span></>}
      />
      <div className="ax-mobile-content">
        <div className="ax-mobile-section">
          <p className="ax-mobile-section-title">Milestone checklist</p>
          <button
            className="ax-mobile-list-item ax-mobile-list-item--btn"
            onClick={() => onNavigate(2)}
          >
            <div className="ax-mobile-list-item-text">
              <p className="ax-mobile-list-item-title">Practical Japanese Cooking Techniques</p>
              <div className="ax-mobile-list-item-meta">
                <span>5 sections</span>
                <Dot />
                <span>Not started</span>
              </div>
            </div>
            <i className="icon-arrow-right-short ax-mobile-list-arrow" />
          </button>
        </div>

        <div className="ax-mobile-section">
          <p className="ax-mobile-section-title">SITHC1016 - Japanese culinary skills</p>
          <div className="ax-mobile-status-block">
            <i className="icon-checkbox-checked ax-mobile-status-icon" />
            <span className="ax-mobile-status-text">4/4 required hours</span>
          </div>
          <div className="ax-mobile-list-item">
            <div className="ax-mobile-thumbnail ax-mobile-thumbnail--image" />
            <div className="ax-mobile-list-item-text">
              <p className="ax-mobile-list-item-title">Prepare dashi stock from scratch</p>
              <div className="ax-mobile-list-item-meta"><span>0/10 reps</span></div>
            </div>
          </div>
          <div className="ax-mobile-list-item">
            <div className="ax-mobile-thumbnail">
              <i className="icon-activities-tasks-list ax-mobile-thumbnail-icon" />
            </div>
            <div className="ax-mobile-list-item-text">
              <p className="ax-mobile-list-item-title">Practical Japanese Cooking Techniques</p>
              <div className="ax-mobile-list-item-meta">
                <span>Unit checklist</span><Dot /><span>Not started</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ax-mobile-section">
          <p className="ax-mobile-section-title">SITHCCC0011 - Italian Cooking Techniques</p>
          <div className="ax-mobile-status-block">
            <i className="icon-checkbox-checked ax-mobile-status-icon" />
            <span className="ax-mobile-status-text">4/4 required hours</span>
          </div>
          <div className="ax-mobile-list-item">
            <div className="ax-mobile-thumbnail ax-mobile-thumbnail--image" />
            <div className="ax-mobile-list-item-text">
              <p className="ax-mobile-list-item-title">Identify key ingredients in a virtual pantry</p>
              <div className="ax-mobile-list-item-meta"><span>0/10 reps</span></div>
            </div>
          </div>
          <div className="ax-mobile-list-item">
            <div className="ax-mobile-thumbnail ax-mobile-thumbnail--image" />
            <div className="ax-mobile-list-item-text">
              <p className="ax-mobile-list-item-title">Plate sashimi using traditional styles</p>
              <div className="ax-mobile-list-item-meta">
                <span>Unit checklist</span><Dot /><span>Not started</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Screen 2: Checklist — Not Started ───────────────────────────────────────

function ScreenChecklistNotStarted({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <>
      <MobileHeader
        plain
        title="Practical Japanese Cooking Techniques"
        subtitle={<><span>Not started</span><Dot /><span>Milestone checklist</span></>}
        onBack={() => onNavigate(1)}
      />
      <div className="ax-mobile-body">
        <div className="ax-mobile-cl-list">
          {SECTIONS.map((section, sectionIdx) => (
            <div key={section}>
              <div className="ax-mobile-cl-section-header">{section}</div>
              {ITEMS.filter(item => item.section === sectionIdx).map(item => (
                <div key={item.id} className="ax-mobile-cl-item">
                  <span className="ax-mobile-cl-item-text">{item.id}. {item.text}</span>
                  <div className="ax-mobile-cl-item-btns">
                    <button className="ax-mobile-cl-icon-btn" aria-label="Edit">
                      <i className="icon-edit-outline" />
                    </button>
                    <button
                      className="ax-mobile-cl-icon-btn"
                      aria-label="Mark as achieved"
                      onClick={item.id === 1 ? () => onNavigate(3) : undefined}
                    >
                      <i className="icon-checkbox-checked" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="ax-mobile-cl-footer">
          <button className="ax-mobile-cl-mark-btn">
            <i className="icon-checkbox-checked" />
            Mark all as Achieved
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Screen 3: Checklist — In Progress (item 1 achieved) ─────────────────────

function ScreenChecklistInProgress({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <>
      <MobileHeader
        plain
        title="Practical Japanese Cooking Techniques"
        subtitle={<><span>In progress</span><Dot /><span>Milestone checklist</span></>}
        onBack={() => onNavigate(1)}
      />
      <div className="ax-mobile-body">
        <div className="ax-mobile-cl-list">
          {SECTIONS.map((section, sectionIdx) => (
            <div key={section}>
              <div className="ax-mobile-cl-section-header">{section}</div>
              {ITEMS.filter(item => item.section === sectionIdx).map(item => {
                const isAchieved = item.id === 1
                return (
                  <div key={item.id} className="ax-mobile-cl-item">
                    <button
                      className="ax-mobile-cl-item-btn"
                      onClick={() => onNavigate(isAchieved ? 6 : 4)}
                    >
                      <span className="ax-mobile-cl-item-text">{item.id}. {item.text}</span>
                    </button>
                    <div className="ax-mobile-cl-item-btns">
                      <button className="ax-mobile-cl-icon-btn" aria-label="Edit">
                        <i className="icon-edit-outline" />
                      </button>
                      <button
                        className={`ax-mobile-cl-icon-btn${isAchieved ? ' ax-mobile-cl-icon-btn--achieved' : ''}`}
                        aria-label={isAchieved ? 'Achieved' : 'Mark as achieved'}
                      >
                        <i className="icon-checkbox-checked" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="ax-mobile-cl-footer">
          <button className="ax-mobile-cl-mark-btn">
            <i className="icon-checkbox-checked" />
            Mark all as Achieved
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Screen 4: Item Detail — Not Yet Achieved ────────────────────────────────

function ScreenItemNYA({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <>
      <MobileHeader plain title="View checklist item" onBack={() => onNavigate(3)} />
      <div className="ax-mobile-body">
        <ItemStrip achievedItems={PRE_ACHIEVED} currentItem={1} />
        <div className="ax-mobile-item-row">
          <span className="ax-mobile-item-badge">1</span>
          <span className="ax-mobile-item-label">
            Confirm food production requirements from standard recipes
          </span>
        </div>
        <div className="ax-mobile-item-scroll">
          <div className="ax-mobile-empty-state">
            <div className="ax-mobile-empty-icon">
              <i className="icon-info-outline" />
            </div>
            <p className="ax-mobile-empty-title">Add a note or attach evidence</p>
            <p className="ax-mobile-empty-desc">
              You can include photos and videos, or add a comment as text
            </p>
          </div>
        </div>
        <ItemActionBar nyaActive onAchieved={() => onNavigate(5)} />
      </div>
    </>
  )
}

// ─── Screen 5: Item Detail — Achieved ────────────────────────────────────────

function ScreenItemAchieved({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const achieved = new Set([...PRE_ACHIEVED, 1])
  return (
    <>
      <MobileHeader plain title="View checklist item" onBack={() => onNavigate(3)} />
      <div className="ax-mobile-body">
        <ItemStrip achievedItems={achieved} currentItem={1} />
        <div className="ax-mobile-item-row">
          <span className="ax-mobile-item-badge">1</span>
          <span className="ax-mobile-item-label">
            Confirm food production requirements from standard recipes
          </span>
        </div>
        <div className="ax-mobile-item-scroll">
          <div className="ax-mobile-empty-state">
            <div className="ax-mobile-empty-icon">
              <i className="icon-info-outline" />
            </div>
            <p className="ax-mobile-empty-title">Add a note or attach evidence</p>
            <p className="ax-mobile-empty-desc">
              You can include photos and videos, or add a comment as text
            </p>
          </div>
        </div>
        <ItemActionBar achievedActive onAchieved={() => onNavigate(6)} />
      </div>
    </>
  )
}

// ─── Screen 6: Item Detail — With Notes ──────────────────────────────────────

function ScreenItemWithNotes({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const achieved = new Set([...PRE_ACHIEVED, 1])
  return (
    <>
      <MobileHeader plain title="View checklist item" onBack={() => onNavigate(3)} />
      <div className="ax-mobile-body">
        <ItemStrip achievedItems={achieved} currentItem={1} />
        <div className="ax-mobile-item-row">
          <span className="ax-mobile-item-badge">1</span>
          <span className="ax-mobile-item-label">
            Confirm food production requirements from standard recipes
          </span>
        </div>
        <div className="ax-mobile-item-scroll">
          <div className="ax-mobile-notes-wrap">
            <p className="ax-mobile-notes-label">Notes</p>
            <div className="ax-mobile-note">
              <div className="ax-mobile-note-avatar">
                <i className="icon-portrait-card-view" />
              </div>
              <div className="ax-mobile-note-content">
                <div className="ax-mobile-note-header">
                  <div className="ax-mobile-note-meta">
                    <span className="ax-mobile-note-name">Julian Bradford</span>
                    <span className="ax-mobile-note-time">19 Mar 26, 10:56 AM</span>
                  </div>
                  <button className="ax-mobile-action-icon-btn" aria-label="More options">
                    <i className="icon-chevron-down" />
                  </button>
                </div>
                <p className="ax-mobile-note-body">
                  The student got this question technically correct but their answer was not
                  one of our alternatives in the gap text question setup
                </p>
                <div className="ax-mobile-note-photos">
                  <div className="ax-mobile-note-photo" />
                  <div className="ax-mobile-note-photo" />
                  <div className="ax-mobile-note-photo" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ItemActionBar achievedActive />
      </div>
    </>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function MobileChecklistFlow() {
  const [screen, setScreen] = useState<Screen>(1)
  return (
    <div className="ax-mobile-preview">
      <div className="ax-mobile-screen">
        {screen === 1 && <ScreenOverview onNavigate={setScreen} />}
        {screen === 2 && <ScreenChecklistNotStarted onNavigate={setScreen} />}
        {screen === 3 && <ScreenChecklistInProgress onNavigate={setScreen} />}
        {screen === 4 && <ScreenItemNYA onNavigate={setScreen} />}
        {screen === 5 && <ScreenItemAchieved onNavigate={setScreen} />}
        {screen === 6 && <ScreenItemWithNotes onNavigate={setScreen} />}
      </div>
    </div>
  )
}
