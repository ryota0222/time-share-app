export const escapeSpaceName = (spaceName: string) => {
  return escape(spaceName);
};

export const unescapeSpaceName = (spaceName: string) => {
  return unescape(spaceName);
};
