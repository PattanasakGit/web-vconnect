"use client";

import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "../ui/breadcrumb";
import { useBreadcrumbStore } from "@/store/breadcrumbStore";
import { ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const BreadcrumbComponent = () => {
  const { breadcrumbs } = useBreadcrumbStore();
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? null : (
        <nav aria-label="breadcrumb" className="w-full flex">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => (
                <BreadcrumbItem key={index}>
                  <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                  {index !== breadcrumbs.length - 1 && (
                    <ChevronRight size={14} />
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
      )}
    </div>
  );
};

export default BreadcrumbComponent;
