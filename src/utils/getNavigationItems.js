export function getNavigationItems(navigation) {
  const filtered = navigation.filter((item) => item.display === undefined);

  const navigationItems = filtered.map(({ path, text, icon, activeIcon }) => ({
    path,
    text,
    icon,
    activeIcon,
  }));

  return navigationItems;
}
