import { useEffect, useState, useRef } from "react";

/**
 * Custom hook to throttle the updates of a value.
 * @param value - The value that needs to be throttled.
 * @param delay - The delay (in milliseconds) to wait before updating the throttled value.
 * @returns The throttled version of the input value.
 */
function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Ref to keep track of the timer

  useEffect(() => {
    // Clear the existing timer if it exists
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer
    timerRef.current = setTimeout(() => {
      setThrottledValue(value); // Update the throttled value
    }, delay);

    // Cleanup function to clear the timer on component unmount or when value changes
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return throttledValue; // Return the throttled value
}

export default useThrottle;
