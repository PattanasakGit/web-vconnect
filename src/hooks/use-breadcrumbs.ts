import { useEffect } from "react";
import { useBreadcrumbStore } from "@/store/breadcrumbStore";
import { breadcrumbData } from "@/constants/breadcrumb";

interface UseBreadcrumbsProps {
  currentPage: keyof typeof breadcrumbData;
}
export const useBreadcrumbs = ({ currentPage }: UseBreadcrumbsProps) => {
  const { setBreadcrumbs } = useBreadcrumbStore();
  useEffect(() => {
    const breadcrumbs = breadcrumbData[currentPage] || [];
    setBreadcrumbs(breadcrumbs);
  }, [currentPage, setBreadcrumbs]);
};
