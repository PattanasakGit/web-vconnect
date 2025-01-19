export const getAdjustedUrl = (pathname: string, itemUrl: string): string => {
    if (pathname.includes("/portal") && itemUrl.startsWith("/portal")) {
      const pathWithoutPortal = itemUrl.replace("/portal/", ""); // ลบ "/portal/"
      return pathWithoutPortal;
    }
    return itemUrl.replace(/^\//, "");
  };
  