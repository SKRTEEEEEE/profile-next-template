import { forwardRef, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, type AllPathnamesType } from "@/lib/i18n/routing";

type ListItemProps = {
  title: string;
  href: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"a">;

export const ListItem = forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, href, ...props }, ref) => {
    const isExternal = href.startsWith("http");

    const commonProps = {
      className: cn(
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
        className
      ),
      ...props,
    } as const;

    return (
      <li>
        <NavigationMenuLink asChild>
          {isExternal ? (
            <a ref={ref} href={href} target="_blank" rel="noreferrer" {...commonProps}>
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
            </a>
          ) : (
            <Link ref={ref} href={href as AllPathnamesType} {...commonProps}>
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
            </Link>
          )}
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";
