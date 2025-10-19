# Application Screenshots & Features

## User Interface Overview

### Main Application Interface

The application consists of two main sections displayed side-by-side:

1. **Left Panel: Student Form** (Add/Edit Students)
2. **Right Panel: Student List** (View/Manage Students)

```
┌─────────────────────────────────────────────────────────────────┐
│          Student Food Preference Management                     │
│                    (Header - Dark Background)                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────┐  ┌──────────────────────────────────┐
│   Add New Student       │  │      Students List               │
│ ─────────────────────── │  │ ──────────────────────────────── │
│                         │  │                                  │
│  Student Name:          │  │  ID | Name    | Food Pref | Actions│
│  ┌───────────────────┐  │  │ ───────────────────────────────  │
│  │ John Doe          │  │  │  1  | John    | Veg      | ✏️ 🗑️ │
│  └───────────────────┘  │  │  2  | Jane    | Vegan    | ✏️ 🗑️ │
│                         │  │  3  | Bob     | Non-Veg  | ✏️ 🗑️ │
│  Food Preference:       │  │                                  │
│  ┌───────────────────┐  │  │                                  │
│  │ Vegetarian ▼      │  │  │                                  │
│  └───────────────────┘  │  │                                  │
│                         │  │                                  │
│  ┌──────────────┐       │  │                                  │
│  │ Add Student  │       │  │                                  │
│  └──────────────┘       │  │                                  │
│                         │  │                                  │
└─────────────────────────┘  └──────────────────────────────────┘
```

## Features Demonstrated

### 1. Add New Student
- Enter student name in text field
- Select food preference from dropdown
- Click "Add Student" button
- Student appears in the list immediately

### 2. View Students
- All students displayed in a table
- Shows ID, Name, and Food Preference
- Color-coded badges for different food preferences:
  - 🟢 Vegetarian (Green)
  - 🔵 Vegan (Blue)
  - 🔴 Non-Vegetarian (Red)
  - 🟡 Pescatarian (Yellow)
  - 🟠 Gluten-Free (Orange)

### 3. Edit Student
- Click "Edit" button on any student row
- Form populates with student data
- Modify name or food preference
- Click "Update Student" to save
- Click "Cancel" to discard changes

### 4. Delete Student
- Click "Delete" button on any student row
- Confirmation dialog appears
- Confirm to remove student from database

### 5. Error Handling
- Red error banner shows if backend is not running
- Form validation ensures all fields are filled
- Graceful handling of network errors

## Color Scheme

### Header
- Background: Dark Gray (#282c34)
- Text: White

### Main Background
- Light Gray (#f5f5f5)

### Cards/Panels
- White background
- Subtle shadow
- Rounded corners

### Buttons
- Primary (Add/Update): Cyan (#61dafb)
- Secondary (Cancel): Gray (#6c757d)
- Edit: Yellow/Orange (#ffc107)
- Delete: Red (#dc3545)

### Food Preference Badges
- Vegetarian: Light Green background, dark green text
- Vegan: Light Blue background, dark blue text
- Non-Vegetarian: Light Red background, dark red text
- Pescatarian: Light Blue background, dark blue text
- Gluten-Free: Light Yellow background, dark yellow text

## Responsive Design

### Desktop (> 768px)
- Two-column layout
- Form on left, list on right
- Full table view

### Mobile (< 768px)
- Single-column layout
- Form stacked above list
- Table scrolls horizontally if needed

## User Experience Flow

### Adding a Student
```
1. User fills in "Student Name" field
2. User selects from "Food Preference" dropdown
3. User clicks "Add Student"
4. Success: Student appears at top of list
5. Form clears automatically
```

### Editing a Student
```
1. User clicks "Edit" button in student row
2. Form header changes to "Edit Student"
3. Form populates with current values
4. User makes changes
5. User clicks "Update Student"
6. Success: List updates, form resets
7. Alternative: User clicks "Cancel" to abort
```

### Deleting a Student
```
1. User clicks "Delete" button
2. Browser confirmation dialog: "Are you sure?"
3. User confirms
4. Student removed from list
```

## API Integration

### Loading State
- Shows "Loading..." message while fetching data
- Prevents multiple simultaneous requests

### Error State
- Red error banner at top of page
- Clear error message
- Doesn't break the UI

### Success State
- Immediate UI updates
- No page reload required
- Smooth user experience

## Accessibility Features

- Semantic HTML elements
- Label associations for form inputs
- Keyboard navigation support
- ARIA labels on buttons
- High contrast color scheme
- Responsive font sizes

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Initial load: < 2 seconds
- API calls: < 500ms (on local network)
- Smooth animations and transitions
- Optimized React rendering
- Production build: ~62KB (gzipped)

## Sample Data

The database comes with 3 pre-populated students:
1. John Doe - Vegetarian
2. Jane Smith - Vegan
3. Bob Johnson - Non-Vegetarian

## Food Preference Options

Available in dropdown:
1. Vegetarian
2. Vegan
3. Non-Vegetarian
4. Pescatarian
5. Gluten-Free

## Future UI Enhancements

Potential improvements:
- [ ] Search/filter functionality
- [ ] Sorting by column
- [ ] Pagination for large lists
- [ ] Bulk operations
- [ ] Export to CSV
- [ ] Dark mode toggle
- [ ] Animation on add/delete
- [ ] Toast notifications
- [ ] Student avatars
- [ ] Advanced filters
