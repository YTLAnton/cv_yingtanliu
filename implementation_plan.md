# Technical Implementation Plan (RWD)

## Goal
Implement responsive web design for `index.html` to support mobile devices (<1024px) while maintaining the desktop layout (>1024px).

## User Review Required
> [!IMPORTANT]
> **Mobile Layout Strategy**: 
> - The layout will switch from a **2-column Grid** (Desktop) to a **1-column Stack** (Mobile).
> - **Order**: Main Content (Left Column) will appear **ABOVE** the Sidebar (Right Column) on mobile.
> - **Padding**: Reduced from `p-12` to `p-6` or `p-4` on mobile to maximize screen real estate.

## Proposed Changes

### [HTML Structure] (index.html)
Transition from fixed Grid to Responsive Grid/Flex.

#### `cv-container` (Line 20)
- **Current**: `max-w-5xl ... min-h-[1123px]`
- **Change**: `w-full max-w-5xl ... min-h-screen lg:min-h-[1123px]`
- **Reason**: Remove fixed height constraint on mobile; allow full width.

#### `grid-cols-12` Container (Lines 24, 237)
- **Current**: `grid grid-cols-12`
- **Change**: `grid grid-cols-1 lg:grid-cols-12`
- **Simplification**: Just `grid grid-cols-1 lg:grid-cols-12`.

#### Main Content Column (Lines 27, 240)
- **Current**: `col-span-8`
- **Change**: `col-span-12 lg:col-span-8`
- **Reason**: Full width on mobile.

#### Sidebar Column (Lines 176, 389)
- **Current**: `col-span-4 border-l`
- **Change**: `col-span-12 lg:col-span-4 border-l-0 border-t lg:border-t-0 lg:border-l`
- **Reason**: Full width on mobile. Move border from left to top for separation.

#### Headers & Sections Padding
- **Global**: Change large paddings `p-12` to `p-6 lg:p-12`.
- **Target Classes**: 
    - Header: `p-12 pb-8 pr-8` -> `p-6 lg:p-12 lg:pb-8 lg:pr-8`
    - Body: `p-12` -> `p-6 lg:p-12`

### [CSS Styles] (css/style.css)
#### Timeline Adjustment
- **Problem**: Timeline dots (`left: -33px`) might go off-screen if padding is too small.
- **Fix**: Ensure `.timeline-line` has enough left padding or margin on mobile. currently `pl-8` (2rem = 32px), which is barely enough for `-33px`.
- **Plan**: Increase mobile padding for timeline container or adjust dot position if needed.
    - `pl-8` -> `pl-10 lg:pl-8`? Or just keep it if `p-6` parent padding + `pl-8` is sufficient.
    - Parent `p-6` (24px) + `pl-8` (32px) = 56px from edge. Dot is -33px relative to line. Line is at 24+32=56px. Dot at 56-33 = 23px. Safe.

### [Print Styles]
- Ensure responsiveness does NOT affect printing (A4 consistency).
- **Strategy**: Tailwind's `print:` modifier.
    - `print:grid-cols-12` to force desktop layout in print.
    - `print:col-span-8`, `print:col-span-4`.
    - `print:p-12` to restore original spacing.

## Verification Plan

### Automated Tests
- None (Visual changes).

### Manual Verification
1.  **Mobile View (< 1024px)**: Verify single column, reduced padding, no horizontal scroll.
2.  **Desktop View (> 1024px)**: Ensure pixel-perfect match with original.
3.  **Print Preview**: Ensure A4 layout remains strictly 2-column.
