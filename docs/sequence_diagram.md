# Navigation Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Navbar
    participant Router
    participant Layout
    participant Outlet
    participant PageComponent

    User->>Navbar: Click "Team" link
    Navbar->>Router: Navigate to "/team"
    Router->>Layout: Match Route
    Layout->>Outlet: Update Content
    Outlet->>PageComponent: Render TeamPage
    PageComponent-->>User: Display Team List
```
