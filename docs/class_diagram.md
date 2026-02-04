classDiagram
    class TeamMember {
        +string id
        +string name
        +string role
        +string bio
        +string imageUrl
    }

    class App {
        +Router router
    }

    class Layout {
        +Navbar navbar
        +Outlet outlet
    }

    class Navbar {
        +List links
    }

    class Home {
        +Greeting greeting
    }

    class Team {
        +List~TeamMember~ members
    }

    class MemberCard {
        +TeamMember data
    }

    App --> Layout : Routes To
    Layout --> Navbar : Contains
    Layout --> Home : Outlets To (Path: /)
    Layout --> Team : Outlets To (Path: /team)
    Team *-- MemberCard : Renders Many