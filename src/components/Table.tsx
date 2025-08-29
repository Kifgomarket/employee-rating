import React, { forwardRef, ComponentProps } from "react";
import { cn } from "@/utilities/cn";

interface ITable extends ComponentProps<"table"> {
  wrapperClass?: string;
}

const Table = forwardRef<HTMLTableElement, ITable>(
  ({ children, className, wrapperClass, ...rest }, ref) => {
    return (
      <div
        className={cn(
          "scrollbar relative h-full w-full overflow-auto",
          wrapperClass,
        )}
      >
        <table
          ref={ref}
          className={cn("w-full table-fixed overflow-auto", className)}
          {...rest}
        >
          {children}
        </table>
      </div>
    );
  },
);

interface IThead extends ComponentProps<"thead"> {}

const Thead = forwardRef<HTMLTableSectionElement, IThead>(
  ({ children, className, ...rest }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn("sticky top-0 z-10 w-full text-left text-sm", className)}
        {...rest}
      >
        {children}
      </thead>
    );
  },
);

interface ITbody extends ComponentProps<"tbody"> {}

const Tbody = forwardRef<HTMLTableSectionElement, ITbody>(
  ({ children, className, ...rest }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn(
          "divide-y overflow-y-auto text-sm text-gray-800",
          className,
        )}
        {...rest}
      >
        {children}
      </tbody>
    );
  },
);

interface ITr extends ComponentProps<"tr"> {}

const Tr = forwardRef<HTMLTableRowElement, ITr>(
  ({ children, className, ...rest }, ref) => {
    return (
      <tr ref={ref} className={cn(className)} {...rest}>
        {children}
      </tr>
    );
  },
);

interface ITh extends ComponentProps<"th"> {}

const Th = forwardRef<HTMLTableCellElement, ITh>(
  ({ children, className, ...rest }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          "px-6 py-3 text-sm font-semibold tracking-wide whitespace-nowrap text-gray-800",
          className,
        )}
        {...rest}
      >
        {children}
      </th>
    );
  },
);

interface ITd extends ComponentProps<"td"> {}

const Td = forwardRef<HTMLTableCellElement, ITd>(
  ({ children, className, ...rest }, ref) => {
    return (
      <td
        ref={ref}
        className={cn("px-6 py-6 align-middle", className)}
        {...rest}
      >
        {children}
      </td>
    );
  },
);

// Apply Object.assign to add subcomponents
Table.displayName = "Table";
Thead.displayName = "Thead";
Tbody.displayName = "Tbody";
Tr.displayName = "Tr";
Th.displayName = "Th";
Td.displayName = "Td";

export default Object.assign(Table, {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
});
