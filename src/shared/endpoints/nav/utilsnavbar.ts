interface NavbarItem {
  navbar_id: string
  title: string
  link: string
  icon: string | null
  parent_id?: string | null
  created_at: string | null
  updated_at: string | null
}

interface NavbarDropdownItem {
  title: string
  link: string
  icon?: string
}

interface NavbarItemWithDropdown extends NavbarItem {
  dropdown?: NavbarDropdownItem[]
}

export const convertToNavbarStructure = (
  data: NavbarItem[]
): NavbarItemWithDropdown[] => {
  const navbarItems: Record<string, NavbarItemWithDropdown> = {}

  data.forEach((item) => {
    if (!item.parent_id) {
      navbarItems[item.navbar_id] = {
        ...item
      }
    }
  })
  data.forEach((item) => {
    if (item.parent_id) {
      const parent = navbarItems[item.parent_id]
      if (parent) {
        if (!parent.dropdown) {
          parent.dropdown = []
        }
        const dropdownItem: NavbarDropdownItem = {
          title: item.title,
          link: item.link
        }
        if (item.icon) {
          dropdownItem.icon = item.icon
        }
        parent.dropdown.push(dropdownItem)
      }
    }
  })

  return Object.values(navbarItems)
}
