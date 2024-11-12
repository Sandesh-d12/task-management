import React from "react";

export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <div>
      <input
        type="checkbox"
        ref={resolvedRef}
        {...rest}
        className="mt-1 w-full rounded-md border border-gray-200 shadow-sm sm:text-sm py-2 px-2"
      />
    </div>
  );
});

export default Checkbox;
